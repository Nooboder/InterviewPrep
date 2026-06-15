/**
 * E2E TESTING WITH PLAYWRIGHT
 * Big4/MNC Frequency: ⭐⭐⭐⭐ (Quality engineering is a Big4 differentiator — E2E is expected)
 *
 * Topics: Playwright setup, page object model, assertions, fixtures,
 *         API mocking, visual regression, CI integration
 */

// ============================================================
// Q1: Why Playwright over Cypress?
// ============================================================
/*
PLAYWRIGHT (preferred for new projects):
  + Multi-browser: Chrome, Firefox, Safari, Edge — ONE API
  + Faster: parallel tests across browsers with zero config
  + Auto-wait: waits for elements to be actionable (no sleep/waitFor needed)
  + Network interception: intercept/mock HTTP requests
  + Multiple tabs and iframes supported
  + Better TypeScript support
  + Free and open source (Microsoft)
  + Runs tests in worker threads — truly parallel

CYPRESS (legacy projects):
  + Great DX, time-travel debugger
  + Built-in retry-ability
  - Same-origin only (no multi-domain until Cypress 12+)
  - Single browser at a time (no parallelism without paid service)
  - No multi-tab/iframe support
*/

// ============================================================
// Q2: Playwright setup
// ============================================================
/*
Install: npm init playwright@latest
         npx playwright install  ← downloads browser binaries

Directory structure:
  tests/e2e/
    auth.spec.ts
    cart.spec.ts
    checkout.spec.ts
  tests/pages/          ← Page Object Model
    LoginPage.ts
    CartPage.ts
  playwright.config.ts
*/

// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,             // per-test timeout
  expect: { timeout: 5000 }, // assertion timeout

  // Run all tests in parallel
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,

  // Reporter
  reporter: [
    ['html', { open: 'never' }], // HTML report
    ['list'],                     // console output
    ['json', { outputFile: 'test-results.json' }],
  ],

  // Global setup/teardown
  globalSetup: './tests/global-setup.ts',

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    screenshot: 'only-on-failure', // auto-screenshot on failure
    video: 'on-first-retry',       // record video on retry
    trace: 'on-first-retry',       // trace for debugging
    headless: true,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'safari',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});

// ============================================================
// Q3: Page Object Model (POM) — the standard pattern
// ============================================================
/*
POM: Encapsulates page interactions in a class.
PROS:
  - Tests are readable (no CSS selectors in test code)
  - Changes to UI only require updating the POM class
  - DRY: reuse page interactions across tests
  - Self-documenting
*/

// tests/pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // Use accessible locators — prefer role/label over CSS/XPath
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Sign In' });
    this.errorMessage = page.getByRole('alert');
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
  }

  async navigate() {
    await this.page.goto('/login');
    await this.page.waitForLoadState('networkidle');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getErrorText() {
    return this.errorMessage.textContent();
  }
}

// tests/pages/CartPage.ts
export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addProductToCart(productName: string) {
    await this.page.getByRole('heading', { name: productName })
      .locator('../..') // go up to card
      .getByRole('button', { name: 'Add to Cart' })
      .click();
  }

  async getCartCount() {
    return parseInt(await this.page.getByTestId('cart-count').textContent() || '0');
  }

  async openCart() {
    await this.page.getByRole('button', { name: 'Cart' }).click();
    await this.page.waitForSelector('[data-testid="cart-drawer"]');
  }

  async getCartTotal(): Promise<number> {
    const text = await this.page.getByTestId('cart-total').textContent();
    return parseFloat(text?.replace('$', '') || '0');
  }

  async removeItem(productName: string) {
    await this.page.getByTestId(`cart-item-${productName}`)
      .getByRole('button', { name: 'Remove' })
      .click();
  }
}

// ============================================================
// Q4: Writing tests with Playwright
// ============================================================
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';

// Auth tests
test.describe('Authentication', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('successful login redirects to dashboard', async ({ page }) => {
    await loginPage.login('user@test.com', 'Password1!');

    // Playwright auto-waits for navigation
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('shows error for invalid credentials', async () => {
    await loginPage.login('bad@test.com', 'wrongpassword');

    const error = await loginPage.getErrorText();
    expect(error).toContain('Invalid credentials');

    // Should stay on login page
    await expect(loginPage.page).toHaveURL('/login');
  });

  test('shows validation for empty form', async () => {
    await loginPage.submitButton.click();

    await expect(loginPage.emailInput).toBeFocused();
    // HTML5 validation
    const validationMessage = await loginPage.emailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(validationMessage).toBeTruthy();
  });

  test('navigates to forgot password', async ({ page }) => {
    await loginPage.forgotPasswordLink.click();
    await expect(page).toHaveURL('/forgot-password');
  });
});

// ============================================================
// Q5: Fixtures — shared setup and authentication state
// ============================================================
/*
Fixtures: Playwright's way of sharing setup across tests.
Auth fixture: logs in ONCE, saves browser state, reuses across tests.
Saves huge time — no need to log in before every test.
*/

// tests/fixtures.ts
import { test as base } from '@playwright/test';

type MyFixtures = {
  authenticatedPage: Page;
  adminPage: Page;
};

export const test = base.extend<MyFixtures>({
  // Authenticated regular user
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'tests/.auth/user.json', // pre-saved auth state
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  // Authenticated admin
  adminPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'tests/.auth/admin.json',
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

// tests/global-setup.ts — runs once before all tests
import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Login once, save state
  await page.goto('http://localhost:3000/login');
  await page.fill('[name=email]', 'user@test.com');
  await page.fill('[name=password]', 'Password1!');
  await page.click('[type=submit]');
  await page.waitForURL('/dashboard');

  // Save auth cookies and localStorage
  await context.storageState({ path: 'tests/.auth/user.json' });
  await browser.close();
}

// Using the auth fixture in tests
test('cart persists across page refresh', async ({ authenticatedPage: page }) => {
  // Already authenticated — no need to log in
  const cartPage = new CartPage(page);

  await page.goto('/products');
  await cartPage.addProductToCart('Widget Pro');

  const countBefore = await cartPage.getCartCount();

  await page.reload();

  const countAfter = await cartPage.getCartCount();
  expect(countAfter).toBe(countBefore); // cart persisted
});

// ============================================================
// Q6: Network mocking
// ============================================================
test('shows offline message when API fails', async ({ page }) => {
  // Mock the API to return an error
  await page.route('/api/products', async (route) => {
    await route.fulfill({
      status: 503,
      body: JSON.stringify({ error: 'Service unavailable' }),
    });
  });

  await page.goto('/products');

  await expect(page.getByText('Failed to load products')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Retry' })).toBeVisible();
});

test('shows loading state while fetching', async ({ page }) => {
  // Delay the response to test loading state
  await page.route('/api/products', async (route) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([{ id: 1, name: 'Test Product' }]),
    });
  });

  await page.goto('/products');

  // Loading state should appear
  await expect(page.getByTestId('product-skeleton')).toBeVisible();

  // Then data should load
  await expect(page.getByText('Test Product')).toBeVisible();
});

// ============================================================
// Q7: Accessibility testing in Playwright
// ============================================================
import { checkA11y } from 'axe-playwright';

test('login page passes accessibility audit', async ({ page }) => {
  await page.goto('/login');

  // Run axe accessibility check
  await checkA11y(page, undefined, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa'],
    },
  });
});

test('modal is keyboard accessible', async ({ page }) => {
  await page.goto('/dashboard');

  // Open modal
  await page.getByRole('button', { name: 'Create Order' }).click();

  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();

  // Focus should be trapped inside modal
  await expect(modal.getByRole('button').first()).toBeFocused();

  // Tab through modal
  await page.keyboard.press('Tab');
  // Still inside modal
  await expect(modal).toContainText(await page.locator(':focus').textContent() || '');

  // Escape closes modal
  await page.keyboard.press('Escape');
  await expect(modal).not.toBeVisible();
});

// ============================================================
// INTERVIEW QUESTIONS
/*
Q: What is the Page Object Model and why do you use it?
A: POM encapsulates page element selectors and interactions in a class.
   Tests call methods on the POM class, not raw locators.
   Benefits: DRY (selectors in one place), readable tests, maintainable
   (UI changes only affect the POM class, not every test).

Q: How does Playwright auto-wait work?
A: Before performing any action (click, fill, check), Playwright waits for
   the element to be: visible, stable (not animating), enabled, not obscured.
   This eliminates the main source of flaky tests — no explicit waits needed.

Q: How would you test a flow that requires authentication?
A: Use Playwright's storageState feature. Run a global setup that logs in once
   and saves browser state (cookies + localStorage) to a JSON file.
   Create fixtures that load this state for each test context.
   Tests run with a pre-authenticated session — much faster than logging in every test.

Q: What is the difference between test.beforeEach and fixtures?
A: beforeEach: runs setup code before each test in the same describe block.
   Fixtures: reusable, parameterizable setup that can be shared across test files.
   Fixtures are more composable and support dependency injection between fixtures.

Q: How do you handle flaky tests?
A: 1. Use Playwright's auto-wait (built-in retry on assertions)
   2. Identify root cause — race conditions, timing, env instability
   3. Add explicit wait conditions where needed (waitForResponse, waitForLoadState)
   4. Use test.retry() for truly flaky external dependencies
   5. Run in headless mode (UI rendering differences cause flakiness)
   6. NEVER use hardcoded timeouts (page.waitForTimeout) — use condition-based waits
*/

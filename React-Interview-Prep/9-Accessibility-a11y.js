// ============================================================
// ACCESSIBILITY (A11Y) IN REACT - COMPLETE INTERVIEW GUIDE
// ============================================================
// Topics: WCAG 2.1, ARIA, Keyboard Navigation, Focus Management,
//         Screen Readers, Testing, React-specific a11y patterns
// Interview Level: Mid to Senior
// ============================================================

/**
 * WHY ACCESSIBILITY MATTERS IN INTERVIEWS
 * - Big 4, enterprise & govt projects legally require WCAG compliance
 * - Shows you build production-quality, inclusive software
 * - Frequently asked in senior React interviews
 */

// ============================================================
// 1. WCAG 2.1 PRINCIPLES (POUR)
// ============================================================

/**
 * Q: What are the 4 WCAG 2.1 principles?
 *
 * A: POUR
 * - Perceivable:  Info must be presentable to all users (alt text, captions)
 * - Operable:     UI must be navigable without a mouse (keyboard, timing)
 * - Understandable: Content must be readable & predictable
 * - Robust:       Content must work with assistive technologies (ARIA, semantics)
 *
 * Levels: A (minimum), AA (standard target), AAA (enhanced)
 * Most enterprise apps target WCAG 2.1 AA.
 */

// ============================================================
// 2. SEMANTIC HTML IN REACT
// ============================================================

/**
 * Q: Why is semantic HTML important in React, and where do developers go wrong?
 *
 * A: React renders to the DOM — semantic elements give meaning to structure.
 * Common mistakes: using <div> for everything, onClick on non-interactive elements.
 */

// ❌ BAD: div-soup, no semantics
function BadNav() {
  return (
    <div onClick={handleNav}>
      <div>Home</div>
      <div>About</div>
    </div>
  );
}

// ✅ GOOD: Semantic elements
function GoodNav() {
  return (
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  );
}

// ❌ BAD: Clickable div (not keyboard accessible)
function BadButton({ onClick }) {
  return <div onClick={onClick}>Click me</div>;
}

// ✅ GOOD: Use button (focusable, Enter/Space trigger, role implicit)
function GoodButton({ onClick, children }) {
  return <button type="button" onClick={onClick}>{children}</button>;
}

// ============================================================
// 3. ARIA ATTRIBUTES IN REACT
// ============================================================

/**
 * Q: What are ARIA roles, properties, and states? Give React examples.
 *
 * A:
 * - Roles: define what an element IS (role="dialog", role="alert")
 * - Properties: define characteristics (aria-label, aria-describedby)
 * - States: define current condition (aria-expanded, aria-checked, aria-disabled)
 *
 * Rule: Use native HTML semantics first; ARIA is a last resort.
 */

// aria-label: names an element when visible text is absent
function IconButton({ icon, action }) {
  return (
    <button type="button" aria-label={`${action} item`}>
      {icon}
    </button>
  );
}

// aria-expanded: communicates open/close state (accordions, dropdowns)
function Accordion({ title, content }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="accordion-content"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      <div id="accordion-content" hidden={!isOpen}>
        {content}
      </div>
    </div>
  );
}

// aria-live: announces dynamic content changes to screen readers
function StatusMessage({ message, type }) {
  return (
    // polite: waits for user to finish; assertive: interrupts immediately
    <div
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      aria-atomic="true"
      role={type === 'error' ? 'alert' : 'status'}
    >
      {message}
    </div>
  );
}

// aria-describedby: links an element to its description
function FormField({ id, label, hint, error }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        aria-describedby={`${id}-hint ${error ? `${id}-error` : ''}`}
        aria-invalid={!!error}
      />
      <span id={`${id}-hint`}>{hint}</span>
      {error && (
        <span id={`${id}-error`} role="alert">{error}</span>
      )}
    </div>
  );
}

// ============================================================
// 4. KEYBOARD NAVIGATION
// ============================================================

/**
 * Q: How do you ensure full keyboard accessibility in React components?
 *
 * A:
 * - Use native interactive elements (button, a, input) — they're focusable by default
 * - Use tabIndex="0" to add non-interactive elements to tab order
 * - Use tabIndex="-1" to make an element focusable programmatically but not via tab
 * - Handle onKeyDown for custom keyboard interactions
 * - Never remove outline/focus styles without a visible replacement
 */

// Custom keyboard handler for a listbox pattern
function KeyboardList({ items, onSelect }) {
  const [focusedIndex, setFocusedIndex] = React.useState(0);

  function handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(i => Math.min(i + 1, items.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onSelect(items[focusedIndex]);
        break;
      case 'Home':
        setFocusedIndex(0);
        break;
      case 'End':
        setFocusedIndex(items.length - 1);
        break;
    }
  }

  return (
    <ul
      role="listbox"
      aria-label="Select an item"
      onKeyDown={handleKeyDown}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          role="option"
          tabIndex={index === focusedIndex ? 0 : -1}
          aria-selected={index === focusedIndex}
          onClick={() => { setFocusedIndex(index); onSelect(item); }}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
}

// ============================================================
// 5. FOCUS MANAGEMENT
// ============================================================

/**
 * Q: When and how do you programmatically manage focus in React?
 *
 * A: Focus management is critical in:
 * - Modals/dialogs: move focus in on open, return it on close
 * - Route changes (SPAs): move focus to main content or h1
 * - Error messages: move focus to first error on form submit
 * - Dynamic content: announce to screen reader via aria-live or role="alert"
 */

// Focus trap inside a modal
function Modal({ isOpen, onClose, children }) {
  const modalRef = React.useRef(null);
  const previousFocusRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      // Move focus into modal
      modalRef.current?.querySelector('[data-autofocus]')?.focus()
        || modalRef.current?.focus();
    } else {
      // Return focus to trigger element
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // Trap focus within modal (simplified — use focus-trap-react in prod)
  function handleKeyDown(e) {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key !== 'Tab') return;

    const focusable = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      <h2 id="modal-title">Dialog Title</h2>
      {children}
      <button type="button" onClick={onClose}>Close</button>
    </div>
  );
}

// Move focus to heading after route change (React Router)
function RouteChangeAnnouncer() {
  const location = useLocation();
  const headingRef = React.useRef(null);

  React.useEffect(() => {
    headingRef.current?.focus();
  }, [location.pathname]);

  return (
    <h1 tabIndex={-1} ref={headingRef} className="sr-only">
      {document.title}
    </h1>
  );
}

// ============================================================
// 6. SKIP NAVIGATION
// ============================================================

/**
 * Q: What is a skip link and how do you implement it in React?
 *
 * A: A skip link lets keyboard users bypass repetitive navigation
 * (header/nav) and jump directly to main content.
 * It's typically visible only on focus.
 */

// Skip to main content link (visually hidden until focused)
function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link" // CSS: .skip-link { position: absolute; left: -9999px } .skip-link:focus { left: 0 }
    >
      Skip to main content
    </a>
  );
}

function Layout({ children }) {
  return (
    <>
      <SkipLink />
      <header>...</header>
      <nav>...</nav>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </>
  );
}

// ============================================================
// 7. ACCESSIBLE FORMS IN REACT
// ============================================================

/**
 * Q: What are the key a11y requirements for forms in React?
 *
 * A:
 * - Every input must have an associated <label> (via htmlFor/id or aria-label)
 * - Error messages must be associated with the input (aria-describedby)
 * - Required fields marked with aria-required="true"
 * - Validation errors announced with role="alert" or aria-live="assertive"
 * - Fieldset/legend for groups of related inputs (radio groups, checkboxes)
 */

function AccessibleForm() {
  const [errors, setErrors] = React.useState({});

  return (
    <form noValidate onSubmit={handleSubmit}>
      {/* Group related inputs with fieldset + legend */}
      <fieldset>
        <legend>Personal Information</legend>

        <div>
          <label htmlFor="name">
            Full Name
            <span aria-hidden="true"> *</span>
          </label>
          <input
            id="name"
            type="text"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span id="name-error" role="alert">{errors.name}</span>
          )}
        </div>

        {/* Radio group */}
        <fieldset>
          <legend>Preferred Contact Method</legend>
          <label>
            <input type="radio" name="contact" value="email" /> Email
          </label>
          <label>
            <input type="radio" name="contact" value="phone" /> Phone
          </label>
        </fieldset>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
}

// ============================================================
// 8. COLOR CONTRAST & VISUAL ACCESSIBILITY
// ============================================================

/**
 * Q: What color contrast ratios does WCAG 2.1 AA require?
 *
 * A:
 * - Normal text: minimum 4.5:1 contrast ratio
 * - Large text (18pt/14pt bold): minimum 3:1
 * - UI components (borders, icons): minimum 3:1
 * - Use tools: axe DevTools, WebAIM Contrast Checker, Lighthouse
 *
 * In React: Don't rely on color alone to convey meaning.
 * Add icons, text, or patterns alongside color indicators.
 */

// ❌ BAD: Color only to indicate error
function BadInput({ hasError }) {
  return <input style={{ borderColor: hasError ? 'red' : 'green' }} />;
}

// ✅ GOOD: Color + icon + text
function GoodInput({ hasError, errorMessage }) {
  return (
    <div>
      <input
        style={{ borderColor: hasError ? '#d32f2f' : '#388e3c' }}
        aria-invalid={hasError}
        aria-describedby={hasError ? 'input-error' : undefined}
      />
      {hasError && (
        <span id="input-error" role="alert">
          <span aria-hidden="true">⚠ </span>
          {errorMessage}
        </span>
      )}
    </div>
  );
}

// ============================================================
// 9. ACCESSIBLE IMAGES & MEDIA
// ============================================================

/**
 * Q: How do you make images and icons accessible in React?
 *
 * A:
 * - Informative images: alt="descriptive text"
 * - Decorative images: alt="" (empty string, not missing)
 * - Functional images (buttons): alt describes the action
 * - SVG icons: aria-hidden="true" when next to text; aria-label when standalone
 */

// Decorative image
<img src="background.jpg" alt="" role="presentation" />

// Informative image
<img src="chart.png" alt="Sales increased 40% in Q3 2024" />

// SVG icon with visible label
function SearchButton() {
  return (
    <button type="button">
      <svg aria-hidden="true" focusable="false" width="16" height="16">
        {/* icon paths */}
      </svg>
      Search
    </button>
  );
}

// Standalone SVG icon (no visible text)
function CloseButton({ onClose }) {
  return (
    <button type="button" aria-label="Close dialog" onClick={onClose}>
      <svg aria-hidden="true" focusable="false" width="16" height="16">
        {/* X icon paths */}
      </svg>
    </button>
  );
}

// ============================================================
// 10. SCREEN READER ONLY CONTENT
// ============================================================

/**
 * Q: How do you show content to screen readers but hide it visually?
 *
 * A: Use the "visually-hidden" / "sr-only" CSS pattern.
 * Never use display:none or visibility:hidden — those hide from screen readers too.
 */

// CSS: .sr-only { position: absolute; width: 1px; height: 1px; padding: 0;
//       margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0 }

function SROnly({ children }) {
  return <span className="sr-only">{children}</span>;
}

// Usage: provide context that's visually obvious but unclear to screen readers
function CartButton({ count }) {
  return (
    <button type="button">
      <span aria-hidden="true">🛒</span>
      <SROnly>Shopping cart,</SROnly>
      {count}
      <SROnly>items</SROnly>
    </button>
    // Screen reader: "Shopping cart, 3 items"
    // Visual: "🛒 3"
  );
}

// ============================================================
// 11. ACCESSIBLE ROUTING (SPA A11Y)
// ============================================================

/**
 * Q: What a11y problems do SPAs introduce, and how do you solve them?
 *
 * A: In traditional MPAs, page navigation triggers browser's built-in
 * focus/announcement behavior. SPAs break this:
 *
 * Problems:
 * 1. Screen readers don't announce route changes
 * 2. Focus stays on the nav link after navigation
 * 3. Page title doesn't update
 *
 * Solutions:
 * 1. Update <title> on each route (next/head, react-helmet)
 * 2. Move focus to <h1> or main content after navigation
 * 3. Use aria-live region to announce route changes
 */

function RouteAnnouncer() {
  const location = useLocation();
  const [announcement, setAnnouncement] = React.useState('');

  React.useEffect(() => {
    // Give DOM time to update
    const timer = setTimeout(() => {
      const heading = document.querySelector('h1');
      setAnnouncement(heading?.textContent || document.title);
    }, 100);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div aria-live="assertive" aria-atomic="true" className="sr-only">
      {announcement}
    </div>
  );
}

// ============================================================
// 12. TESTING ACCESSIBILITY IN REACT
// ============================================================

/**
 * Q: How do you test accessibility in React applications?
 *
 * A: 3-layer approach:
 * 1. Automated: jest-axe, axe-core, Lighthouse
 * 2. Semi-automated: eslint-plugin-jsx-a11y
 * 3. Manual: keyboard-only navigation, screen reader (NVDA/VoiceOver)
 */

// jest-axe integration
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('Modal has no accessibility violations', async () => {
  const { container } = render(
    <Modal isOpen={true} onClose={() => {}}>
      <p>Modal content</p>
    </Modal>
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

// Testing keyboard interactions with @testing-library/user-event
import userEvent from '@testing-library/user-event';

test('Accordion opens on Enter key', async () => {
  const user = userEvent.setup();
  const { getByRole } = render(<Accordion title="FAQ" content="Answer" />);

  const button = getByRole('button', { name: 'FAQ' });
  button.focus();
  await user.keyboard('{Enter}');

  expect(button).toHaveAttribute('aria-expanded', 'true');
});

// eslint-plugin-jsx-a11y (add to .eslintrc.js)
const eslintConfig = {
  plugins: ['jsx-a11y'],
  extends: ['plugin:jsx-a11y/recommended'],
  // Catches: missing alt, onClick without keyboard, label-without-htmlFor, etc.
};

// ============================================================
// 13. COMMON A11Y MISTAKES IN REACT
// ============================================================

/**
 * Q: List the top accessibility mistakes React developers make.
 *
 * A:
 * 1. Missing/incorrect alt text on images
 * 2. Clickable divs/spans (not keyboard accessible)
 * 3. Missing form labels (using placeholder as label is wrong)
 * 4. Dynamic content not announced (no aria-live)
 * 5. Focus not managed in modals/dialogs/drawers
 * 6. Removing :focus styles without replacement
 * 7. Low color contrast
 * 8. Modals that don't trap focus
 * 9. SVG icons without aria-hidden or aria-label
 * 10. Not handling Escape key in overlays
 * 11. Routes not announced on navigation
 * 12. Tables without headers (no <th> or scope attribute)
 * 13. Link text like "click here" or "read more" (not descriptive)
 * 14. Using tabIndex > 0 (breaks natural tab order)
 * 15. Animations without prefers-reduced-motion support
 */

// prefers-reduced-motion in React
function AnimatedComponent() {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // Or use a hook
  function useReducedMotion() {
    const [reduce, setReduce] = React.useState(
      () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
    React.useEffect(() => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handler = (e) => setReduce(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }, []);
    return reduce;
  }

  const shouldReduce = useReducedMotion();

  return (
    <div
      style={{
        transition: shouldReduce ? 'none' : 'transform 0.3s ease',
        animation: shouldReduce ? 'none' : 'fadeIn 0.5s',
      }}
    />
  );
}

// ============================================================
// 14. ACCESSIBLE DATA TABLES
// ============================================================

/**
 * Q: How do you make data tables accessible in React?
 */

function AccessibleTable({ data, columns }) {
  return (
    <table aria-label="User data">
      <caption>List of registered users</caption>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key} scope="col" aria-sort={col.sort}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            {columns.map(col => (
              <td key={col.key} data-label={col.label}>
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ============================================================
// 15. QUICK REFERENCE: ARIA ROLES CHEATSHEET
// ============================================================

/**
 * Common ARIA roles for React developers:
 *
 * Landmark roles (use sparingly — prefer HTML5 elements):
 *   role="banner"      → <header>
 *   role="main"        → <main>
 *   role="navigation"  → <nav>
 *   role="contentinfo" → <footer>
 *   role="search"      → search form region
 *
 * Widget roles:
 *   role="button"      → interactive button (use <button> instead)
 *   role="dialog"      → modal dialog
 *   role="alert"       → urgent message (aria-live="assertive")
 *   role="status"      → non-urgent message (aria-live="polite")
 *   role="tablist"     → tab container
 *   role="tab"         → individual tab
 *   role="tabpanel"    → tab content area
 *   role="listbox"     → dropdown/select replacement
 *   role="option"      → item inside listbox
 *   role="combobox"    → autocomplete input
 *   role="tooltip"     → tooltip
 *   role="progressbar" → progress indicator
 *
 * Key aria-* properties:
 *   aria-label        → name for element
 *   aria-labelledby   → references element that names this one
 *   aria-describedby  → references element that describes this one
 *   aria-hidden       → hide from AT ("true") or show ("false")
 *   aria-expanded     → open/closed state
 *   aria-selected     → selected state (tabs, options)
 *   aria-checked      → checked state (checkboxes, radios)
 *   aria-disabled     → disabled state
 *   aria-required     → required field
 *   aria-invalid      → invalid input
 *   aria-live         → "polite" | "assertive" | "off"
 *   aria-atomic       → announce whole region or just changes
 *   aria-controls     → references element this controls
 *   aria-owns         → references elements logically owned
 *   aria-current      → current item (page, step, location)
 */

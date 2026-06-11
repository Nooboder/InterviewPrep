// ============================================================
// CSS & STYLING IN REACT - COMPLETE INTERVIEW GUIDE
// ============================================================
// Topics: CSS Modules, Styled Components, Tailwind CSS,
//         CSS-in-JS, CSS Variables, Dark Mode, Responsive Design,
//         Animations, Performance
// Interview Level: Mid to Senior
// ============================================================

// ============================================================
// 1. STYLING APPROACHES OVERVIEW
// ============================================================

/**
 * Q: What are the main styling approaches in React? Compare them.
 *
 * A:
 * 1. Plain CSS/SCSS Files      — global scope, simple, no JS overhead
 * 2. CSS Modules               — scoped classes, co-located, zero runtime
 * 3. Styled Components/Emotion — CSS-in-JS, dynamic, component-scoped
 * 4. Tailwind CSS              — utility-first, no custom CSS, consistent design
 * 5. CSS Variables (Custom Properties) — dynamic theming without JS
 *
 * Comparison:
 * Approach          | Scoped | Dynamic | Bundle  | DX     | SSR
 * ------------------|--------|---------|---------|--------|-----
 * CSS Modules       | ✅     | Limited | 0       | Good   | ✅
 * Styled Components | ✅     | ✅      | ~12KB   | Great  | With setup
 * Tailwind          | ✅     | Limited | ~5KB(purged) | Great | ✅
 * Plain CSS         | ❌     | ❌      | 0       | Basic  | ✅
 * Inline styles     | ✅     | ✅      | 0       | Poor   | ✅
 */

// ============================================================
// 2. CSS MODULES
// ============================================================

/**
 * Q: What are CSS Modules and how do they work?
 *
 * A: CSS Modules scope class names locally by default.
 * The build tool (Webpack/Vite) transforms class names to unique identifiers.
 * Works with .module.css or .module.scss files.
 *
 * Benefits:
 * - No class name collisions
 * - Dead code elimination (unused classes can be detected)
 * - Works with Sass/Less
 * - Zero runtime overhead
 */

// Button.module.css
/*
.button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.button:hover { filter: brightness(1.1); }

.primary { background: #007bff; color: white; }
.secondary { background: #6c757d; color: white; }

.small { font-size: 12px; padding: 4px 8px; }
.large { font-size: 18px; padding: 12px 24px; }

.disabled { opacity: 0.5; cursor: not-allowed; }
*/

import styles from './Button.module.css';
import clsx from 'clsx'; // utility for conditional classes

function Button({ variant = 'primary', size = 'medium', disabled, children, ...rest }) {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],           // styles.primary or styles.secondary
        size !== 'medium' && styles[size],
        disabled && styles.disabled
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

// Global styles in CSS Modules (opt-out of scoping)
/* :global(.some-third-party-class) { ... } */

// Composing classes
/* .base { ... }
   .extended { composes: base; color: red; } */

// ============================================================
// 3. STYLED COMPONENTS
// ============================================================

/**
 * Q: How does Styled Components work and when would you choose it?
 *
 * A: Styled Components uses tagged template literals to create React components
 * with styles baked in. Styles are scoped, auto-prefixed, and can use props.
 *
 * Choose Styled Components when:
 * - Styles depend heavily on JS props/state
 * - You want component-first development
 * - Team is comfortable with CSS-in-JS
 *
 * Consider alternatives when:
 * - SSR performance is critical (styled-components requires server setup)
 * - Bundle size is a concern
 */

import styled, { css, keyframes, ThemeProvider } from 'styled-components';

// Basic styled component
const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;

  /* Dynamic styles based on props */
  background: ${props => props.variant === 'primary' ? '#007bff' : '#6c757d'};
  color: white;
  opacity: ${props => props.disabled ? 0.5 : 1};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

  &:hover:not(:disabled) {
    filter: brightness(1.1);
  }
`;

// Conditional CSS with css helper
const flexMixin = css`
  display: flex;
  align-items: center;
  gap: ${props => props.gap || '8px'};
`;

const Card = styled.div`
  ${flexMixin}
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.card};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

// Keyframe animation
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// Extending a styled component
const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.5);
`;

// Styling a third-party component
const StyledLink = styled(RouterLink)`
  color: #007bff;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

// ThemeProvider — global design tokens
const theme = {
  colors: {
    primary: '#007bff',
    surface: '#ffffff',
    background: '#f8f9fa',
    text: { primary: '#212529', secondary: '#6c757d' },
  },
  spacing: { sm: '8px', md: '16px', lg: '24px', xl: '32px' },
  shadows: { card: '0 2px 8px rgba(0,0,0,0.1)' },
  radius: { sm: '4px', card: '8px', full: '9999px' },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles /> {/* global CSS reset / base styles */}
      <Router />
    </ThemeProvider>
  );
}

// ============================================================
// 4. TAILWIND CSS WITH REACT
// ============================================================

/**
 * Q: How do you use Tailwind CSS effectively in React?
 *
 * A: Tailwind is utility-first — build UI by composing small single-purpose classes.
 * In React, use the `clsx` or `tailwind-merge` utility to combine classes conditionally.
 *
 * Key config: tailwind.config.js (theme extension, arbitrary values, plugins)
 */

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// cn utility — combines clsx and twMerge (handles Tailwind conflict resolution)
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
// twMerge resolves conflicting Tailwind classes:
// cn('p-4', 'p-6') → 'p-6' (last wins, not both)
// Without twMerge: cn('p-4', 'p-6') → 'p-4 p-6' (both applied, unpredictable)

// Tailwind component with variants
function Button({ variant = 'primary', size = 'md', disabled, className, children, ...props }) {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md font-medium',
        'transition-colors focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        // Variant styles
        {
          'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500':
            variant === 'primary',
          'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500':
            variant === 'secondary',
          'border border-gray-300 bg-transparent hover:bg-gray-100':
            variant === 'outline',
          'text-red-600 hover:bg-red-50': variant === 'danger',
        },
        // Size styles
        {
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4 py-2': size === 'md',
          'h-12 px-6 text-lg': size === 'lg',
        },
        className // allow overriding
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

// ============================================================
// 5. DARK MODE IMPLEMENTATION
// ============================================================

/**
 * Q: How do you implement dark mode in React?
 *
 * A: Three approaches:
 * 1. CSS class on <html>/<body> + CSS variables (most flexible)
 * 2. media query prefers-color-scheme (auto, no manual toggle)
 * 3. Tailwind's dark: variant (class-based)
 */

// Approach 1: CSS variables + class switching (Recommended)

// CSS:
/*
:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-surface: #f5f5f5;
  --color-primary: #007bff;
}
[data-theme="dark"] {
  --color-bg: #1a1a1a;
  --color-text: #f0f0f0;
  --color-surface: #2d2d2d;
  --color-primary: #4dabf7;
}
*/

const ThemeContext = React.createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(() => {
    // Read from localStorage or system preference
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = React.useCallback(() => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

// Approach 2: Tailwind dark mode (tailwind.config.js: darkMode: 'class')
function TailwindDarkCard({ title }) {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  );
}
// Toggle: document.documentElement.classList.toggle('dark')

// ============================================================
// 6. RESPONSIVE DESIGN IN REACT
// ============================================================

/**
 * Q: How do you handle responsive design in React?
 *
 * A: Prefer CSS-based approaches (media queries, flexbox, grid) over JS-based.
 * JS breakpoints cause layout shifts and SSR hydration mismatches.
 * Use useWindowSize only when CSS can't solve the problem.
 */

// CSS-first (Tailwind breakpoints): sm: md: lg: xl: 2xl:
function ResponsiveLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Stack on mobile, 2 cols on tablet, 3 cols on desktop */}
    </div>
  );
}

// useMediaQuery hook (for JS-based branching — use sparingly)
function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(
    () => window.matchMedia(query).matches
  );

  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

function Sidebar() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  return isDesktop ? <DesktopSidebar /> : <MobileDrawer />;
}

// Container queries (modern CSS — better than JS breakpoints)
/*
.card-container { container-type: inline-size; }
@container (min-width: 400px) {
  .card { display: flex; }
}
*/

// ============================================================
// 7. CSS ANIMATIONS IN REACT
// ============================================================

/**
 * Q: How do you handle animations in React?
 *
 * A: CSS transitions/animations first, JS animation libraries for complex cases.
 * Always handle prefers-reduced-motion.
 */

// CSS transitions (simplest — use when possible)
// .fade-in { opacity: 0; transition: opacity 0.3s ease; }
// .fade-in.visible { opacity: 1; }

// Intersection Observer animation hook
function useIntersectionAnimation(options = {}) {
  const ref = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(el); // only animate once
      }
    }, { threshold: 0.1, ...options });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

function AnimatedCard({ children }) {
  const [ref, isVisible] = useIntersectionAnimation();
  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-500',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      {children}
    </div>
  );
}

// Framer Motion (popular library for complex animations)
import { motion, AnimatePresence } from 'framer-motion';

function AnimatedList({ items }) {
  return (
    <AnimatePresence>
      {items.map(item => (
        <motion.li
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {item.name}
        </motion.li>
      ))}
    </AnimatePresence>
  );
}

// ============================================================
// 8. PERFORMANCE: CRITICAL CSS & STYLE LOADING
// ============================================================

/**
 * Q: How do CSS-in-JS libraries affect performance, and what are the alternatives?
 *
 * A:
 * CSS-in-JS (runtime) like Styled Components:
 * - Injects styles at runtime via CSSOM
 * - Serialization cost on each render
 * - Can block rendering with large component trees
 *
 * CSS-in-JS (zero-runtime) alternatives:
 * - Linaria: compiles to CSS Modules at build time
 * - Vanilla Extract: TypeScript CSS Modules with no runtime
 * - Panda CSS: utility-first with zero runtime
 *
 * For max performance: CSS Modules or Tailwind (static extraction)
 * For developer experience: Tailwind + twMerge or zero-runtime CSS-in-JS
 */

// Vanilla Extract example (zero runtime, type-safe)
/* button.css.ts */
/*
import { style, styleVariants } from '@vanilla-extract/css';

export const base = style({
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
});

export const variants = styleVariants({
  primary: { background: '#007bff', color: 'white' },
  secondary: { background: '#6c757d', color: 'white' },
});
*/

// ============================================================
// STYLING DECISION GUIDE (For Interviews)
// ============================================================

/**
 * Project Type              | Recommended Approach
 * --------------------------|------------------------------------------
 * New greenfield project    | Tailwind CSS + clsx/tailwind-merge
 * Component library         | CSS Modules or Vanilla Extract
 * Highly dynamic styles     | Styled Components / Emotion
 * Enterprise (legacy)       | Often Sass/SCSS modules — match codebase
 * Performance-critical app  | Tailwind or CSS Modules (zero runtime)
 * Design system             | Tailwind (config) or design tokens + CSS vars
 *
 * Libraries to know for interviews:
 * - clsx: conditional class utility
 * - tailwind-merge: resolve Tailwind conflicts
 * - classnames: older alternative to clsx
 * - Framer Motion: complex animations
 * - styled-components & emotion: CSS-in-JS
 * - @vanilla-extract: zero-runtime typed CSS
 */

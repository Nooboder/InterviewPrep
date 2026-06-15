/**
 * REACT ADVANCED — Portals, Error Boundaries, useImperativeHandle
 * Big4/MNC Frequency: ⭐⭐⭐⭐ (Senior React rounds — most candidates miss portals + useImperativeHandle)
 *
 * Topics: createPortal, Error Boundary class, useImperativeHandle, forwardRef,
 *         Suspense boundaries, useDebugValue
 */

import React, {
  useRef, useImperativeHandle, forwardRef, useState, useEffect,
  Component, createPortal, Suspense, useTransition
} from 'react';

// ============================================================
// Q1: ReactDOM.createPortal — render outside component tree
// ============================================================
/*
Portal: renders children into a DOM node OUTSIDE the parent component's DOM tree.

WHY portals are necessary:
  - Modals: need to be outside the parent to avoid z-index/overflow issues
  - Tooltips/popovers: positioned absolutely relative to viewport
  - Notifications/toasts: appear at document root level

KEY FACT: Even though the DOM parent is different, event bubbling works
           through the REACT tree (not DOM tree). So events from a portal
           bubble up through the React component that rendered the portal.
*/

// Modal component using createPortal
function Modal({ isOpen, onClose, title, children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const modalRoot = document.getElementById('modal-root'); // <div id="modal-root"> in index.html

  return createPortal(
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()} // close on backdrop click
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button onClick={onClose} aria-label="Close modal">×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>,
    modalRoot
  );
}

// Tooltip using portal (avoid overflow: hidden clipping)
function Tooltip({ children, text }) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);

  const showTooltip = () => {
    const rect = triggerRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY + 8,
      left: rect.left + window.scrollX + rect.width / 2,
    });
    setVisible(true);
  };

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </span>
      {visible && createPortal(
        <div
          style={{
            position: 'absolute',
            top: position.top,
            left: position.left,
            transform: 'translateX(-50%)',
            zIndex: 9999,
          }}
          className="tooltip"
          role="tooltip"
        >
          {text}
        </div>,
        document.body
      )}
    </>
  );
}

// ============================================================
// Q2: Error Boundary — the FULL working implementation
// ============================================================
/*
Error boundaries MUST be class components (no hooks equivalent).
They catch errors in the component tree below them during:
  - Rendering
  - Lifecycle methods
  - Constructors

They do NOT catch:
  - Event handlers (use try/catch)
  - Async code (setTimeout, fetch)
  - Server-side rendering
  - Errors thrown by the error boundary itself

Two methods used:
  getDerivedStateFromError: render fallback UI (static — no side effects)
  componentDidCatch: log the error (side effects allowed)
*/

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // Called during rendering when a child throws
  // Returns new state — use this to show fallback UI
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Called after rendering with the error info
  // Use this for side effects: logging, reporting to Sentry
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);

    // Report to error tracking service
    // Sentry.captureException(error, { extra: errorInfo });

    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Render custom fallback
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          reset: this.handleReset,
        });
      }

      return (
        <div role="alert">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={this.handleReset}>Try again</button>
          {process.env.NODE_ENV === 'development' && (
            <pre>{this.state.errorInfo?.componentStack}</pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage with fallback prop
function App() {
  return (
    <ErrorBoundary
      fallback={({ error, reset }) => (
        <div>
          <p>Error: {error.message}</p>
          <button onClick={reset}>Retry</button>
        </div>
      )}
    >
      <UserProfile />
    </ErrorBoundary>
  );
}

// Async error handling — NOT caught by Error Boundary
function AsyncComponent() {
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(setError); // must handle async errors yourself
  }, []);

  if (error) return <ErrorMessage error={error} />;
  return <DataDisplay />;
}

// ============================================================
// Q3: forwardRef + useImperativeHandle
// ============================================================
/*
forwardRef: allows parent to get a ref to a child's DOM element or component instance.
useImperativeHandle: lets you customize what the parent ref can do (the "imperative handle").

WHY useImperativeHandle?
  - Expose only specific methods, not the entire DOM node
  - Provide a clean "imperative API" for things that are awkward as props
  - Common for: custom inputs, media players, canvas, animation triggers

RULE: Prefer declarative (props/state) over imperative (refs). Use only when needed.
*/

// Custom input with exposed imperative API
const FancyInput = forwardRef(function FancyInput(props, ref) {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Expose custom methods to parent via ref
  useImperativeHandle(ref, () => ({
    // Only expose what parent needs — not the raw DOM element
    focus() {
      inputRef.current?.focus();
    },
    clear() {
      setValue('');
      inputRef.current?.focus();
    },
    getValue() {
      return value;
    },
    validate() {
      if (!value.trim()) {
        inputRef.current?.setCustomValidity('Field is required');
        return false;
      }
      inputRef.current?.setCustomValidity('');
      return true;
    },
  }), [value]); // recreate handle when value changes

  return (
    <div className={`fancy-input ${isFocused ? 'focused' : ''}`}>
      <input
        ref={inputRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </div>
  );
});

// Parent using the imperative API
function LoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate both fields
    const emailValid = emailRef.current.validate();
    const passwordValid = passwordRef.current.validate();

    if (!emailValid) {
      emailRef.current.focus(); // focus first invalid field
      return;
    }
    if (!passwordValid) {
      passwordRef.current.focus();
      return;
    }

    console.log('Submitting:', {
      email: emailRef.current.getValue(),
      password: passwordRef.current.getValue(),
    });
  };

  const handleClear = () => {
    emailRef.current.clear();
    passwordRef.current.clear();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FancyInput ref={emailRef} type="email" placeholder="Email" />
      <FancyInput ref={passwordRef} type="password" placeholder="Password" />
      <button type="submit">Login</button>
      <button type="button" onClick={handleClear}>Clear</button>
    </form>
  );
}

// Real use case: Video player with imperative controls
const VideoPlayer = forwardRef(function VideoPlayer({ src, poster }, ref) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    play() {
      videoRef.current?.play();
      setIsPlaying(true);
    },
    pause() {
      videoRef.current?.pause();
      setIsPlaying(false);
    },
    seekTo(seconds) {
      videoRef.current.currentTime = seconds;
    },
    get currentTime() {
      return videoRef.current?.currentTime ?? 0;
    },
    get duration() {
      return videoRef.current?.duration ?? 0;
    },
  }), []);

  return (
    <div>
      <video ref={videoRef} src={src} poster={poster} />
      <div>{isPlaying ? '▶ Playing' : '⏸ Paused'}</div>
    </div>
  );
});

// ============================================================
// Q4: Granular Suspense and Error Boundary placement
// ============================================================
/*
STRATEGY: Wrap independent sections separately.
  If one section errors, only that section shows the error UI.
  Other sections continue working.
*/

function Dashboard() {
  return (
    <div>
      {/* Each section independently loads and handles errors */}
      <ErrorBoundary fallback={({ reset }) => <SectionError onRetry={reset} />}>
        <Suspense fallback={<Skeleton />}>
          <UserStats />  {/* can suspend */}
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={({ reset }) => <SectionError onRetry={reset} />}>
        <Suspense fallback={<Skeleton />}>
          <RecentActivity />  {/* can suspend independently */}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

// ============================================================
// Q5: useDebugValue — custom hooks debugging
// ============================================================
import { useDebugValue } from 'react';

function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Shows "Auth: Loading..." or "Auth: Authenticated (Alice)" in React DevTools
  useDebugValue(
    user,
    (u) => u ? `Authenticated (${u.name})` : loading ? 'Loading...' : 'Guest'
  );

  return { user, loading };
}

// ============================================================
// INTERVIEW QUESTIONS
/*
Q: What is a React Portal and when do you use it?
A: createPortal renders children into a different DOM node than the component's parent.
   Use for modals, tooltips, toasts — anything needing to escape overflow:hidden or
   z-index stacking contexts. Events still bubble through the React tree normally.

Q: What does an Error Boundary NOT catch?
A: Does not catch: async errors (fetch, setTimeout), event handler errors,
   server-side rendering errors, errors in the boundary itself.
   For async errors: use try/catch and state. For event handlers: use try/catch directly.

Q: Why can't you use hooks for error boundaries?
A: getDerivedStateFromError and componentDidCatch have no hook equivalents.
   React has proposed useError() but it's not released yet (as of React 19).
   Libraries like react-error-boundary wrap the class component pattern.

Q: What is forwardRef and when do you need it?
A: forwardRef allows parent components to attach a ref to a DOM element inside
   a child component. You need it when building reusable input/button/UI library
   components that consumers need to focus/measure programmatically.
   In React 19, ref is a plain prop — forwardRef is no longer needed.

Q: What is useImperativeHandle and why should you use it sparingly?
A: It customizes the object exposed via a forwardRef ref. Instead of exposing the
   raw DOM node, you expose a clean API (focus, clear, validate).
   Use sparingly because refs break the data-down/events-up model. Prefer
   controlled components with props. Use imperative handles only for:
   animation triggers, focus management, media playback, measurements.
*/

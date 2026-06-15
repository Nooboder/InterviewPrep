/**
 * BROWSER INTERNALS — Critical Rendering Path, Reflow, Repaint, rAF
 * Big4/MNC Frequency: ⭐⭐⭐⭐⭐ (Top senior frontend question — most candidates can't answer this)
 *
 * Topics: HTML parsing, DOM/CSSOM, render tree, layout, paint, composite,
 *         reflow triggers, repaint triggers, requestAnimationFrame, layers
 */

// ============================================================
// Q1: Critical Rendering Path — step by step
// ============================================================
/*
The browser's process from receiving HTML bytes to pixels on screen:

1. BYTES → CHARACTERS
   Browser receives raw bytes, converts to characters using charset (UTF-8)

2. CHARACTERS → TOKENS
   HTML parser tokenizes characters: <html>, <head>, <body>, text nodes...

3. TOKENS → NODES
   Each token becomes a Node object

4. NODES → DOM (Document Object Model)
   Nodes are connected into a tree structure. Blocking! HTML parser stops
   when it hits <script> (unless async/defer).

5. CSS → CSSOM (CSS Object Model)
   Parallel to DOM construction, CSS is parsed into CSSOM tree.
   CSS is RENDER-BLOCKING — browser won't paint until CSSOM is complete.
   This is why <link rel="stylesheet"> should be in <head>.

6. DOM + CSSOM → RENDER TREE
   Only visible nodes (display: none is excluded, visibility: hidden IS included).
   Each node gets its computed styles.

7. RENDER TREE → LAYOUT (Reflow)
   Browser calculates exact position and size of every element.
   Output: box model values (x, y, width, height) for each element.

8. LAYOUT → PAINT
   Browser fills in pixels: text, colors, images, borders, shadows.
   Happens on multiple LAYERS.

9. PAINT → COMPOSITE
   Browser combines painted layers in the correct order (z-index, opacity).
   Happens on the GPU. Compositing is CHEAP — no layout or paint needed.

RENDER-BLOCKING RESOURCES:
  CSS: always render-blocking (browser needs CSSOM before painting)
  JavaScript: render-blocking unless async or defer
  Fonts: can cause FOIT (flash of invisible text) without font-display strategy
*/

// ============================================================
// Q2: JavaScript loading — async vs defer vs module
// ============================================================
/*
Normal <script>:
  HTML parsing STOPS → download JS → execute JS → resume HTML parsing
  WORST for performance. Avoid.

<script async>:
  HTML parsing continues while JS downloads
  Execution happens IMMEDIATELY when JS is ready (pauses HTML)
  Order not guaranteed — scripts may execute out of order
  USE FOR: independent analytics scripts (Google Analytics)

<script defer>:
  HTML parsing continues while JS downloads
  Execution happens AFTER HTML is fully parsed, IN ORDER
  USE FOR: almost all application JS. React bundles should use defer.

<script type="module">:
  Behaves like defer by default
  Always deferred, strict mode, supports import/export
  USE FOR: modern ES module apps

VISUAL TIMELINE:
  Normal: |--parse HTML--|--stop--|--download+exec--|--resume parse--|
  async:  |--parse HTML----|--exec--|--continue parse--|
  defer:  |--parse HTML (download concurrent)--|--exec--|
  module: same as defer
*/

// ============================================================
// Q3: Reflow (Layout) vs Repaint
// ============================================================
/*
REFLOW (Layout):
  Browser recalculates positions and sizes of elements.
  EXPENSIVE — affects the entire document or subtree.

  Triggers:
  - Adding/removing DOM elements
  - Changing element dimensions (width, height, padding, margin, border)
  - Changing fonts or text content
  - Changing visibility (display: none → removes from layout)
  - Window resize
  - Changing position (top, left, right, bottom)
  - Scrolling (sometimes)
  - Reading layout properties (forced synchronous layout — see below)

  Layout-affecting CSS properties (always cause reflow):
  width, height, padding, margin, border, top, left, right, bottom,
  font-size, font-family, position, display, float, overflow

REPAINT:
  Browser redraws pixels without changing positions/sizes.
  LESS EXPENSIVE than reflow but still costs.

  Triggers:
  - Changing color, background-color, border-color
  - Changing visibility: hidden (kept in layout, just not drawn)
  - Changing outline, box-shadow, border-radius
  - Background images

COMPOSITE ONLY (cheapest — GPU):
  Only the layer order/position changes. No layout or paint.
  Properties: transform, opacity
  These are the ONLY truly performant animation properties.

  WHY transform/opacity are special:
  - They're composited on the GPU in a separate layer
  - They don't affect layout of other elements
  - Browser doesn't need to repaint — just moves/scales the existing texture

COST ORDER: Reflow > Repaint > Composite
*/

// ============================================================
// Q4: Forced Synchronous Layout (Layout Thrashing)
// ============================================================
/*
PROBLEM: Reading layout properties (offsetWidth, getBoundingClientRect)
after making style changes forces the browser to perform layout synchronously.
Doing this in a loop = "layout thrashing" = massive performance hit.

WHY: Browser batches style changes and applies them lazily.
     But reading layout properties FORCES immediate recalculation.
*/

// BAD — layout thrashing (reads after writes force synchronous reflow)
function badExample(elements) {
  elements.forEach(el => {
    const width = el.offsetWidth;    // FORCES LAYOUT (reads)
    el.style.width = width * 2 + 'px'; // write
    // Next iteration: browser must recalculate before next offsetWidth read
  });
}

// GOOD — batch reads, then batch writes (only 1 reflow)
function goodExample(elements) {
  // READ phase — all reads first
  const widths = elements.map(el => el.offsetWidth);

  // WRITE phase — all writes after
  elements.forEach((el, i) => {
    el.style.width = widths[i] * 2 + 'px';
  });
}

// Properties that trigger forced synchronous layout when READ:
const layoutProperties = [
  'offsetWidth', 'offsetHeight', 'offsetTop', 'offsetLeft',
  'scrollWidth', 'scrollHeight', 'scrollTop', 'scrollLeft',
  'clientWidth', 'clientHeight', 'clientTop', 'clientLeft',
  'getBoundingClientRect()',
  'getComputedStyle()',
  'window.innerWidth', 'window.innerHeight',
];

// ============================================================
// Q5: Layers and will-change
// ============================================================
/*
The browser creates separate compositor layers for certain elements.
  - <video> and <canvas>
  - Elements with CSS transform or 3D transform
  - Elements with opacity < 1
  - Elements with will-change: transform/opacity

will-change: transform  ← promotes element to its own layer BEFORE animation
  PRO: smooth 60fps animation — no paint during animation
  CON: consumes GPU memory — don't apply to everything!

  BAD: * { will-change: transform; } // never do this
  GOOD: apply only to elements you KNOW will animate, remove after animation

Layer promotion with transform (GPU compositing trick):
*/
function createSmoothAnimation(element) {
  // Promote to own layer before animation
  element.style.willChange = 'transform';

  element.addEventListener('transitionend', () => {
    // Clean up after animation — free GPU memory
    element.style.willChange = 'auto';
  });

  // Trigger animation
  element.style.transform = 'translateX(100px)';
}

// ============================================================
// Q6: requestAnimationFrame — why and how
// ============================================================
/*
requestAnimationFrame (rAF) is a browser API to schedule visual updates
synchronized with the display's refresh rate (usually 60fps = every 16.67ms).

WHY use rAF instead of setTimeout(fn, 16)?
  - setTimeout is imprecise — JS event loop may delay it
  - setTimeout doesn't align with browser paint cycle — causes jank
  - rAF is called right before the browser paints
  - rAF is paused when tab is hidden — saves battery/CPU
  - Browser can optimize multiple rAF calls into one frame

USE CASES:
  - Smooth animations (anything CSS animations can't handle)
  - Canvas drawing loops
  - Scroll-based animations
  - Measuring layout properties in animation loop (avoids thrashing)
  - Batch DOM writes at the right time
*/

// Basic animation loop
function animate(timestamp) {
  // timestamp is DOMHighResTimeStamp (milliseconds with microsecond precision)

  const progress = timestamp / 1000; // seconds elapsed
  element.style.transform = `translateX(${Math.sin(progress) * 100}px)`;

  requestAnimationFrame(animate); // schedule next frame
}

// Start
const animationId = requestAnimationFrame(animate);

// Stop when done
cancelAnimationFrame(animationId);

// Practical: animate with start time and duration
function animateElement(element, from, to, duration) {
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;

    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1); // clamp 0-1

    // Easing (ease-out)
    const eased = 1 - Math.pow(1 - progress, 3);

    element.style.transform = `translateX(${from + (to - from) * eased}px)`;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// Scroll-based animation — EFFICIENT pattern
function initScrollAnimation() {
  let ticking = false; // prevents multiple rAF per scroll event

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        // Read scroll position (layout read — but inside rAF = correct time)
        const scrollY = window.scrollY;

        // Update elements based on scroll
        updateAnimations(scrollY);

        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true }); // passive = no preventDefault
}

// ============================================================
// Q7: Performance Timeline — understanding browser metrics
// ============================================================
/*
KEY EVENTS in the timeline:

TTFB (Time to First Byte): Time from request to first byte received
FP (First Paint): First pixel drawn on screen (may just be background)
FCP (First Contentful Paint): First text, image, or meaningful content
LCP (Largest Contentful Paint): Largest element painted (target: <2.5s)
TTI (Time to Interactive): Page is reliably interactive (target: <5s)
TBT (Total Blocking Time): Total time main thread was blocked >50ms
CLS (Cumulative Layout Shift): Sum of unexpected layout shifts (target: <0.1)
INP (Interaction to Next Paint): Replaces FID, measures response to all interactions

HOW TO OPTIMIZE EACH:
  LCP: Preload hero images, use next/image, avoid lazy-loading above-fold images
  CLS: Set explicit width/height on images/videos, avoid inserting content above existing
  INP: Move heavy work to Web Workers, defer non-critical JS, optimize event handlers
  FCP: Remove render-blocking CSS, inline critical CSS, preconnect to font origins
*/

// ============================================================
// Q8: Reducing reflow in React
// ============================================================
/*
React already batches DOM updates (that's the point of virtual DOM).
But YOU can still cause problems:
*/

// AVOID reading layout properties synchronously after state changes
function BadComponent() {
  const ref = useRef();

  const handleClick = () => {
    setState(newValue);
    // BAD: reading layout right after state change
    // React hasn't flushed yet — this reads stale value
    console.log(ref.current.offsetWidth);
  };
}

// CORRECT: read in useLayoutEffect (runs synchronously after DOM update)
function GoodComponent() {
  const ref = useRef();

  useLayoutEffect(() => {
    // DOM is updated, safe to read layout properties
    const width = ref.current.offsetWidth;
    // use width to compute something and update state
  });
}

/*
useEffect vs useLayoutEffect:
  useEffect: fires AFTER paint (async) — use for most side effects
  useLayoutEffect: fires AFTER DOM update but BEFORE paint (sync) — use for:
    - Measuring DOM elements
    - Animations that depend on DOM position
    - Avoiding flash of incorrect layout
*/

// ============================================================
// INTERVIEW QUESTIONS
/*
Q: What is the critical rendering path?
A: The sequence of steps: HTML parsing → DOM, CSS parsing → CSSOM,
   DOM + CSSOM → Render Tree, Layout (positions), Paint (pixels), Composite (layers).
   Optimizing CRP means reducing/eliminating render-blocking resources.

Q: What triggers a reflow vs a repaint?
A: Reflow: any change to geometry — width, height, position, adding/removing elements.
   Repaint: visual change without geometry change — color, background, shadow.
   Composite only: transform and opacity — GPU-only, no CPU reflow or repaint.

Q: Why should you prefer transform over top/left for animations?
A: top/left changes affect layout → trigger reflow + repaint on every frame.
   transform is composited on GPU → no reflow, no repaint, 60fps smooth.

Q: What is layout thrashing?
A: Reading layout properties (offsetWidth, getBoundingClientRect) immediately
   after writing to the DOM forces the browser to synchronously calculate layout.
   Doing this in a loop is "thrashing" — extremely slow. Fix: batch reads before writes.

Q: When would you use useLayoutEffect instead of useEffect?
A: When you need to measure DOM elements or sync DOM state before the browser
   paints. useEffect runs after paint and can cause a visual flash.
   Classic use case: tooltip positioning, matching scroll position, animations.
*/

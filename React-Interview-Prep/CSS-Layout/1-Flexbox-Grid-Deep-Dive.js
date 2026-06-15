/**
 * CSS FLEXBOX & GRID — Deep Dive
 * Big4/MNC Frequency: ⭐⭐⭐⭐⭐ (Every frontend interview tests layout knowledge)
 *
 * Topics: Flexbox axes, alignment, flex sizing, Grid template, auto-fill/fit,
 *         grid areas, responsive patterns, common interview problems
 */

// ============================================================
// PART 1: FLEXBOX
// ============================================================

// ============================================================
// Q1: Flexbox mental model — the two axes
// ============================================================
/*
Flexbox is ONE-DIMENSIONAL — either a row OR a column.

Main axis:  defined by flex-direction (default: row → left to right)
Cross axis: perpendicular to main axis

flex-direction values:
  row            → main axis: left→right,  cross: top→bottom
  row-reverse    → main axis: right→left,  cross: top→bottom
  column         → main axis: top→bottom,  cross: left→right
  column-reverse → main axis: bottom→top,  cross: left→right

This is WHY justify-content controls one axis and align-items controls the other —
they always refer to main/cross axis, not horizontal/vertical.
*/

// ============================================================
// Q2: justify-content vs align-items vs align-content
// ============================================================
/*
justify-content:  distributes items along the MAIN axis
  flex-start | flex-end | center | space-between | space-around | space-evenly

align-items:     aligns items along the CROSS axis (single line)
  flex-start | flex-end | center | stretch (default) | baseline

align-content:   aligns LINES along the cross axis (only applies when flex-wrap wraps)
  flex-start | flex-end | center | space-between | space-around | stretch

align-self:      overrides align-items for ONE specific item
  auto | flex-start | flex-end | center | stretch | baseline

INTERVIEW TRICK: "center a div" question
  display: flex;
  justify-content: center;  // main axis (horizontal when row)
  align-items: center;      // cross axis (vertical when row)
*/

// ============================================================
// Q3: flex-grow, flex-shrink, flex-basis — the holy trinity
// ============================================================
/*
flex: <grow> <shrink> <basis>   ← shorthand

flex-basis: initial size before free space is distributed
  auto (default) → use the item's width/height
  0             → start from 0, fully proportional
  200px         → start from 200px, then grow/shrink

flex-grow:  how much the item GROWS to fill free space
  0 (default) → don't grow
  1           → take all available free space equally
  2           → take twice as much as flex-grow: 1 siblings

flex-shrink: how much the item SHRINKS when container is too small
  1 (default) → shrink proportionally
  0           → NEVER shrink (useful for fixed-size items)

COMMON PATTERNS:
  flex: 1           → flex: 1 1 0    (grow, shrink, start from 0)
  flex: auto        → flex: 1 1 auto (grow, shrink, start from natural size)
  flex: none        → flex: 0 0 auto (don't grow, don't shrink = rigid)
  flex: 0 0 200px   → fixed 200px, never grow or shrink

INTERVIEW QUESTION: "If parent is 600px and three children each have flex: 1,
                     how wide is each child?"
ANSWER: Each gets 200px (600/3 = 200). flex: 1 = flex: 1 1 0, so they start
        from 0 and divide all 600px equally.
*/

// ============================================================
// Q4: Common Flexbox patterns (memorize these)
// ============================================================
const cssPatterns = `
/* 1. Perfect centering */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 2. Space between with last item right-aligned (header nav) */
.nav {
  display: flex;
  align-items: center;
  gap: 16px;
}
.nav .spacer { flex: 1; } /* pushes everything after it to the right */

/* 3. Sidebar + main content layout */
.layout {
  display: flex;
}
.sidebar {
  flex: 0 0 240px; /* fixed 240px, never grow/shrink */
}
.main {
  flex: 1; /* take all remaining space */
  min-width: 0; /* prevents content overflow in flex children */
}

/* 4. Card with footer always at bottom (regardless of content height) */
.card {
  display: flex;
  flex-direction: column;
}
.card-body {
  flex: 1; /* expands to push footer down */
}
.card-footer {
  flex-shrink: 0; /* don't shrink even if content is large */
}

/* 5. Wrap with equal-width items */
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.grid-item {
  flex: 1 1 200px; /* grow/shrink but never smaller than 200px */
  max-width: calc(33.333% - 16px); /* max 3 per row */
}
`;

// ============================================================
// Q5: Common Flexbox gotchas
// ============================================================
/*
1. min-width: 0 on flex children
   Flex items default to min-width: auto (never shrink below content size).
   Text overflow, pre tags, and images can cause overflow.
   Fix: add min-width: 0 or overflow: hidden to the flex child.

2. flex-basis vs width
   In a flex row, flex-basis takes precedence over width.
   In a flex column, flex-basis takes precedence over height.

3. align-items: stretch (default) makes children match container height
   This is why children in a flex row are all the same height by default.

4. gap replaces margin hacks
   gap: 16px adds space between flex items (not at edges).
   Modern and clean — no need for :not(:last-child) margin tricks.

5. order changes visual order, not DOM order
   Affects accessibility (keyboard/screen reader follows DOM, not visual).
   Use with caution.
*/

// ============================================================
// PART 2: CSS GRID
// ============================================================

// ============================================================
// Q6: Grid mental model — two-dimensional
// ============================================================
/*
Grid is TWO-DIMENSIONAL — rows AND columns simultaneously.

Key concepts:
  Grid container: element with display: grid
  Grid item:      direct child of grid container
  Grid track:     a single row or column
  Grid cell:      intersection of a row and column
  Grid area:      one or more cells (can span multiple)
  Grid line:      numbered lines between tracks (1-indexed)

justify-items:    aligns items horizontally within their cell (default: stretch)
align-items:      aligns items vertically within their cell (default: stretch)
justify-content:  distributes column tracks within container (when tracks < container)
align-content:    distributes row tracks within container
justify-self:     overrides justify-items for one item
align-self:       overrides align-items for one item
place-items:      shorthand for align-items + justify-items
place-content:    shorthand for align-content + justify-content
*/

// ============================================================
// Q7: grid-template-columns and fr units
// ============================================================
const gridExamples = `
/* Fixed columns */
grid-template-columns: 200px 200px 200px;

/* Fractional units — proportional */
grid-template-columns: 1fr 2fr 1fr; /* 25% 50% 25% of available space */

/* Mixed */
grid-template-columns: 240px 1fr; /* fixed sidebar, flexible main */

/* repeat() shorthand */
grid-template-columns: repeat(3, 1fr);          /* 3 equal columns */
grid-template-columns: repeat(3, minmax(0, 1fr)); /* 3 columns, min 0 */

/* minmax() — key for responsive grids */
grid-template-columns: repeat(3, minmax(200px, 1fr));
/* Each column is at least 200px, shares extra space equally */

/* Named lines */
grid-template-columns: [sidebar-start] 240px [sidebar-end main-start] 1fr [main-end];
/* .main { grid-column: main-start / main-end; } */

/* gap */
gap: 16px;             /* row-gap and column-gap */
row-gap: 16px;
column-gap: 24px;
`;

// ============================================================
// Q8: auto-fill vs auto-fit — the most asked Grid question
// ============================================================
/*
Both are used inside repeat() to create responsive grids without media queries.

auto-fill: fills the row with as many columns as fit (even if empty)
           creates empty column tracks to maintain structure

auto-fit: fits the EXISTING columns into the space
          collapses empty tracks — columns expand to fill space

VISUAL:
  Container: 600px, items: 150px min-width

  auto-fill: [item1][item2][item3][item4][empty][empty]
  auto-fit:  [  item1  ][  item2  ][  item3  ][  item4  ]

WHICH TO USE:
  auto-fit:  when you want items to grow and fill the row → preferred for card grids
  auto-fill: when you need fixed column widths and want to know where items end
*/
const responsiveGrid = `
/* Responsive card grid — NO media queries needed */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
/* This creates: 1 col on mobile, 2 on tablet, 3+ on desktop automatically */
`;

// ============================================================
// Q9: grid-template-areas — semantic layout
// ============================================================
const gridAreas = `
/* Page layout with named areas */
.page {
  display: grid;
  grid-template-areas:
    "header  header  header"
    "sidebar main    main"
    "sidebar main    main"
    "footer  footer  footer";
  grid-template-columns: 240px 1fr 1fr;
  grid-template-rows: 60px 1fr 1fr 60px;
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }

/* Responsive — collapse sidebar on mobile */
@media (max-width: 768px) {
  .page {
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "footer";
    grid-template-columns: 1fr;
    grid-template-rows: 60px 1fr auto auto 60px;
  }
}
`;

// ============================================================
// Q10: grid-column / grid-row — spanning cells
// ============================================================
const gridSpanning = `
/* Span across columns/rows */
.featured-card {
  grid-column: 1 / 3;     /* from line 1 to line 3 = spans 2 columns */
  grid-row: 1 / 3;        /* spans 2 rows */
}

/* span keyword */
.wide-item {
  grid-column: span 2;    /* spans 2 columns from current position */
}

/* auto placement with manual overrides */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;  /* implicit row height */
}
.tall-item {
  grid-row: span 2;       /* takes 2 row tracks */
}
`;

// ============================================================
// Q11: Flexbox vs Grid — when to choose
// ============================================================
/*
FLEXBOX:
✓ One-dimensional layouts (nav bar, button group, centering)
✓ Content-driven sizing (items size to content)
✓ Unknown number of items
✓ Wrapping to new rows when needed
USE FOR: header nav, button groups, form controls, centering, card footers

GRID:
✓ Two-dimensional layouts (page layout, photo gallery, data grid)
✓ Layout-driven sizing (items placed into predefined tracks)
✓ Overlapping elements (using same grid area)
✓ Alignment in both axes simultaneously
USE FOR: page layouts, card grids, dashboards, image galleries, form layouts

RULE OF THUMB:
  "You know the rows AND columns" → Grid
  "You know one direction, items flow" → Flexbox
  "Overlapping items" → Grid
  "Navigation bar" → Flexbox
*/

// ============================================================
// Q12: CSS Grid for overlap (no absolute positioning needed)
// ============================================================
const gridOverlap = `
/* Image with text overlay — no position: absolute needed */
.hero {
  display: grid;
}
.hero > * {
  grid-column: 1; /* all children occupy the same column */
  grid-row: 1;    /* all children occupy the same row = overlap */
}
.hero-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
.hero-text {
  align-self: center;
  justify-self: center;
  z-index: 1;
  color: white;
}
`;

// ============================================================
// INTERVIEW QUESTIONS
/*
Q: How do you make a div take up all remaining space in a flex container?
A: Apply flex: 1 or flex-grow: 1 to that item.

Q: What does flex: 0 0 auto mean?
A: Don't grow (0), don't shrink (0), start from natural size (auto). Rigid item.

Q: How do you create a 3-column responsive grid that becomes 1 column on mobile
   without media queries?
A: grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

Q: What is the difference between grid-template-rows and grid-auto-rows?
A: grid-template-rows: defines explicit rows you plan in advance.
   grid-auto-rows: defines height for implicitly created rows
   (rows created by auto-placement when items exceed explicit tracks).

Q: How do you vertically center content in CSS Grid?
A: On the container: place-items: center; (or align-items + justify-items: center)
   On an item: place-self: center; (or align-self + justify-self: center)

Q: What does align-items: baseline do in flexbox?
A: Aligns items so their text baselines are aligned. Useful when items have
   different font sizes and you want the text to line up visually.

Q: Why do you sometimes need min-width: 0 on a flex item?
A: Because flex items have min-width: auto by default, meaning they'll never
   shrink below their content's intrinsic size. Adding min-width: 0 allows
   the item to shrink properly (needed for text overflow and pre-formatted content).
*/

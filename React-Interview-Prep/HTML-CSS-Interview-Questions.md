# HTML & CSS Interview Questions – Short & Crisp

This version is made for fast revision. It focuses on the most commonly asked questions from an interviewer’s point of view.

---

## HTML Questions

1. What is HTML?

- HTML is used to structure web pages.

2. What is HTML5?

- HTML5 adds semantic tags, audio/video support, better forms, and local storage.

3. What are semantic elements?

- They give meaning to content, like `header`, `footer`, `section`, `article`, `nav`.

4. What is the difference between `div` and `span`?

- `div` is block-level; `span` is inline.

5. What is the purpose of `doctype`?

- It tells the browser to render the page in standard HTML mode.

6. What is the difference between `class` and `id`?

- `id` is unique; `class` can be reused.

7. What is the purpose of `meta` tags?

- They provide page metadata like charset, viewport, description, and SEO info.

8. What is the `viewport` meta tag?

- It makes the page responsive on mobile devices.

9. What is the difference between `GET` and `POST`?

- `GET` sends data in the URL; `POST` sends it in the body.

10. What is form validation?

- It checks user input before submission using attributes like `required`, `pattern`, `minlength`.

11. Why is `alt` important?

- It improves accessibility and helps screen readers and SEO.

12. What is accessibility in HTML?

- It makes websites usable for people with disabilities.

13. What is ARIA?

- ARIA helps make dynamic web content accessible.

14. What is the difference between `label` and `placeholder`?

- `label` describes the field; `placeholder` is just hint text.

15. What is the role of the `title` tag?

- It defines the page title shown in the browser tab and search results.

---

## CSS Questions

16. What is CSS?

- CSS is used to style HTML elements.

17. What is the box model?

- It includes content, padding, border, and margin.

18. What is the difference between margin and padding?

- Padding adds space inside an element; margin adds space outside it.

19. What is specificity?

- It decides which CSS rule wins when multiple rules apply.

20. What is the cascade in CSS?

- It is the process of resolving conflicting styles.

21. What are the different ways to add CSS?

- Inline, internal, and external CSS.

22. What are CSS selectors?

- They target HTML elements for styling.

23. What is the difference between child and descendant selectors?

- Child selects direct children; descendant selects all nested children.

24. What are pseudo-classes and pseudo-elements?

- Pseudo-classes style states like `:hover`; pseudo-elements style parts like `::before`.

25. What is the difference between `display: block`, `inline`, and `inline-block`?

- Block takes full line; inline stays in flow; inline-block allows sizing while staying inline.

26. What is the difference between `position: relative`, `absolute`, `fixed`, and `sticky`?

- They control how an element is positioned in the layout.

27. What is Flexbox?

- Flexbox is used for one-dimensional layouts.

28. What is CSS Grid?

- Grid is used for two-dimensional layouts.

29. What is the difference between Flexbox and Grid?

- Flexbox is for rows/columns in one direction; Grid is for rows and columns together.

30. What is `z-index`?

- It controls the stacking order of overlapping elements.

31. What is `overflow`?

- It controls what happens when content exceeds the container size.

32. What are media queries?

- They make websites responsive for different screen sizes.

33. What is responsive design?

- It makes the layout adapt to mobile, tablet, and desktop screens.

34. What is the purpose of `max-width` and `min-width`?

- They control the minimum and maximum size of an element.

35. What are CSS variables?

- They store reusable values in CSS.

36. What is the difference between `em` and `rem`?

- `em` is relative to parent; `rem` is relative to the root.

37. What is the difference between `px`, `%`, `vh`, and `vw`?

- They are different units for sizing based on fixed or viewport-based values.

38. What is `transition`?

- It creates smooth animation between two states.

39. What is `transform`?

- It changes the shape, rotation, scale, or position of an element.

40. What is the difference between `opacity` and `visibility`?

- `opacity` makes it transparent; `visibility: hidden` hides it but keeps space.

41. What is the difference between `display: none` and `visibility: hidden`?

- `display: none` removes it from layout; `visibility: hidden` keeps the space.

---

## Practical / Interview-Style Questions

42. How do you center an element vertically and horizontally?

- Use Flexbox or Grid.

43. How do you make a website responsive?

- Use media queries, flexible layouts, and relative units.

44. How do you create a sticky header?

- Use `position: sticky`.

45. How do you make an image responsive?

- Use `max-width: 100%` and `height: auto`.

46. How do you create a navbar that works on mobile?

- Use Flexbox/Grid and media queries.

47. Why are semantic tags important?

- They improve readability, accessibility, and SEO.

48. Why is accessibility important?

- It ensures the website is usable for all users, including people with disabilities.

49. What causes a layout to break?

- Improper positioning, missing width/height, or conflicting CSS rules.

50. How do you improve CSS performance?

- Avoid unnecessary rules, keep CSS organized, and reduce heavy animations.

---

## Quick Revision Tips

- Answer in 1–2 sentences.
- Use simple examples when possible.
- Be clear about the difference between similar concepts.
- Practice Flexbox, Grid, positioning, and responsive design the most.

54. What is the difference between `opacity` and `visibility`?

- `opacity` makes an element transparent.
- `visibility: hidden` hides it but still reserves space.

55. What is the difference between `display: none` and `visibility: hidden`?

- `display: none` removes the element from layout.
- `visibility: hidden` hides it but keeps its space.

---

## 3. Frequently Asked Practical Questions

56. How do you center an element horizontally and vertically?

- Use Flexbox or Grid with `justify-content: center` and `align-items: center`.

57. How do you make a website responsive?

- Use media queries, flexible grid layouts, relative units, and responsive images.

58. How do you create a sticky header?

- Use `position: sticky` on the header and set a top offset.

59. How do you create a three-column layout?

- Use CSS Grid or Flexbox with three equal-width columns.

60. How do you improve page performance in CSS?

- Reduce reflows and repaints, avoid heavy animations, use efficient selectors, and keep CSS organized.

---

## 4. More Frequently Asked HTML Questions

61. What is the difference between `<section>`, `<article>`, and `<div>`?

- `<section>` groups related content.
- `<article>` is self-contained content.
- `<div>` is a generic container.

62. What is the difference between `<header>`, `<main>`, and `<footer>`?

- They define the structure of a page and improve readability and semantics.

63. What is a favicon?

- A favicon is the small icon shown in the browser tab.

64. What is the purpose of the `loading="lazy"` attribute?

- It defers image loading until they are needed, improving performance.

65. What is the difference between `src` and `href`?

- `src` is used for media files like images and scripts.
- `href` is used to link to another resource like a page or stylesheet.

66. What is the purpose of the `target` attribute in links?

- It specifies how the linked page should open, for example in a new tab.

67. What is the difference between `absolute` and `relative` paths?

- Absolute paths include the full URL or path.
- Relative paths are based on the current file location.

68. What is the `autocomplete` attribute?

- It lets browsers suggest previously entered values for form fields.

69. What is the difference between `canvas` and `SVG`?

- `canvas` is pixel-based and good for dynamic drawing.
- `SVG` is vector-based and scalable.

70. What are `data-*` attributes used for?

- They store custom data on HTML elements for JavaScript or styling.

---

## 5. More Frequently Asked CSS Questions

71. What is the difference between `inherit`, `initial`, `unset`, and `revert`?

- They control how a CSS property value is resolved.

72. What is the difference between `float`, `flex`, and `grid`?

- `float` is an older layout method.
- `flex` is one-dimensional.
- `grid` is two-dimensional.

73. What is the difference between `min-content`, `max-content`, and `fit-content`?

- They control intrinsic sizing behavior of elements.

74. What is `clamp()` in CSS?

- It lets you set a value between a minimum and maximum range.

75. What is `calc()` in CSS?

- It allows mathematical expressions for property values.

76. What is `aspect-ratio`?

- It helps maintain a consistent width-to-height ratio for elements.

77. What is `contain` in CSS?

- It tells the browser that an element’s layout, style, and paint can be isolated.

78. What is the difference between `gap`, `row-gap`, and `column-gap`?

- `gap` sets both row and column spacing, while the others control one direction.

79. What is `object-fit`?

- It controls how an image or video fits inside its container.

80. What is the difference between `background` and `background-color`?

- `background` is a shorthand that can set multiple background properties at once.

81. What is `line-height` used for?

- It controls the vertical spacing between lines of text.

82. What is `letter-spacing`?

- It adjusts the space between characters.

83. What are `@media` rules used for?

- They define responsive styles for different screen sizes.

84. What is the difference between `:first-child` and `:first-of-type`?

- `:first-child` targets the first child element.
- `:first-of-type` targets the first matching child of its type.

85. What is `:not()` used for?

- It selects elements that do not match a given selector.

86. What is the difference between `position: static` and `relative`?

- `static` is the default flow position.
- `relative` allows offsetting from the normal position.

87. Why is `overflow-x` or `overflow-y` used?

- They control horizontal or vertical scrolling behavior when content exceeds the container.

88. What is a CSS reset and why is it used?

- It removes browser default styles for a more consistent UI.

---

## 6. Scenario-Based and Practical Questions

89. How do you create a responsive navbar?

- Use Flexbox or Grid, set media queries, and make the layout collapse on smaller screens.

90. How do you make a button change color on hover?

- Use the `:hover` pseudo-class in CSS.

91. How do you make an image responsive?

- Set `max-width: 100%` and `height: auto`.

92. How do you create a modal popup?

- Use HTML for structure, CSS for styling and positioning, and JavaScript for toggling visibility.

93. How do you make text wrap properly in a container?

- Use `word-wrap`, `overflow-wrap`, or `white-space` appropriately.

94. How do you create equal-height columns?

- Use CSS Grid or Flexbox, or set equal heights in a container-based layout.

95. How do you prevent an element from taking extra space in layout?

- Use `display: none`, `position: absolute`, or `visibility: hidden` depending on the requirement.

96. How do you make a layout look good on both desktop and mobile?

- Use responsive design principles, media queries, relative units, and flexible layouts.

97. How do you create a sticky footer?

- Use flexbox with the main content area taking available space, or use CSS grid.

98. How do you create a card layout?

- Use Flexbox or Grid with padding, border, shadow, and spacing.

99. How do you handle text overflow elegantly?

- Use `overflow: hidden`, `text-overflow: ellipsis`, and `white-space: nowrap`.

100. How do you optimize CSS for performance?

- Avoid excessive specificity, reduce unused rules, minimize reflows, and use efficient selectors.

---

## 7. Common Interview Traps and Hot Topics

101. What is the difference between `display: none` and `visibility: hidden`?

- `display: none` removes the element from layout, while `visibility: hidden` keeps its space reserved.

102. What is the difference between `position: relative` and `position: absolute`?

- `relative` offsets from the normal position.
- `absolute` positions relative to the nearest positioned ancestor.

103. What is the difference between `flexbox` and `grid` in real projects?

- Flexbox is simpler for one-dimensional alignment.
- Grid is better for complex two-dimensional layouts.

104. Why are semantic tags important?

- They improve readability, accessibility, SEO, and maintainability.

105. Why is accessibility important in interviews?

- It demonstrates that you build usable applications for all users, not just the visual experience.

106. What happens if an element has conflicting CSS rules?

- The browser resolves them using specificity, importance, and source order.

107. What are the common reasons a layout breaks?

- Incorrect box model usage, missing width/height, improper positioning, or conflicting styles.

108. What is the most important thing to remember when answering HTML/CSS questions?

- Explain the concept clearly, give a small example, and mention the practical use case.

---

## 8. Quick Interview Tips

- Be ready to explain concepts clearly with examples.
- Practice writing layouts using Flexbox and Grid.
- Understand the difference between layout properties like `position`, `display`, `overflow`, and `z-index`.
- Be comfortable answering accessibility and responsive design questions.
- For senior roles, also discuss performance, maintainability, and best practices.
- Keep your answers short, practical, and real-world oriented.

---

## 9. Bonus: 15 High-Value Questions

1. What is the difference between `display: none` and `visibility: hidden`?
2. What is the CSS box model?
3. What is specificity and how does it work?
4. What is the difference between Flexbox and Grid?
5. What are media queries used for?
6. What are semantic HTML tags and why are they important?
7. What is the purpose of the `meta viewport` tag?
8. What is the role of accessibility in web development?
9. What is the difference between `relative` and `absolute` positioning?
10. How do you make a layout responsive?
11. What is the difference between `margin` and `padding`?
12. What is the purpose of `z-index`?
13. What is the difference between `em` and `rem`?
14. Why are `alt` attributes important?
15. What is the difference between HTML and HTML5?

---

## 10. Suggested Preparation Strategy

- Study 20 questions daily.
- Practice answering in short and crisp sentences.
- Write small code snippets for layout and styling questions.
- Revise HTML5 semantic tags, CSS positioning, Flexbox, Grid, and responsiveness thoroughly.
- Be ready to explain your answers like you would in an interview.
- Review one real-world layout example every day.

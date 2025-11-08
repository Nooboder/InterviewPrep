// console.log(0.1 + 0.2 === 0.3); // false
// // Due to floating-point precision issues in JavaScript

// console.log((0.1 + 0.2).toFixed(1) === '0.3'); // true






//convert object to string

// const obj = {
//     a: 1,
//     b: 2,
//     c: 3
// }

// console.log(obj.toString()); // [object Object]
// console.log(JSON.stringify(obj)); // {"a":1,"b":2,"c":3}

// //convert string to object
// const str = '{"a":1,"b":2,"c":3}';
// console.log(JSON.parse(str)); // { a: 1, b: 2, c: 3 }





// shallow copy

// const obj = {
//     a: 1,
//     b: 2,
//     c: 3
// }

// console.log(Object.assign({}, obj)); // { a: 1, b: 2, c: 3 }
// console.log({ ...obj }); // { a: 1, b: 2, c: 3 }


// deep copy

// const obj = {
//     a: 1,
//     b: 2,
//     c: 3,
//     obj2: {
//         e: 4,
//         f: 5,
//         obj3: {
//             g: 6,
//             h: 7
//         }
//     }
// }

// const deepCopy = JSON.parse(JSON.stringify(obj));
// console.log(deepCopy); // { a: 1, b: 2, c: 3 }




// const obj1 = {
//     a: 1,
//     b: 2,
//     c: 3
// }

// const obj2 = {
//     d: 4,
//     e: 5,
//     f: 6
// }

// const mergedObj = { ...obj1, ...obj2 };
// console.log(mergedObj); // { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }



// Array Reduce , Map , filter ?

// const numbers = [1, 2, 3, 4];
// const doubled = numbers.map(num => num * 2);
// const res = numbers.map(num => num > 2);
// const result = numbers.map(num => num = 2);

// console.log(doubled); // [2, 4, 6, 8]
// console.log(numbers); // [1, 2, 3, 4] (original unchanged)
// console.log(res); // [false, false, true, true] (original unchanged)
// console.log(result); // [2, 2, 2, 2] (original unchanged)


// 🧩 1️⃣ Array.map() — Transform elements
// ➡️ Purpose:

// To transform each element of an array and return a new array of the same length.

// 🧠 Think of it like:

// “Take every item and change it somehow.”


// 🧩 2️⃣ Array.filter() — Select elements
// ➡️ Purpose:

// To filter (keep) only elements that satisfy a certain condition.
// Returns a new array, possibly smaller than the original.

// 🧠 Think of it like:

// “Keep only the items that pass the test.”




// Difference between useeffect and uselayouteffect ?

// useEffect runs after the render is committed to the screen. It doesn't block the painting of the UI, making it suitable for non-urgent tasks like data fetching or subscriptions.
// useLayoutEffect runs synchronously after all DOM mutations but before the browser has a chance to paint. It blocks the painting of the UI, making it suitable for tasks that need to happen before the user sees the result, like measuring layout or synchronously applying styles.






// difference between useMemo and useCallback ?

// useMemo is a React hook that memoizes the result of a function. It is used to optimize performance by caching the output of expensive calculations so that they are only recomputed when their dependencies change.
// useCallback is a React hook that memoizes the function itself. It is used to prevent unnecessary re-creations of functions, which can be useful when passing functions as props to child components to avoid unnecessary re-renders.



// Difference between redux and context api ?


// Redux is a standalone state management library that provides a predictable state container for JavaScript applications. It uses a unidirectional data flow and relies on actions and reducers to manage state changes. Redux is suitable for large-scale applications with complex state management needs.
// Context API is a built-in feature of React that allows for sharing state across components without the need for prop drilling. It is suitable for smaller applications or specific use cases where state needs to be shared among a few components. Context API is simpler to set up compared to Redux but may not be as powerful for complex state management scenarios.




// Diference between package.json and package-lock.json ?

// package.json is a file that contains metadata about a Node.js project, including its dependencies, scripts, and other configurations. It is used to define the project's structure and manage its dependencies.
// package-lock.json is a file that is automatically generated when installing dependencies using npm. It records the exact versions of the installed packages and their dependencies, ensuring that the same versions are used when the project is installed on different machines. It helps to maintain consistency and reproducibility in the project's dependency tree.






// List in html ?

// In HTML, lists are used to group related items together. There are three main types of lists:
// 1. Ordered List (<ol>): This type of list is used when the order of the items matters. Each item is numbered automatically.
// 2. Unordered List (<ul>): This type of list is used when the order of the items does not matter. Each item is marked with a bullet point.
// 3. Definition List (<dl>): This type of list is used to define terms and their descriptions. It consists of pairs of <dt> (definition term) and <dd> (definition description) elements.





// inline and block element difference ?

// Inline elements do not start on a new line and only take up as much width as necessary. Examples include <span>, <a>, and <strong>.
// Block elements start on a new line and take up the full width available. Examples include <div>, <p>, and <h1>.





// div tag and span tag difference ?

// The <div> tag is a block-level element used to group larger sections of content, while the <span> tag is an inline element used to group smaller pieces of content within a line. <div> creates a new block on the page, whereas <span> does not affect the flow of text.





// diference between meta tag and progress tag ?

// The <meta> tag is used to provide metadata about the HTML document, such as character encoding, viewport settings, and SEO information. It is placed within the <head> section of the document and does not display any content on the page.
// The <progress> tag is used to represent the progress of a task, such as a file download or form submission. It is a visual element that displays a progress bar and is placed within the <body> section of the document.







// diference between css border and css outline ?

// The main difference between CSS border and CSS outline is that the border is part of the element's box model and takes up space, while the outline is drawn outside the element's box and does not affect the layout or take up space. Additionally, outlines can be non-rectangular and can be used for accessibility purposes, while borders are always rectangular and are primarily used for visual styling.



// different positioning property tell me about this ?

// In CSS, there are several positioning properties that determine how an element is positioned on a web page:

// 1. static: This is the default positioning for all elements. Elements are positioned according to the normal flow of the document.
// 2. relative: This positions the element relative to its normal position. You can use the top, right, bottom, and left properties to adjust its position.
// 3. absolute: This positions the element relative to its nearest positioned ancestor (an ancestor with a position other than static). If there is no such ancestor, it is positioned relative to the initial containing block (usually the viewport).
// 4. fixed: This positions the element relative to the viewport, meaning it stays in the same place even when the page is scrolled.
// 5. sticky: This positions the element based on the user's scroll position. It toggles between relative and fixed positioning depending on the scroll position.


// overlaped element in css?


// In CSS, overlapping elements occur when two or more elements occupy the same space on a web page. This can happen due to various reasons, such as using absolute or fixed positioning, negative margins, or z-index values. To manage overlapping elements, you can use the z-index property to control the stacking order of elements, where higher z-index values are displayed on top of lower ones. Additionally, you can adjust the position and size of elements to prevent unwanted overlaps.





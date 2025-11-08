// find longest word from a string in js

// function findLongestWord(str) {
//     // Split the string into an array of words
//     const words = str.split(' ');
//     // Initialize a variable to keep track of the longest word
//     let longestWord = '';
//     // Iterate through each word in the array
//     for (const word of words) {
//         // If the current word is longer than the longestWord, update longestWord
//         if (word.length > longestWord.length) {
//             longestWord = word;
//         }
//     }
//     // Return the longest word
//     return longestWord;
// }
// // Example usage:
// const inputString = "The quick brown fox jumped over the lazy dog";
// const longest = findLongestWord(inputString);
// console.log(`The longest word is: ${longest}`); // Output: The longest word is: jumped





// second largest word from a string in js

// function findSecondLongestWord(str) {
//     const words = str.split(' ');
//     let longestWord = '';
//     let secondLongestWord = '';
//     for (const word of words) {
//         if (word.length > longestWord.length) {
//             secondLongestWord = longestWord;
//             longestWord = word;
//         } else if (word.length > secondLongestWord.length && word !== longestWord) {
//             secondLongestWord = word;
//         }
//     }
//     return secondLongestWord;
// }
// // Example usage:
// const secondLongest = findSecondLongestWord(inputString);
// console.log(`The second longest word is: ${secondLongest}`); // Output: The second longest word is: quick


const arr = [10, 18, 7, 6, 11]

// find out of sum of array elements


// function sumOfArray(arr){
//     let sum=0;
//     for(let i=0; i<arr.length; i++){
//         sum= sum+arr[i];
//     }
//     return sum;
// }

// console.log(sumOfArray(arr));



// find summation  to get 13 with elements from array
// function findPairWithSum(arr, targetSum) {
//     const pairs = [];
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = i + 1; j < arr.length; j++) {
//             if (arr[i] + arr[j] === targetSum) {
//                 pairs.push([arr[i], arr[j]]);
//             }
//         }
//     }
//     return pairs;
// }
// const targetSum = 13;
// const resultPairs = findPairWithSum(arr, targetSum);
// console.log(`Pairs with sum ${targetSum}:`, resultPairs); // Output: Pairs with sum 13: [ [ 7, 6 ] ]






// console.log(isNaN("hello"));

// console.log(isNaN("123"));

// console.log(isNaN(123));

// console.log(isNaN(NaN));

// console.log(isNaN(undefined));
// console.log(isNaN(null));

// console.log(isNaN(true));
// console.log(isNaN(false));

// console.log(isNaN(" "));

// console.log(isNaN("123abc"));

// console.log(isNaN("0"));

// console.log(isNaN("Infinity"));

// console.log(isNaN(Infinity));

// console.log(isNaN("-123.45"));
// console.log(isNaN("123.45"));
// console.log(isNaN("0x11"));
// console.log(isNaN("0b1010"));
// console.log(isNaN("0o12"));
// console.log(isNaN("NaN"));

// console.log(isNaN({}));
// console.log(isNaN([]));
// console.log(isNaN([123]));
// console.log(isNaN([1, 2, 3]));
// console.log(isNaN(function () { }));

// Explain the output for each case.
// 1. isNaN("hello") -> true, because "hello" cannot be converted to a number.
// 2. isNaN("123") -> false, because "123" can be converted to the number 123.
// 3. isNaN(123) -> false, because 123 is already a number.
// 4. isNaN(NaN) -> true, because NaN is not a number.
// 5. isNaN(undefined) -> true, because undefined cannot be converted to a number.

// 6. isNaN(null) -> false, because null is converted to 0, which is a number.
// 7. isNaN(true) -> false, because true is converted to 1, which is a number.
// 8. isNaN(false) -> false, because false is converted to 0, which is a number.
// 9. isNaN(" ") -> false, because a string with only whitespace is converted to 0.
// 10. isNaN("123abc") -> true, because "123abc" cannot be fully converted to a number.
// 11. isNaN("0") -> false, because "0" can be converted to the number 0.
// 12. isNaN("Infinity") -> false, because "Infinity" can be converted to the number Infinity.
// 13. isNaN(Infinity) -> false, because Infinity is a number.
// 14. isNaN("-123.45") -> false, because "-123.45" can be converted to the number -123.45.
// 15. isNaN("123.45") -> false, because "123.45" can be converted to the number 123.45.
// 16. isNaN("0x11") -> false, because "0x11" can be converted to the number 17 (hexadecimal).
// 17. isNaN("0b1010") -> false, because "0b1010" can be converted to the number 10 (binary).
// 18. isNaN("0o12") -> false, because "0o12" can be converted to the number 10 (octal).
// 19. isNaN("NaN") -> true, because the string "NaN" cannot be converted to a number.
// 20. isNaN({}) -> true, because an object cannot be converted to a number.
// 21. isNaN([]) -> false, because an empty array is converted to 0.
// 22. isNaN([123]) -> false, because an array with a single numeric element is converted to that number (123).
// 23. isNaN([1, 2, 3]) -> true, because an array with multiple elements cannot be converted to a single number.
// 24. isNaN(function () { }) -> true, because a function cannot be converted to a number.




// Example of map method

// const numbers = [1, 2, 3, 4, 5];
// const squaredNumbers = numbers.map(num => num * num);
// console.log(squaredNumbers); // Output: [1, 4, 9, 16, 25]





// Diference between useState and useReducer in React

// useState is a Hook that allows you to have state variables in functional components. It is best suited for simple state management where the state is not too complex or does not involve multiple sub-values.
// useReducer is a Hook that is used for more complex state management. It is similar to useState but is more powerful and is based on the reducer pattern. It is best suited for managing state that involves multiple sub-values or when the next state depends on the previous state.









// How do you handle form validation in React?

// Form validation in React can be handled in several ways:
// 1. Controlled Components: Manage the form state using React state and validate the input values on change or on form submission.
// 2. Libraries: Use form validation libraries like Formik, React Hook Form, or Yup to simplify the validation process.
// 3. Custom Validation: Implement custom validation logic based on specific requirements and display error messages accordingly.







// How do you optimize performance in a React application?

// 1. Use React.memo to memoize functional components and prevent unnecessary re-renders.
// 2. Use useCallback and useMemo hooks to memoize functions and values.
// 3. Code-splitting using React.lazy and Suspense to load components only when needed.
// 4. Avoid inline functions and objects in JSX to prevent re-creation on every render.
// 5. Use virtualization libraries like react-window or react-virtualized for rendering large lists.
// 6. Optimize images and other assets for faster loading times.
// 7. Use the production build of React for better performance.




// Class component vs Functional component in React ?

// Class Components are ES6 classes that extend from React.Component and have a render method that returns JSX. They can hold and manage their own state and lifecycle methods.
// Functional Components are plain JavaScript functions that return JSX. They were initially stateless but with the introduction of Hooks, they can now manage state and lifecycle methods as well. Functional components are generally simpler and easier to read and test compared to class components.


// How can you avoid prop drilling in React?

// 1. Use React Context API to create a global state that can be accessed by any component in the component tree.
// 2. Use state management libraries like Redux or MobX to manage the application state centrally.
// 3. Use component composition to pass down only the necessary props to child components.
// 4. Use higher-order components (HOCs) or render props to share functionality between components without passing props through multiple levels.





// how you combined multiple cloums in a table in html?


// In HTML, you can combine multiple columns in a table using the "colspan" attribute in the <td> or <th> elements. The "colspan" attribute specifies the number of columns a cell should span across.
// Example:
// <table border="1">
//   <tr>
//     <th colspan="2">Header 1</th>
//     <th>Header 2</th>
//   </tr>
//   <tr>
//     <td colspan="2">Combined Cell</td>
//     <td>Cell 2</td>
//   </tr>
// </table>
// Output:
// +----------------+----------+
// |    Header 1    | Header 2 |
// +----------------+----------+
// |   Combined Cell          |
// +----------------+----------+
// |      Cell 2             |
// +----------------+----------+











// difference between image tag and figure tag in html ?

// The <img> tag is used to embed an image in an HTML document. It is a self-closing tag and requires the "src" attribute to specify the image source.
// The <figure> tag is used to group media content, such as images, illustrations, diagrams, or code snippets, along with their captions. It is a block-level element that can contain an <img> tag and a <figcaption> tag for providing a caption for the media content.
// Example:
// <figure>
//   <img src="image.jpg" alt="Description of image">
//   <figcaption>This is a caption for the image.</figcaption>
// </figure>
// Output: An image with a caption below it.






// Difference betwwen em tag and I tag in html ?

// The <em> tag is used to emphasize text, indicating that it has stress emphasis. It is typically rendered in italics by default.
// The <i> tag is used to represent text in an alternate voice or mood, such as a technical term, a foreign word, or a thought. It is also typically rendered in italics by default.
// While both tags render text in italics, the <em> tag has semantic meaning related to emphasis, whereas the <i> tag is more about stylistic choice without inherent emphasis.
// Example:
// <p>This is an <em>important</em> message.</p>
// <p>This is an <i>italicized</i> word.</p>
// Output: The word "important" is emphasized, and the word "italicized" is simply in italics.







// pseuodo class and pseudo element difference in css ?

// Pseudo-classes are used to define a special state of an element, such as when it is being hovered over or focused. They are prefixed with a colon (:). For example, :hover applies styles when the user hovers over an element.
// Pseudo-elements are used to style specific parts of an element, such as the first letter or line of a paragraph. They are prefixed with two colons (::). For example, ::first-letter styles the first letter of an element.
// Example:
// p:hover {
//     color: blue; /* Pseudo-class example */
// }
// p::first-letter {
//     font-size: 200%; /* Pseudo-element example */
// }
// Output: When the user hovers over a paragraph, its text color changes to blue. The first letter of the paragraph is displayed in a larger font size.







// css box model explain ?

// The CSS box model is a fundamental concept that describes how elements are structured and how their dimensions are calculated in a web page. It consists of four main components:
// 1. Content: The innermost part of the box where the actual content (text, images, etc.) is displayed.
// 2. Padding: The space between the content and the border. It creates space inside the element, around the content.
// 3. Border: The edge of the box that surrounds the padding (if any) and content. It can be styled with different widths, colors, and styles.
// 4. Margin: The outermost part of the box that creates space between the element and other elements on the page. It is transparent and does not have a background color.
// The total width and height of an element are calculated by adding the content width/height, padding, border, and margin.
// Example:
// div {
//     width: 200px; /* Content width */
//     padding: 10px; /* Padding */
//     border: 5px solid black; /* Border */
//     margin: 20px; /* Margin */
// }
// Output: The total width of the div element would be 200px (content) + 20px (padding) + 10px (border) + 40px (margin) = 270px.




// how can you overlap elemnts in css ?



// You can overlap elements in CSS using positioning and the z-index property. Here are a few methods to achieve overlapping:
// 1. Absolute Positioning: Use position: absolute; to position an element relative to its nearest positioned ancestor. You can then use top, left, right, and bottom properties to place it over another element.
// 2. Relative Positioning: Use position: relative; to move an element from its normal position. You can use negative values for top, left, right, and bottom to overlap it with other elements.
// 3. Z-Index: Use the z-index property to control the stacking order of overlapping elements. Elements with a higher z-index value will appear on top of those with a lower value. Note that z-index only works on positioned elements (those with position set to relative, absolute, fixed, or sticky).














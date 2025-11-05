// Difewrence between let and const ?

// let allows you to reassign a variable, while const does not allow reassignment after the initial assignment.

// Example:
// let x = 10;
// x = 20; // valid

// const y = 10;
// y = 20; // invalid, will throw an error







// rest operator and spread operator ?

// The rest operator (...) is used to collect multiple elements into an array. It is typically used in function parameters to gather remaining arguments into an array.
// Example:
// function sum(...numbers) {
//     return numbers.reduce((acc, curr) => acc + curr, 0);
// }
// console.log(sum(1, 2, 3)); // 6

// The spread operator (...) is used to expand an array or object into individual elements. It is commonly used to copy or merge arrays and objects.
// Example:
// const arr1 = [1, 2, 3];
// const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
// console.log(arr2);




// console.log(abc);
// var abc = 10; // undefined


// console.log(abc);
// let abc = 10; // ReferenceError: Cannot access 'abc' before initialization







// what is closure ?

// A closure is a function that retains access to its lexical scope, even when the function is executed outside that scope. This allows the function to remember the environment in which it was created.






// what is lexical scope ?

// Lexical scope refers to the visibility of variables based on their physical placement in the source code. A function can access variables defined in its own scope and in any outer scopes where it was defined, but not in inner scopes or scopes defined later in the code.








// const abc = {
//     name: 'John',
//     age: 30,
//     address: {
//         city: 'New York',
//         country: 'USA'
//     }
// }

// let xyz = { ...abc, name: 'Doe' };

// const { name, ...pqr } = abc;

// // console.log(xyz);
// console.log(pqr);


// 2️⃣ xyz = { ...abc, name: 'Doe' }

// The spread operator (...abc) copies all key-value pairs from abc.

// Then name: 'Doe' overrides the original name ('John').


// 3️⃣ const { name, ...pqr } = abc;

// This is object destructuring with rest.

// It extracts the name property from abc into a variable called name.

// Then, it collects the remaining properties (age, address) into a new object called pqr.





// function currying ?


// Currying is a functional programming technique where a function with multiple arguments is transformed into a sequence of functions, each taking a single argument. This allows for partial application of functions, enabling you to create specialized functions by fixing some arguments while leaving others to be provided later.

// Example:
// function add(a) {
//     return function(b) {
//         return function(c) {
//             return a + b + c;
//         }
//     }
// }
// console.log(add(2)(3)(4)); // 9



// difference between map method and forEach method ?

// The map method creates a new array populated with the results of calling a provided function on every element in the calling array. It returns the new array and does not modify the original array.

// The forEach method executes a provided function once for each array element. It does not return a new array and does not modify the original array, but it is typically used for side effects rather than producing a new array.


// | Feature                      | `map()`                                    | `forEach()`                     |
// | ---------------------------- | ------------------------------------------ | ------------------------------- |
// | **Return value**             | Returns a new array                        | Returns `undefined`             |
// | **Purpose**                  | Transform data                             | Execute code for each item      |
// | **Can be chained?**          | ✅ Yes (because it returns an array)        | ❌ No (returns undefined)        |
// | **Modifies original array?** | ❌ No (unless you explicitly mutate inside) | ❌ No (same)                     |
// | **Typical use case**         | Creating new arrays                        | Logging, DOM updates, API calls |





// class component and functional component difference ?

// Class Components:
// 1. Syntax: Defined using ES6 class syntax.
// 2. State Management: Can manage state using this.state and this.setState().
// 3. Lifecycle Methods: Have access to lifecycle methods like componentDidMount, componentDidUpdate, etc.
// 4. 'this' Keyword: Requires binding of 'this' in event handlers or using arrow functions.
// 5. More Boilerplate: Generally requires more code to set up.

// Functional Components:
// 1. Syntax: Defined using plain JavaScript functions or arrow functions.
// 2. State Management: Can manage state using the useState hook.
// 3. Lifecycle Methods: Use hooks like useEffect to handle side effects and lifecycle events.
// 4. 'this' Keyword: Do not use 'this'; they rely on closures and hooks.
// 5. Less Boilerplate: Generally more concise and easier to read.







// what is cdn ?

// A CDN, or Content Delivery Network, is a system of distributed servers that deliver web content to users based on their geographic location. CDNs are used to improve the performance, speed, and reliability of websites by caching content closer to the end-users, reducing latency and load times. They also help in handling high traffic loads and provide security features such as DDoS protection.
// Example of popular CDNs include Cloudflare, Akamai, and Amazon CloudFront.







// what is transpiler ?

// A transpiler, or source-to-source compiler, is a type of compiler that takes source code written in one programming language and converts it into another programming language that has a similar level of abstraction. Transpilers are commonly used to convert modern JavaScript (ES6+) into older versions (ES5) to ensure compatibility with older browsers that do not support the latest features. Examples of popular transpilers include Babel for JavaScript and TypeScript compiler for converting TypeScript to JavaScript.





// what is jsx ?

// JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript. It is commonly used in React to describe the structure and appearance of the user interface. JSX makes it easier to visualize the UI components and their hierarchy, and it gets transpiled into regular JavaScript function calls that create React elements. JSX allows you to embed expressions, use attributes, and nest elements, making it a powerful tool for building dynamic UIs.





// Prop drilling in React ?

// Prop drilling refers to the process of passing data from a parent component to a deeply nested child component through multiple layers of intermediate components. This can lead to cumbersome and hard-to-maintain code, as each intermediate component must explicitly pass the props down to its children, even if they do not need the data themselves. To avoid prop drilling, developers often use state management solutions like Context API or Redux, which allow for sharing state across components without the need to pass props through every level of the component tree.





// what is the diference between conventional dynamic routing and normal routing ?

// Conventional Dynamic Routing:
// 1. Routes are defined based on URL patterns that can change dynamically.
// 2. Often used in frameworks like Next.js where file names in the pages directory correspond to routes.
// 3. Allows for parameters in the URL (e.g., /user/[id]) to create dynamic routes based on data.
// 4. Easier to manage for applications with many routes that depend on data.

// Normal Routing:
// 1. Routes are statically defined in a routing configuration.
// 2. Commonly used in libraries like React Router where routes are explicitly declared in the code.
// 3. Each route corresponds to a specific component without dynamic parameters.
// 4. More straightforward for applications with a fixed set of routes.



// which hook is used for dynamic routing in react ?

// In React, the useParams hook from the React Router library is commonly used for dynamic routing. It allows you to access the parameters of the current route, enabling you to create routes that can change based on the URL. For example, in a route defined as /user/:id, you can use useParams to retrieve the id parameter and use it within your component.




// diferencce between usestate and useReducer ?

// useState is a React hook that allows you to add state to functional components. It is suitable for managing simple state logic and is easy to use for basic state updates.
// useReducer is a React hook that is used for managing more complex state logic. It is similar to Redux in that it uses a reducer function to handle state transitions based on dispatched actions. useReducer is beneficial when the state logic involves multiple sub-values or when the next state depends on the previous state.



// is usestate asynchronous or synchronous ?

// The state updates made using useState in React are asynchronous. When you call the state setter function (e.g., setState), React schedules the update and may batch multiple state updates together for performance optimization. This means that the new state value may not be immediately available after calling the setter function, and accessing the state variable right after calling the setter may still return the old value. To work with the updated state, you can use the useEffect hook or rely on the next render cycle.




// diference between real DOM and virtual DOM ?

// Real DOM:
// 1. The Real DOM is the actual Document Object Model that represents the structure of a web page in the browser.
// 2. It is a tree-like structure where each node corresponds to an element on the page.
// 3. Manipulating the Real DOM can be slow and inefficient, especially for large applications, as it requires re-rendering and updating the entire DOM tree for any changes.
// Virtual DOM:
// 1. The Virtual DOM is an in-memory representation of the Real DOM.
// 2. It is a lightweight copy of the Real DOM that React uses to optimize updates.
// 3. When the state of a component changes, React updates the Virtual DOM first, then compares it with the previous version (a process called reconciliation) to determine the minimal set of changes needed to update the Real DOM, resulting in improved performance and efficiency.





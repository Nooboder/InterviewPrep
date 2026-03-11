function greet(name = 'Guest') {
    console.log('Hello,', name);
}

greet(); // Hello, Guest
greet(null); // Hello, null
greet(undefined); // Hello, Guest


// when the value is undefined the default will be triggered.

// Explanation:

// In the code snippet provided, we have a function `greet` that takes an optional parameter `name` with a default value of 'Guest'.
// When we call `greet()` without any arguments, it uses the default value for `name`, which is 'Guest', and logs "Hello, Guest".
// When we call `greet(null)`, we are explicitly passing `null` as the argument for `name`. Since `null` is a valid value, it logs "Hello, null".
// When we call `greet(undefined)`, we are explicitly passing `undefined` as the argument for `name`. Since `undefined` triggers the default parameter, it logs "Hello, Guest".
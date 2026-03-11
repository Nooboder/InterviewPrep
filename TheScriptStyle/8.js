// call(), apply(), and bind() are methods in JavaScript that allow you to change the context (the value of 'this') of a function.

// 1. call(): The call() method calls a function with a given 'this' value and arguments provided individually. For example:


// function greet(city) {
//     console.log(`Hello, my name is ${this.name}`);
//     console.log('I belong to the context of:', city);
// }

// const person = { name: 'Alice' };

// greet.call(person); // Output: Hello, my name is Alice


// greet.call(person, 'Kolkata',); // Output: Hello, my name is Alice (arguments are ignored in this case)







// 2. apply(): The apply() method is similar to call(), but it takes the arguments as an array. For example:

// function greet(city, country) {
//     console.log(`Hello, my name is ${this.name}`);
//     console.log('I belong to the context of:', city);
//     console.log('I am from:', country);
// }

// const person = { name: 'Bob' };

// greet.apply(person, ["Kolkata", "India"]); // Output: Hello, my name is Bob


//3. bind(): The bind() method creates a new function that, when called, has its 'this' keyword set to the provided value. For example:

function greet(city) {
    console.log(`Hello, my name is ${this.name}`);
    console.log('I belong to the context of:', city);
}

const person = { name: 'Charlie' };

const boundGreet = greet.bind(person);
boundGreet('Kolkata'); // Output: Hello, my name is Charlie
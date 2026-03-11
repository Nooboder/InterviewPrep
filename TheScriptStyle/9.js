function greet() {
    console.log('Hello,', this.name);
}

const person1 = greet();
const person2 = new greet();


console.log(person1); // undefined
console.log(person2); // greet {}

// Explaination:
//
// In the code snippet provided, we have a function `greet` that logs a greeting message using the `name` property of the `this` context.

// 1. When we call `greet()` without the `new` keyword, it executes in the global context (or undefined in strict mode). Since there is no `name` property defined in the global context, it logs "Hello, undefined". The return value of this call is `undefined`, which is assigned to `person1`.

// 2. When we call `new greet()`, it creates a new instance of the `greet` function. The `this` context inside the `greet` function now refers to the newly created object. However, since we haven't defined a `name` property on this new object, it still logs "Hello, undefined". The return value of this call is the new object itself, which is assigned to `person2`.

// In summary:
// - `person1` is `undefined` because the `greet` function does not return anything when called without `new`.
// - `person2` is an instance of the `greet` function, but it does not have a `name` property, resulting in "Hello, undefined" being logged.




// new keyword works as follows:



// 1. It creates a new empty object.                                                                                    => let person2 = {}
// 2. It sets the `this` context of the function to the newly created object.                                          => person2._proto = greet.prototype
// 3. It executes the function body.                                                                                   => greet.call(person2) => console.log('Hello,', person2.name) => console.log('Hello,', undefined)
// 4. If the function does not return an object, it returns the newly created object by default.                        => return person2
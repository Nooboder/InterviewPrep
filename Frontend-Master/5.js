class Person {
    constructor(name) {
        this.name = name;

    }
    fn() {
        console.log(`Hello ${this.name}`);
    }
}

const person = new Person('John');
const copyFn = person.fn;
copyFn(); // Hello undefined


// ✋✋ Solution :
//  The `this` context is lost when the method is called as a standalone function.
// under this function context, `this` refers to the global object (or `undefined` in strict mode), not the instance of `Person`.
// To preserve the context of `this`, you can use an arrow function or bind the method
//  ✋✋

// solution 1. 🤙 using arrow function

// class Person {
//     constructor(name) {
//         this.name = name;

//     }
//     fn = () => {
//         console.log(`Hello ${this.name}`);
//     }
// }

// const person = new Person('John');
// const copyFn = person.fn;
// copyFn(); // Hello John


// solution 2. 🤙


// class Person {
//     constructor(name) {
//         this.name = name;
//         this.fn = this.fn.bind(this); // Bind the method to the instance

//     }
//     fn() {
//         console.log(`Hello ${this.name}`);
//     }
// }

// const person = new Person('John');
// const copyFn = person.fn;
// copyFn(); // Hello John
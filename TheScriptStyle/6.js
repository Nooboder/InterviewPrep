function outer() {
    const inner = () => {
        console.log(arguments);
    }
    inner(1, 2, 3);
}

outer(4, 5, 6); // Output: [Arguments] { '0': 4, '1': 5, '2': 6 }

// why?

// In an arrow function, the arguments object is not available. Instead, it inherits the arguments object from its enclosing scope. In this case, the inner arrow function does not have its own arguments object, so it uses the arguments object from the outer function. When you call outer(4, 5, 6), it logs the arguments object of the outer function, which contains the values 4, 5, and 6. This is because arrow functions do not have their own arguments object and rely on the surrounding context for access to arguments.


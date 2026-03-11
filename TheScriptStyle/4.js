// Normal function and arrow function difference  in Javascript ?

// Normal functions and arrow functions are two different ways to define functions in JavaScript, and they have some key differences:

// 1. Syntax: Normal functions are defined using the function keyword, while arrow functions use a more concise syntax with the => operator.
// 2. this Binding: Normal functions have their own this context, which is determined by how the function is called. Arrow functions, on the other hand, do not have their own this context and instead inherit it from the surrounding scope. This means that in an arrow function, this refers to the value of this in the enclosing scope.
// 3. Arguments Object: Normal functions have an arguments object that contains all the arguments passed to the function. Arrow functions do not have their own arguments object, but they can access the arguments of the enclosing scope if needed.
// 4. Constructor: Normal functions can be used as constructors and can be called with the new keyword to create instances. Arrow functions cannot be used as constructors and will throw an error if you try to use them with new.
// 5. Methods: Normal functions can be used as methods in objects, while arrow functions are not suitable for defining methods because they do not have their own this context.

// In summary, normal functions and arrow functions have different syntax and behavior, especially when it comes to this binding and the arguments object. Arrow functions are often used for shorter, more concise function definitions, while normal functions are more versatile and can be used in a wider range of scenarios.



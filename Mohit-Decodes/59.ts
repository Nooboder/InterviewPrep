// Typescript (Interface vs Types)

// Interface
interface User {
    name: string;
    age: number;
    email: string;
}

// Type Alias
type UserType = {
    name: string;
    age: number;
    email: string;
}


// difference between interface and type alias in typescript

// 1. Declaration: An interface is declared using the `interface` keyword, while a type alias is declared using the `type` keyword.
// 2. Extensibility: Interfaces can be extended using the `extends` keyword, allowing you to create new interfaces based on existing ones. Type aliases cannot be extended in the same way, but they can be intersected using the `&` operator to combine multiple types.
// 3. Merging: Interfaces can be merged together if they have the same name, allowing you to add properties to an existing interface. Type aliases cannot be merged in this way; if you try to declare a type alias with the same name as an existing one, it will result in a compilation error.
// 4. Use Cases: Interfaces are typically used to define the shape of objects and classes, while type aliases are more versatile and can be used for a wider range of types, including primitive types, union types, and intersection types.
// 5. Readability: Some developers prefer interfaces for defining object shapes because they can be more descriptive and easier to read, especially when working with complex types. Type aliases can sometimes be less clear, especially when they involve complex type combinations.
// In summary, both interfaces and type aliases are powerful tools in TypeScript for defining types, but they have different use cases and capabilities. Interfaces are generally better suited for defining object shapes and can be extended and merged, while type aliases offer more flexibility for defining a wider range of types but do not support extension or merging.

// when to use when ?When to use interfaces vs type aliases in TypeScript depends on the specific use case and the requirements of your code. Here are some guidelines to help you decide:

// 1. Use Interfaces when:
//    - You want to define the shape of an object or a class.
//    - You need to take advantage of features like declaration merging or extending other interfaces.
//    - You want to create a contract for classes to implement.

// 2. Use Type Aliases when:
//    - You want to define a type that is not an object, such as a union type, intersection type, or a primitive type.
//    - You need to create a more complex type that cannot be easily represented with an interface.
//    - You want to use mapped types or conditional types.

// In general, interfaces are often preferred for defining the structure of objects and classes, while type aliases are more suitable for defining complex types or when you need to use features that interfaces do not support. However, both can be used effectively in different scenarios, and the choice ultimately depends on your specific needs and coding style preferences.


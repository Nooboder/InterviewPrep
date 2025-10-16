// function getData() {
//     return [10, 20, 30];
// }

// x = getData();
// let [, , y] = x;

// console.log(y);  //30

// explaination  : here we are using array destructuring to get the 3rd element of the array returned by getData function. The commas (,,) are used to skip the first two elements of the array, and y is assigned the value of the third element, which is 30.





function getData() {
    return [10, 20, 30, 40, 50];
}

x = getData();
let [, , y, ...rest] = x;

console.log(y, rest);  //30 [ 40, 50 ]

// explaination  : here we are using array destructuring to get the 3rd element of the array returned by getData function. The commas (,,) are used to skip the first two elements of the array, and y is assigned the value of the third element, which is 30.
// The rest operator (...) is used to collect the remaining elements of the array into a new array called rest. In this case, rest will contain [40, 50].
// So, the output of the console.log statement will be 30 and [40, 50].
// Note: The rest operator can only be used as the last element in the destructuring assignment. It collects all remaining elements into an array.
// Also, if there are no remaining elements, rest will be an empty array.
// For example, if the array returned by getData was [10, 20, 30], then rest would be an empty array [].
// If the array returned by getData was [10, 20, 30, 40], then rest would be [40].
// If the array returned by getData was [10, 20, 30, 40, 50, 60], then rest would be [40, 50, 60].
// This is a useful feature when you want to extract specific elements from an array while still having access to the remaining elements.




// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------






// // Also, the rest operator can be used in function parameters to collect all remaining arguments into an array.
// // For example:
// function myFunction(a, b, ...args) {
//     console.log(a);
//     console.log(b);
//     console.log(args); // args will be an array of all remaining arguments
// }

// myFunction(1, 2, 3, 4, 5);
// // Output:
// // 1

// // 2
// // [3, 4, 5]
// // In this example, a and b will be assigned the values 1 and 2 respectively, and args will be an array containing [3, 4, 5].
// // This allows you to create functions that can accept a variable number of arguments.
// // Note: The rest operator can only be used as the last parameter in a function definition. It collects all remaining arguments into an array.
// // Also, the rest operator can be used in object destructuring to collect remaining properties into a new object.
// // For example:
// const person = {
//     name: 'John',
//     age: 30,
//     city: 'New York',
//     country: 'USA'
// };

// let { name, age, ...address } = person;

// console.log(name);  // John

// console.log(age);   // 30

// console.log(address); // { city: 'New York', country: 'USA' }

// // In this example, name and age will be assigned the values 'John' and 30 respectively, and address will be a new object containing the remaining properties { city: 'New York', country: 'USA' }.

// // This allows you to extract specific properties from an object while still having access to the remaining properties.
// // Note: The rest operator can only be used as the last element in the destructuring assignment. It collects all remaining properties into a new object.
// // Also, if there are no remaining properties, address will be an empty object {}.
// // For example, if the person object was { name: 'John', age: 30 }, then address would be an empty object {}.

// // If the person object was { name: 'John', age: 30, city: 'New York' }, then address would be { city: 'New York' }.
// // If the person object was { name: 'John', age: 30, city: 'New York', country: 'USA', zip: '10001' }, then address would be { city: 'New York', country: 'USA', zip: '10001' }.
// // This is a useful feature when you want to extract specific properties from an object while still having access to the remaining properties.
// // Also, the rest operator can be used in combination with array destructuring and object destructuring.
// // For example:
// const data = {
//     numbers: [10, 20, 30, 40, 50],
//     info: {
//         name: 'John',
//         age: 30,
//         city: 'New York',
//         country: 'USA'
//     }
// };

// let { numbers: [ , , y, ...restNumbers ], info: { name, ...restInfo } } = data;

// console.log(y); // 30

// console.log(restNumbers); // [40, 50]

// console.log(name); // John

// console.log(restInfo); // { age: 30, city: 'New York', country: 'USA' }

// // In this example, we are using both array destructuring and object destructuring in combination with the rest operator.
// // We are extracting the 3rd element of the numbers array and collecting the remaining elements into restNumbers.
// // We are also extracting the name property from the info object and collecting the remaining properties into restInfo.
// // This allows you to extract specific elements from an array and specific properties from an object while still having access to the remaining elements and properties.
// // Note: The rest operator can only be used as the last element in the destructuring assignment. It collects all remaining elements or properties into a new array or object.
// // Also, if there are no remaining elements or properties, restNumbers will be an empty array [] and restInfo will be an empty object {}.
// // For example, if the numbers array was [10, 20, 30], then restNumbers would be an empty array [].
// // If the info object was { name: 'John', age: 30 }, then restInfo would be an empty object {}.
// // This is a useful feature when you want to extract specific elements from an array and specific properties from an object while still having access to the remaining elements and properties.
// // Also, the rest operator can be used in combination with default values in destructuring assignments.
// // For example:
// const arr = [10, 20];
// let [a, b, c = 30, ...rest] = arr;

// console.log(a); // 10
// console.log(b); // 20
// console.log(c); // 30
// console.log(rest); // []

// // In this example, we are using array destructuring with default values and the rest operator.
// // We are extracting the first two elements of the arr array and assigning them to a and b respectively.
// // We are also assigning a default value of 30 to c in case there is no 3rd element in the array.
// // Finally, we are using the rest operator to collect any remaining elements into the rest array.
// // Since there are no remaining elements in this case, rest will be an empty array [].
// // This allows you to extract specific elements from an array while still having access to the remaining elements, and also providing default values for missing elements.
// // Note: The rest operator can only be used as the last element in the destructuring assignment. It collects all remaining elements into a new array.
// // Also, if there are no remaining elements, rest will be an empty array [].
// // For example, if the arr array was [10, 20, 30], then rest would be an empty array [].
// // If the arr array was [10, 20, 30, 40], then rest would be [40].
// // If the arr array was [10, 20, 30, 40, 50], then rest would be [40, 50].
// // This is a useful feature when you want to extract specific elements from an array while still having access to the remaining elements, and also providing default values for missing elements.
// // Also, the rest operator can be used in combination with nested destructuring assignments.
// // For example:
// const nestedData = {
//     numbers: [10, 20, 30, 40, 50],
//     info: {
//         name: 'John',
//         age: 30,
//         address: {
//             city: 'New York',
//             country: 'USA'
//         }
//     }
// };

// let { numbers: [ , , y, ...restNumbers ], info: { name, address: { city, ...restAddress } } } = nestedData;

// console.log(y); // 30

// console.log(restNumbers); // [40, 50]
// console.log(name); // John
// console.log(city); // New York
// console.log(restAddress); // { country: 'USA' }
// // In this example, we are using nested destructuring assignments in combination with the rest operator.
// // We are extracting the 3rd element of the numbers array and collecting the remaining elements into restNumbers.
// // We are also extracting the name property from the info object and the city property from the nested address object, while collecting the remaining properties of address into restAddress.
// // This allows you to extract specific elements from an array and specific properties from nested objects while still having access to the remaining elements and properties.
// // Note: The rest operator can only be used as the last element in the destructuring assignment. It collects all remaining elements or properties into a new array or object.
// // Also, if there are no remaining elements or properties, restNumbers will be an empty array [] and restAddress will be an empty object {}.
// // For example, if the numbers array was [10, 20, 30], then restNumbers would be an empty array [].
// // If the address object was { city: 'New York' }, then restAddress would be an empty object {}.
// // This is a useful feature when you want to extract specific elements from an array and specific properties from nested objects while still having access to the remaining elements and properties.
// // Also, the rest operator can be used in combination with function parameters to collect all remaining arguments into an array.
// // For example:
// function myFunction(a, b, ...args) {
//     console.log(a);
//     console.log(b);
//     console.log(args); // args will be an array of all remaining arguments
// }
// myFunction(1, 2, 3, 4, 5);
// // Output:
// // 1
// // 2
// // [3, 4, 5]
// // In this example, a and b will be assigned the values 1 and 2 respectively, and args will be an array containing [3, 4, 5].
// // This allows you to create functions that can accept a variable number of arguments.
// // Note: The rest operator can only be used as the last parameter in a function definition. It collects all remaining arguments into an array.
// // Also, if there are no remaining arguments, args will be an empty array [].
// // For example, if the function was called as myFunction(1, 2), then args would be an empty array [].
// // If the function was called as myFunction(1, 2, 3), then args would be [3].
// // If the function was called as myFunction(1, 2, 3, 4, 5, 6), then args would be [3, 4, 5, 6].
// // This is a useful feature when you want to create functions that can accept a variable number of arguments.
// // Also, the rest operator can be used in combination with default values in function parameters.
// // For example:
// function myFunctionWithDefaults(a, b, c = 30, ...args) {
//     console.log(a);
//     console.log(b);
//     console.log(c);
//     console.log(args); // args will be an array of all remaining arguments
// }

// myFunctionWithDefaults(1, 2, 3, 4, 5);
// // Output:
// // 1
// // 2
// // 3
// // [4, 5]
// myFunctionWithDefaults(1, 2);
// // Output:
// // 1

// // 2
// // 30
// // []

// // In this example, we are using function parameters with default values and the rest operator.
// // We are assigning a default value of 30 to c in case there is no 3rd argument passed to the function.
// // We are also using the rest operator to collect any remaining arguments into the args array.
// // This allows you to create functions that can accept a variable number of arguments while also providing default values for missing arguments.
// // Note: The rest operator can only be used as the last parameter in a function definition. It collects all remaining arguments into an array.
// // Also, if there are no remaining arguments, args will be an empty array [].
// // For example, if the function was called as myFunctionWithDefaults(1, 2), then args would be an empty array [].
// // If the function was called as myFunctionWithDefaults(1, 2, 3), then args would be an empty array [].
// // If the function was called as myFunctionWithDefaults(1, 2, 3, 4, 5), then args would be [4, 5].
// // This is a useful feature when you want to create functions that can accept a variable number of arguments while also providing default values for missing arguments.
// // Also, the rest operator can be used in combination with nested destructuring assignments in function parameters.
// // For example:
// function myFunctionWithNestedDestructuring({ numbers: [ , , y, ...restNumbers ], info: { name, address: { city, ...restAddress } } }) {
//     console.log(y); // 30
//     console.log(restNumbers); // [40, 50]
//     console.log(name); // John
//     console.log(city); // New York
//     console.log(restAddress); // { country: 'USA' }
// }

// myFunctionWithNestedDestructuring(nestedData);
// // In this example, we are using nested destructuring assignments in function parameters in combination with the rest operator.
// // We are extracting the 3rd element of the numbers array and collecting the remaining elements into restNumbers.
// // We are also extracting the name property from the info object and the city property from the nested address object, while collecting the remaining properties of address into restAddress.
// // This allows you to create functions that can accept complex data structures while still having access to specific elements and properties, as well as the remaining elements and properties.
// // Note: The rest operator can only be used as the last element in the destructuring assignment. It collects all remaining elements or properties into a new array or object.
// // Also, if there are no remaining elements or properties, restNumbers will be an empty array [] and restAddress will be an empty object {}.
// // For example, if the numbers array was [10, 20, 30], then restNumbers would be an empty array [].
// // If the address object was { city: 'New York' }, then restAddress would be an empty object {}.
// // This is a useful feature when you want to create functions that can accept complex data structures while still having access to specific elements and properties, as well as the remaining elements and properties.
// // Also, the rest operator can be used in combination with default values in nested destructuring assignments.
// // For example:
// function myFunctionWithDefaultsAndNestedDestructuring({ numbers: [ , , y, ...restNumbers ], info: { name, age = 30, address: { city, ...restAddress } } }) {
//     console.log(y); // 30
//     console.log(restNumbers); // [40, 50]
//     console.log(name); // John
//     console.log(age); // 30
//     console.log(city); // New York
//     console.log(restAddress); // { country: 'USA' }
// }

// myFunctionWithDefaultsAndNestedDestructuring(nestedData);
// // In this example, we are using nested destructuring assignments with default values in function parameters in combination with the rest operator.
// // We are assigning a default value of 30 to age in case the age property is missing from the info object.
// // We are also using the rest operator to collect any remaining elements of the numbers array into restNumbers and any remaining properties of the address object into restAddress.
// // This allows you to create functions that can accept complex data structures while still having access to specific elements and properties, as well as the remaining elements and properties, and also providing default values for missing properties.
// // Note: The rest operator can only be used as the last element in the destructuring assignment. It collects all remaining elements or properties into a new array or object.
// // Also, if there are no remaining elements or properties, restNumbers will be an empty array [] and restAddress will be an empty object {}.
// // For example, if the numbers array was [10, 20, 30], then restNumbers would be an empty array [].
// // If the address object was { city: 'New York' }, then restAddress would be an empty object {}.
// // This is a useful feature when you want to create functions that can accept complex data structures while still having access to specific elements and properties, as well as the remaining elements and properties, and also providing default values for missing properties.
// // Also, the rest operator can be used in combination with the spread operator to create new arrays or objects.
// // For example:
// const arr1 = [10, 20, 30];
// const arr2 = [40, 50, 60];
// const combinedArray = [...arr1, ...arr2];
// console.log(combinedArray); // [10, 20, 30, 40, 50, 60]

// const obj1 = { a: 1, b: 2 };

// const obj2 = { c: 3, d: 4 };
// const combinedObject = { ...obj1, ...obj2 };
// console.log(combinedObject); // { a: 1, b: 2, c: 3, d: 4 }
// // In this example, we are using the spread operator to create new arrays and objects by combining existing arrays and objects.

// // The spread operator (...) is used to spread the elements of an array or the properties of an object into a new array or object.

// // This allows you to easily combine arrays and objects without modifying the original arrays and objects.
// // Note: The spread operator can be used in array literals and object literals to create new arrays and objects.
// // Also, the spread operator can be used in function calls to pass an array of
// // arguments to a function.


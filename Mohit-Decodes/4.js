// Copying object without reference

const obj1 = {
    name: 'Sapta',
    age: 27
}

const obj2 = {...obj1}

obj2.name = 'Singha'

console.log(obj1.name)
console.log(obj2)



// ✅ Explanation:

// const obj2 = { ...obj1 } creates a shallow copy of obj1.

// obj2 is a new object, not a reference to obj1.

// Changing obj2.name does not affect obj1.name because primitive values (string, number, etc.) are copied by value.

// If the object had nested objects, the nested objects would still be shared by reference:





// Copying object with reference

// const obj1 = {
//     name: 'Sapta',
//     age: 27
// };

// // Copying by reference
// const obj2 = obj1;

// obj2.name = 'Singha';

// console.log(obj1.name); // Singha
// console.log(obj2.name); // Singha


// ✅ Explanation:

// obj2 = obj1 does not create a new object.

// Both obj1 and obj2 reference the same memory location.

// Any change in obj2 reflects in obj1 (and vice versa).
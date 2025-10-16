// 21. Rest & Spread Operator


//  Rest Operator collect all the arguments into an array

function sum(...numbers) {
    console.log(numbers)
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4));

//  The spread operator takes items from an array or properties from an object and spreads them out

const nums = [1, 2, 3, 4];
console.log(sum(...nums));


const user = {
    name: "Sapta",
    age: "20",
    role: "Admin"
}

console.log(...user.name);



// spread operator in string
const str = "Hello";
console.log(...str); // H e l l o

// spread operator in function arguments
function greet(a, b, c) {
    console.log(`Hello ${a}, ${b}, ${c}`);
}
greet(...["Alice", "Bob", "Charlie"]); // Hello Alice, Bob, Charlie
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// spread operator in array literals
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combinedArr = [...arr1, ...arr2];
console.log(combinedArr); // [1, 2, 3, 4, 5, 6]

// spread operator in object literals
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const combinedObj = { ...obj1, ...obj2 };
console.log(combinedObj); // { a: 1, b: 2, c: 3, d: 4 }

// spread operator to copy arrays
const originalArray = [1, 2, 3];
const copiedArray = [...originalArray];
console.log(copiedArray); // [1, 2, 3]

// spread operator to copy objects
const originalObject = { x: 10, y: 20 };
const copiedObject = { ...originalObject };
console.log(copiedObject); // { x: 10, y: 20 }

// spread operator to convert NodeList to Array
const nodeList = document.querySelectorAll('div');
const nodeArray = [...nodeList];
console.log(nodeArray); // Array of div elements

// spread operator to merge arrays
const array1 = [1, 2];
const array2 = [3, 4];
const mergedArray = [...array1, ...array2];
console.log(mergedArray); // [1, 2, 3, 4]

// spread operator to merge objects
const object1 = { a: 1 };
const object2 = { b: 2 };
const mergedObject = { ...object1, ...object2 };
console.log(mergedObject); // { a: 1, b: 2 }

// spread operator to pass array elements as function arguments
const numbers = [5, 10, 15];
const maxNumber = Math.max(...numbers);
console.log(maxNumber); // 15

// spread operator to create a new object with additional properties
const baseObject = { name: "John" };
const extendedObject = { ...baseObject, age: 25 };
console.log(extendedObject); // { name: "John", age: 25 }

// spread operator to create a new array with additional elements   
const baseArray = [1, 2, 3];
const extendedArray = [...baseArray, 4, 5];
console.log(extendedArray); // [1, 2, 3, 4, 5]

// spread operator to destructure arrays
const [first, ...rest] = [10, 20, 30, 40];
console.log(first); // 10
console.log(rest); // [20, 30, 40]

// spread operator to destructure objects
const { a, ...others } = { a: 1, b: 2, c: 3 };
console.log(a);

console.log(others); // { b: 2, c: 3 }  
// rest operator in function parameters
function multiply(factor, ...numbers) {
    return numbers.map(num => num * factor);
}

console.log(multiply(2, 1, 2, 3)); // [2, 4, 6]

// rest operator in array destructuring
const [head, ...tail] = [1, 2, 3, 4];
console.log(head); // 1
console.log(tail); // [2, 3, 4]

// rest operator in object destructuring
const { x, ...y } = { x: 10, y: 20, z: 30 };
console.log(x); // 10
console.log(y); // { y: 20, z: 30 }

// rest operator to collect remaining elements in array destructuring

const [firstElem, secondElem, ...remainingElems] = [5, 10, 15, 20, 25];
console.log(firstElem); // 5
console.log(secondElem); // 10
console.log(remainingElems); // [15, 20, 25]


// rest operator to collect remaining properties in object destructuring
const { name, ...otherProps } = { name: "Alice", age: 30, city: "Wonderland" };
console.log(name); // Alice
console.log(otherProps); // { age: 30, city: "Wonderland" } 

// rest operator in function parameters to handle variable number of arguments
function concatenate(separator, ...strings) {
    return strings.join(separator);
}

console.log(concatenate(", ", "Hello", "world", "!")); // "Hello, world, !"

// rest operator in nested destructuring

const { a: firstA, b: { c: secondC, ...restB } } = { a: 1, b: { c: 2, d: 3, e: 4 } };
console.log(firstA); // 1
console.log(secondC); // 2
console.log(restB); // { d: 3, e: 4 }

// rest operator to collect remaining elements in array destructuring with skipping
const [firstSkip, , ...restSkip] = [100, 200, 300, 400, 500];
console.log(firstSkip); // 100
console.log(restSkip); // [300, 400, 500]

// rest operator to collect remaining properties in object destructuring with renaming  
const { p: renamedP, ...restProps } = { p: 42, q: 43, r: 44 };
console.log(renamedP); // 42
console.log(restProps); // { q: 43, r: 44 }

// rest operator in function parameters with default values
function buildName(firstName, ...restOfName) {
    return `${firstName} ${restOfName.join(' ')}`;
}

console.log(buildName("John", "Doe", "Smith")); // "John Doe Smith"

// rest operator in array destructuring with default values 

const [firstDef, secondDef = 20, ...restDef] = [10];
console.log(firstDef); // 10
console.log(secondDef); // 20
console.log(restDef); // [] // []

// rest operator in object destructuring with default values

const { a: aDef = 1, b: bDef = 2, ...restDefObj } = { a: 10 };
console.log(aDef); // 10
console.log(bDef); // 2
console.log(restDefObj); // {}

// rest operator to collect remaining elements in nested array destructuring
const [xDef, [yDef, ...zDef]] = [5, [10, 15, 20]];
console.log(xDef); // 5
console.log(yDef); // 10
console.log(zDef); // [15, 20]

// rest operator to collect remaining properties in nested object destructuring
const { a: aNested, b: { c: cNested, ...restBNested } } = { a: 1, b: { c: 2, d: 3, e: 4 } };
console.log(aNested); // 1
console.log(cNested); // 2
console.log(restBNested); // { d: 3, e: 4 }

// rest operator in function parameters with destructuring
function displayInfo({ name, age, ...otherInfo }) {
    console.log(`Name: ${name}, Age: ${age}`);
    console.log('Other Info:', otherInfo);
}

displayInfo({ name: "Bob", age: 25, city: "New York", profession: "Developer" });
// Name: Bob, Age: 25
// Other Info: { city: "New York", profession: "Developer" }

// rest operator in array destructuring with nested arrays
const [firstNested, ...[secondNested, ...restNested]] = [1, [2, 3, 4], 5, 6];
console.log(firstNested); // 1
console.log(secondNested); // 2
console.log(restNested); // [3, 4]

// rest operator in object destructuring with nested objects
const { a: aNest, b: { c: cNest, ...restBNest } } = { a: 1, b: { c: 2, d: 3, e: 4 } };
console.log(aNest); // 1
console.log(cNest); // 2
console.log(restBNest); // { d: 3, e: 4 }


// rest operator to collect remaining elements in array destructuring with skipping and default values

const [firstSkipDef, , secondSkipDef = 30, ...restSkipDef] = [10, 20];
console.log(firstSkipDef); // 10
console.log(secondSkipDef); // 30
console.log(restSkipDef); // [] // []   

// rest operator to collect remaining properties in object destructuring with renaming and default values

const { p: renamedPDef = 100, ...restPropsDef } = { q: 43, r: 44 };
console.log(renamedPDef); // 100
console.log(restPropsDef); // { q: 43, r: 44 }

// rest operator in function parameters with default values and destructuring
function createUser({ name = "Guest", age = 18, ...additionalInfo } = {}) {
    return {
        name,
        age,
        ...additionalInfo
    };
}

console.log(createUser({ name: "Alice", city: "Wonderland" }));
// { name: "Alice", age: 18, city: "Wonderland" }   

console.log(createUser());
// { name: "Guest", age: 18 }

// rest operator in array destructuring with default values and nested arrays
const [firstDefNest, secondDefNest = 50, ...[thirdDefNest = 60, ...restDefNest]] = [10];
console.log(firstDefNest); // 10
console.log(secondDefNest);//50
console.log(thirdDefNest); // 60
console.log(restDefNest); // [] // []


// rest operator in object destructuring with default values and nested objects

const { a: aDefNest = 5, b: { c: cDefNest = 15, ...restBDefNest } = {} } = { a: 10 };
console.log(aDefNest); // 10
console.log(cDefNest); // 15
console.log(restBDefNest); // {}    




let obj = {
    name: 'John',
    greet: function () {
        return `Hello,`;
    },
    age: undefined,
    isStudent: true,
    scores: [90, undefined, 70],
    address: {
        city: 'New York',
        zip: null,
    }
}


let str = JSON.stringify(obj)
console.log(str) // {"name":"John","isStudent":true,"scores":[90,null,70],"address":{"city":"New York","zip":null}}



// Rules of JSon :
// // 1. JSON only supports a limited set of data types: strings, numbers, booleans, null, arrays, and objects. Functions and undefined values are not supported and will be omitted from the JSON string.

// // 2. When a function is included in an object that is being stringified, it will be represented as an empty object {} in the resulting JSON string.
// // 3. When an undefined value is included in an object that is being stringified, it will be represented as null in the resulting JSON string.
// // 4. When an array contains undefined values, they will be represented as null in the resulting JSON string.
// // 5. When an object contains a property with an undefined value, that property will be included in the JSON string with a value of null.
// // 6. When an object contains a property with a function value, that property will be included in the JSON string with an empty object {} as its value.


//JSON does not allow :
// 1. Functions: If an object contains a function, it will be omitted from the JSON string.
// 2. Undefined values: If an object contains a property with an undefined value, it will be omitted from the JSON string.




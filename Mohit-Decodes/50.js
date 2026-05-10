// check if the object is empty in JavaScript

const obj = {};

function isEmptyObject(object) {
  return Object.keys(object).length === 0 && object.constructor === Object;
}

console.log("The object is empty.", isEmptyObject(obj));
// Output: The object is empty. true

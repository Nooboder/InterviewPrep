// 4. Trick Question 1 


let obj = { a: 1, b: 2 };

let copy = { ...obj };

copy.a = 5;

console.log(obj.a)

// outpt: 1

// spread operator only create the shallow copy. updating any of the property of copy does not mean that updating the property of object. both are points to the different memory location.

// let obj  = {a:1, b:2};

// let copy = obj;

// copy.a = 5;

// console.log(obj.a)

// outpt: 5

// we have not directly update the property of object.
// here main object and copy object refer to the same memory location. so update the any property of object is updating the property of copy object. 
// 7. Trick Question 2


let a = {};
let b = { key: 'b' };
let c = { key: 'c' };

a[b] = 123;
//a["[object Object]"] = 123;
a[c] = 456;
//a["[object Object]"] = 456;

console.log(a[b])


//  Output: 456


// b also an Object, c also an Object, when you store the offset as a key inside another object it will converted in a string representation. Look like :

//  a["[object, object]"] = 123

// object only accept key in 2 format : string and symbol, when you try to store an object as a key it will convert in a string representation. so both b and c will converted in same string representation "[object Object]" and the value will be override by last assignment. so the output will be 456.



// ----------------------------------------------------------------------------------------------------------------------------------------
//  store offset b inside a as a key.
//  store offset c inside a as a key.
//  when you store the offset as a key inside another object it will converted in a string representation.
// Look like :



//  a["[object, object]"] = 123

//  a["[object, object]"] = 456


//  Solution:
// let a = new Map() ;
// let b = {key: 'b'};
// let c = {key: 'c'};

// a.set(b, 123);
// a.set(c, 456);

// console.log(a.get(b));



//  Output: 123
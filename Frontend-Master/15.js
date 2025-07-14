const a = { valueOf: () => 2 };

console.log(a == 2); // Output: true
console.log(a + 3); // Output: 5
console.log(a > 1); // Output: true


//✋✋ Explanation:

// we make a operation on valueOf method of object a. that is not a primitive value. so javascript will convert it to primitive value by calling valueOf method of object a. so we get 2 as primitive value. and then we do the operation on that primitive value. ✋✋ 
const arr = [];

arr[10] = 10;
console.log(arr.length); // Output: 11

arr[100] = 100;
console.log(arr.length); // Output: 101

// ✋✋here we are creating an empty array `arr` and then assigning values to specific indices. When we assign a value to an index that is greater than the current length of the array, JavaScript automatically increases the length of the array to accommodate that index.
// In the first case, we assign `10` to index `10`, which increases the length of the array to `11`. In the second case, we assign `100` to index `100`, which increases the length of the array to `101`. This demonstrates how JavaScript arrays can dynamically grow in size when values are assigned to indices beyond their current length. The length property reflects the highest index plus one, even if there are gaps in the indices.✋✋


//✋✋ This code snippet demonstrates how JavaScript arrays can dynamically adjust their length when values are assigned to specific indices, even if those indices are much larger than the current length of the array. The length property of the array reflects the highest index plus one, which is why the output shows `11` and `101` after the assignments.✋✋


// Now this flexibility we get some loopholes, like if we try to access an index that is not defined, it will return `undefined`:


const arr2 = [];

arr2[10] = 10;
arr2[100] = 100;

arr2.forEach((value, index) => {
    console.log(`Hi`);
}) // Output: Hi Hi

//✋✋ here we are using the `forEach` method to iterate over the array `arr2`. However, since there are gaps in the indices (i.e., indices `0` to `9` and `11` to `99` are not defined), the `forEach` method only iterates over the defined elements, which are at indices `10` and `100`. Since both of these indices have values assigned (`10` and `100`), the output will be 'Hi' printed twice, once for each defined element. This shows that even with gaps in the array, the `forEach` method will only execute for defined elements.✋✋

// when we skip index in array javascript create empty slots for those indices, empty slots could not initialize index. so when we use foreach we need indexes✋✋

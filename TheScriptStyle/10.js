let arr = [1, 2, 3, 4, 5];

arr.length = 0;
arr.push(4)
console.log(arr[0], arr.length); // [4]


// Explanation:

// In the code snippet provided, we have an array `arr` initialized with the values [1, 2, 3, 4, 5].
// When we set `arr.length = 0`, we are truncating the array to have a length of 0, effectively removing all elements.
// After that, we push the value 4 into the array using `arr.push(4)`. This adds the value 4 as the first element of the now empty array.
// Finally, when we log `arr[0]` and `arr.length`, we get 4 and 1 respectively, indicating that the array now contains a single element (4) and its length is 1.


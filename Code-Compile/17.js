// 17. Remove the duplicate or repeated values from an array use Set method 


// A Javascript SET is a collection of unique values. Each value can only occur once in a Set



const numbers = [1, 2, 2, 3, 4, 4, 5, 6, 6];

const nums = new Set(numbers);

nums.add(7);
nums.delete(2)

console.log(nums)
console.log(typeof nums)
console.log(nums instanceof Set)
console.log(nums.size)
console.log(nums.has(2))
console.log(Array.from(nums))
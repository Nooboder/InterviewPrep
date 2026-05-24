// check if elemnt is greater than 10

const arr = [5, 12, 8, 20, 3];

const result = arr.filter((num) => num > 10);

// some method
const hasGreaterThan10 = arr.some((num) => num > 10);

console.log(result); // Output: [12, 20]
console.log(hasGreaterThan10); // Output: true

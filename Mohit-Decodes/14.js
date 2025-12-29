// find 2nd lowest Number

const arr = [10, 5, 20, 8];

const secondLowest = [...new Set(arr)].sort((a, b) => a - b)[1];

console.log(secondLowest); // 8

// 2nd highest
const secondHighest = [...new Set(arr)].sort((a, b) => b - a)[1];

console.log(secondHighest); // 10

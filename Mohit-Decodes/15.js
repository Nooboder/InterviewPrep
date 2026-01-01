// Rotate array by k position

const arr = [1, 2, 3, 4, 5];
const k = 1;

const res = arr.slice(k).concat(arr.slice(0, k));

console.log(res);

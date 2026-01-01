// Filterout falsy values

const arr = [1, 0, null, 2, "", 3, undefined];

const clean = arr.filter(Boolean);

console.log(clean);

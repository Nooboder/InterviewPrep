// Frequency count of element

const arr = ["a", "b", "a", "c", "b", "a"];

const freq = {};

for (let n of arr) {
  freq[n] = (freq[n] || 0) + 1;
}

console.log(freq);

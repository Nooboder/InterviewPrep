// Frequency count of element

const arr = ["a", "b", "a", "c", "b", "a"];

// const arr = [1, 2, 2, 3, 3, 3];

const freq = {};

for (let n of arr) {
  freq[n] = (freq[n] || 0) + 1;
}

console.log(freq);

// Anothrer Method  ******************************

const freq2 = arr.reduce((acc, num) => {
  acc[num] = (acc[num] || 0) + 1;
  return acc;
}, {});

console.log(freq2);

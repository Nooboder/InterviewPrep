// Most repeated element

const arr = [5, 1, 5, 2, 5, 3];

const freq = {};
let maxcount = 0,
  res;

for (let n of arr) {
  freq[n] = (freq[n] || 0) + 1;
  if (freq[n] > maxcount) {
    maxcount = freq[n];
    res = n;
  }
}

console.log(res);

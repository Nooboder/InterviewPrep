// Move all Zeroes to End

const arr = [0, 1, 0, 3, 0, 5];

const res = [];
let zeros = 0;

for (let n of arr) {
  n === 0 ? zeros++ : res.push(n);
}

while (zeros--) res.push(0);

console.log(res);

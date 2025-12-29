// Remove dupliocate without set

const arr = [1, 2, 2, 3, 4, 4];

const unique = [];

for (let n of arr) {
  if (!unique.includes(n)) {
    unique.push(n);
  }
}

console.log(unique);

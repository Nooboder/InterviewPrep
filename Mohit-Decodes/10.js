// Remove dupliocate without set

const arr = [1, 2, 2, 3, 4, 4];

const unique = [];

for (let n of arr) {
  if (!unique.includes(n)) {
    unique.push(n);
  }
}

console.log(unique);

// const arr = [1, 2, 3, 4, 2, 1, 1]

// // Find unique element of an array

// console.log([...new Set(arr)])

// //Find Duplicate element of an array

// const duplicate = arr.filter((item, index) =>
//     arr.indexOf(item) != index
// )

// console.log([...new Set(duplicate)])

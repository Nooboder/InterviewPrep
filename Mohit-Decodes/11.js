// First non repeating element

const arr = [1, 2, 2, 3, 3, 4];

// function firstNonRepeating(arr) {
//   const freq = {};

//   // 1️⃣ Count frequency
//   for (const num of arr) {
//     freq[num] = (freq[num] || 0) + 1;
//   }

//   // 2️⃣ Find first with count === 1
//   for (const num of arr) {
//     if (freq[num] === 1) {
//       return num;
//     }
//   }

//   return null; // no non-repeating element
// }

// console.log(firstNonRepeating(arr)); // 1

// ⚡ 2nd Non repeating ******************

function secondNonRepeating(arr) {
  const freq = {};
  let count = 0;

  // 1️⃣ Count frequency
  for (const num of arr) {
    freq[num] = (freq[num] || 0) + 1;
  }

  // 2️⃣ Find 2nd element with frequency === 1
  for (const num of arr) {
    if (freq[num] === 1) {
      count++;
      if (count === 2) {
        return num;
      }
    }
  }

  return null; // less than 2 non-repeating elements
}

console.log(secondNonRepeating(arr)); // 4

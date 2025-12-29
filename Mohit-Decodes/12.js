// Separate even and odd

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function separateEvenOdd(arr) {
  const even = [];
  const odd = [];

  for (const num of arr) {
    if (num % 2 === 0) {
      even.push(num);
    } else {
      odd.push(num);
    }
  }

  return { even, odd };
}

console.log(separateEvenOdd(arr));

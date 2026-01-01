// Memoization (Performance optimization)

function memoizedSquare() {
  const cache = {};

  return function (n) {
    if (cache[n]) {
      return cache[n];
    }

    console.log("Calculating...");
    cache[n] = n * n;
    return cache[n];
  };
}

const square = memoizedSquare();

console.log(square(5)); // Calculating... → 25
console.log(square(5)); // Cached → 25

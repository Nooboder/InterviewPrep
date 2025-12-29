// Flaten array without flat

// recurssion logic

const arr = [1, [2, [3, 4]], 5];

function flaten(a, res = []) {
  for (let i of a) {
    Array.isArray(i) ? flaten(i, res) : res.push(i);
  }

  return res;
}

console.log(flaten(arr));

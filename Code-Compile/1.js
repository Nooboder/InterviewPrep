// 1. De-structuring with Default values

const { a: x = 10, b: y = 20 } =
    { a: undefined, b: null }

console.log(x, y)
// output : 10 null

// when the value is undefined the default will be triggered.


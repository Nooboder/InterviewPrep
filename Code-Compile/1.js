// 1. De-structuring with Default values

const { a: x = 10, b: y = 20 } =
    { a: undefined, b: null }

console.log(x, y)
// output : 10 null

// when the value is undefined the default will be triggered. and when the value is (javascript falsy [null, 0," ", NaN, false]) value default will not be applied).


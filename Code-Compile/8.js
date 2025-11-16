
// 8. Array copyWithin operation

const arr = [1, 2, 3, 4, 5, 6];

arr.copyWithin(0, 2);

console.log(arr)

// output : [ 3, 4, 5, 6, 5, 6 ]


// const arr = [1,2,3,4,5,6];

// arr.copyWithin(0,2,4);

// console.log(arr)

// output : [ 3, 4, 3, 4, 5, 6 ]


//  arr.copyWithin(target index, start index, (stop before) end index);
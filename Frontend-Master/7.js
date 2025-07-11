//square all even numbers in the array
// [4, 16, 36]


const arr = [1, 2, 3, 4, 5, 6, 7,];



const res = arr.filter((item, index) => item % 2 == 0).map((ele) => ele * ele)

console.log(res);


// solution another using flatmap

const res2 = arr.flatMap((item) =>
    item % 2 == 0 ? item * item : []
)

console.log(res2);
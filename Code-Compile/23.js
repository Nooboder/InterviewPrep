// 23.Trick Question 3 


let x = 10;

let y = (x++, x + 1, x * 2);
console.log(y);

// Comma operator always pick the last one. Output always calculate from the last expression . The comma operator evaluates each expression from left to right but returns the last expression's value.


// X++ = 11;
// X+1 = 12;
// x*2 = 11*2 ;

// Output will be 22


// Trick Question 4


const arr = [1, 2, 3, 4, 5]

for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
        arr.splice(i, 1)
    }
}

console.log(arr)

// Output will be [1,3,5] because when we remove an element from the array using splice, the length of the array decreases and the index shifts. So, we skip the next element after removing an even number.



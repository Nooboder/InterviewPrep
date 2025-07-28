// 23.Trick Question 3 


let x = 10;

let y = (x++, x + 1, x * 2);
console.log(y);

// Comma operator always pick the last one. Output always calculate from the last expression . The comma operator evaluates each expression from left to right but returns the last expression's value.


// X++ = 11;
// X+1 = 12;
// x*2 = 11*2 ;

// Output will be 22
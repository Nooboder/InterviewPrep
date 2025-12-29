// Find the missing number

const arr = [1,2,4,5]

const n = 5

let total = n*(n+1)/2;


let sum = arr.reduce((sum,acc)=>(sum+acc),0)

console.log(total-sum)
// 21. Rest & Spread Operator


//  Rest Operator collect all the arguments into an array

function sum(...numbers) {
    console.log(numbers)
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4));

//  The spread operator takes items from an array or properties from an object and spreads them out

const nums = [1, 2, 3, 4];
console.log(sum(...nums));


const user = {
    name: "Sapta",
    age: "20",
    role: "Admin"
}

console.log(...user.name);
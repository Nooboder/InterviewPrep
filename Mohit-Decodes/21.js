// Convert Number to Array of Digits

let num = 12345;

console.log([...(num + "")]);

const digits = [...num.toString()].map(Number);

console.log(digits);

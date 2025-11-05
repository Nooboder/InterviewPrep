// 30. Total price to pay with single line of code 

const cart = [
    { item: 'Laptop', price: 1000, quantity: 1 },
    { item: 'Phone', price: 500, quantity: 2 },
    { item: 'Tablet', price: 300, quantity: 1 }
];

const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

console.log(totalPrice); // 2300


// What reduce() does:

// Iterates through every element in the array.

// Keeps an accumulator (here, total).

// Each iteration returns a new value for total.

// Initial total = 0 (the second argument you passed).

// 3. Iteration Breakdown
// Step	product	Calculation	New total
// 1️⃣	{ item: 'Laptop', price: 1000, quantity: 1 }	0 + 1000 * 1	1000
// 2️⃣	{ item: 'Phone', price: 500, quantity: 2 }	1000 + 500 * 2	2000
// 3️⃣	{ item: 'Tablet', price: 300, quantity: 1 } 2000 + 300 * 1

//2300
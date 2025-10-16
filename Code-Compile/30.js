// 30. Total price to pay with single line of code 

const cart = [
    { item: 'Laptop', price: 1000, quantity: 1 },
    { item: 'Phone', price: 500, quantity: 2 },
    { item: 'Tablet', price: 300, quantity: 1 }
];

const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

console.log(totalPrice); // 2300
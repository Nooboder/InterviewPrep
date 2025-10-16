// 36.dynamic object properties 

const user = {
    name: "John",
    age: 30,
    country: "India"
}

const keyToAccess = ["age", "country"];

// Dot notation
console.log(user.age); // 30    

console.log(user[keyToAccess[0]]); // 30
console.log(user[keyToAccess[1]]); // India

keyToAccess.forEach((key) => {
    console.log(user[key]);
});
// 30
// India


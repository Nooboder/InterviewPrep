// Destructing with default values


const user = {
    name : "Sapta",
    age : 24
}

// const {name, age, city = "Kolkata"} = user;

// console.log(name, age) // Sapta 24

const {name: user_name, age} = user;

console.log(user_name)


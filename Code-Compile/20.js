// 20. Object


const user = {
    name: "Sapta",
    age: "20",
    role: "Admin"
}

console.log(Object.keys(user))

// get the object keys and convert it into an array

// OUTPUT: [ 'name', 'age', 'role' ]

console.log(Object.keys(user).length)

// OUTPUT:3

for (keys in user) {
    console.log(keys, user[keys])
}

// OUTPUT:
// name Sapta
// age 20
// role Admin


PROTOTYPE

const person = Object.create(user);

person.name = "Jhon"

console.log(Object.keys(person))

// OUTPUT: [ 'name' ]

// person er jnno je user , person er prototype user jar 3 te property ache. Object.keys use krle only name property dbe. directly person object ke access krche. jodio user object inherit hocche person er moddhe. Object.keys lagale direct object er je property setai pbe.(person.name = "Jhon")
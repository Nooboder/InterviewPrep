// 3. Object.freeze and Object.seal

const person = Object.seal({
    name: "Sapta",
    age: 27
})


// edit
person.name = "Sir"

//  add

person.city = "Kolkata"

// delete

// delete person;

console.log(person)

//  freeze is not allowed to edit, delete and add.
//  seal is only allow edit.
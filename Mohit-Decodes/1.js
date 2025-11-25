// what is optional chaining ?


const user = {
    profile:{
        name : "Sapta"
    }
}

// console.log(user?.profile?.name) // Sapta
console.log(user.profile.age)// undefined
// console.log(user?.profile?.age) // undefined

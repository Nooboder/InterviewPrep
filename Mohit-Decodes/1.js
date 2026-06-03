// what is optional chaining ?


const user = {
    profile: {
        name: "Sapta"
    }
}

// console.log(user?.profile?.name) // Sapta
console.log(user.profile.age)// undefined
// console.log(user?.profile?.age) // undefined

// Explain:  optional chaining is a feature in JavaScript that allows you to safely access nested properties of an object without having to check if each level of the object exists. It uses the `?.` operator to check if the property exists before trying to access it. If any part of the chain is `null` or `undefined`, it will return `undefined` instead of throwing an error.

// In the example above, we have an object `user` with a nested object `profile`. When we try to access `user.profile.name`, it works because `profile` exists. However, when we try to access `user.profile.age`, it returns `undefined` because `age` does not exist in the `profile` object.


// If we were to use optional chaining, we could write `user?.profile?.age`, which would also return `undefined` without throwing an error, even if `profile` itself was `undefined`. This makes it a safer way to access nested properties in objects.

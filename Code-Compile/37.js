// 37. optional chaining, nullish coalasing operator


let user = {
    name: "John",
    age: 30,
    address: {
        city: "New York",
        zip: "10001"
    }
}

console.log(user?.address?.city); // New York
console.log(user?.contact?.phone); // undefined optional chaining

//  nullish coalasing operator

console.log(user?.contact?.phone ?? 'not exist');
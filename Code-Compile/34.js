
// 34. Array Find method 

const users = [
    { userId: 1, userName: "John", age: 25 },
    { userId: 2, userName: "Alice", age: 30 },
    { userId: 3, userName: "Bob", age: 22 },
    { userId: 4, userName: "Charlie", age: 28 },
];

// Find user with userNme "Bob"
const user = users.find((user) => user.userName === "Bob");
console.log(user); // { userId: 3, userName: 'Bob', age: 22 }

// Find user with age greater than 26
const userAbove26 = users.find((user) => user.age > 26);
console.log(userAbove26); // { userId: 2, userName: 'Alice', age: 30 }



// ******// here catch is find method return first match value only if you want all match value use filter method
const allUsersAbove26 = users.filter((user) => user.age > 26);
console.log(allUsersAbove26); // [ { userId: 2, userName: 'Alice', age: 30 }, { userId: 4, userName: 'Charlie', age: 28 } ]

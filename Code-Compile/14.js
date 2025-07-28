// 14. ENUM


// In programming, an enum (short for enumeration) is a special type that defines a set of named constants. These constants are often used to represent distinct values, making code more readable and maintainable. 

// Javascript have not provide the enum but we can achieve it by using object and Object.freeze() method


// const UserRole = {
//     ADMIN: "admin",
//     USER: "user",
//     GUEST : "guest",
// }

// UserRole.ADMIN = "XYZ"

// console.log(UserRole.ADMIN)

// Here we can change the object value. Like muted the value .


// IMMUTABLE USING OBJECT.FREEZE 

const UserRole = Object.freeze({
    ADMIN: "admin",
    USER: "user",
    GUEST: "guest",
})

UserRole.ADMIN = "XYZ"

console.log(UserRole.ADMIN)
// WALLMART INTERVIEW QUESTION : Analize and solution 

const users = {
    frontendmater: {},
    sapta: {}
}

let name = "sapta";

// name comes from input text

if (users[name]) {
    console.log("BOSS");
} else {
    console.log("GUEST");
}


// 🤖  Explaining the code:

// 👌 👌 the problem is in if condition . whenever we use users[name] to check on the object that key is exist or not,
//  Javascript engine automatically check on the prototype chain that if the key exist or not . Example 👌 👌


// const users = {
//     frontendmater: {},
//     sapta: {}
// }

//let name = "toString";
//// :✋ Javascript prototype chain  the key exist


// if (users[name]) {
//     console.log("BOSS");
// } else {
//     console.log("GUEST");
// }

// // output: GUEST

// ---------------------------------------------------------------------------------

// const users = {
//     frontendmater: {},
//     sapta: {}
// }

// let name = "constructor";

//// :✋ Javascript prototype chain  the key exist

// if (users[name]) {
//     console.log("BOSS");
// } else {
//     console.log("GUEST");
// }

// // output: GUEST



// 🤖  Solution: ------------------------------------------------

// const users = {
//     frontendmater: {},
//     sapta: {}
// }

// let name = "constructor";

// // name comes from input text

// if (Object.hasOwn(users, name)) {
//     console.log("BOSS");
// } else {
//     console.log("GUEST");
// }

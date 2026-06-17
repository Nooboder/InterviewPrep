// Object -> Entries (Key Value Array)

const user = { name: "Sapta", age: 30 };

console.log(Object.entries(user));

// Entries ->Object

const arr = [
  ["name", "Sapta"],
  ["age", 30],
];

console.log(Object.fromEntries(arr));



// Object → Array of key-value pairs using Object.entries()
// Array of key-value pairs → Object using Object.fromEntries()
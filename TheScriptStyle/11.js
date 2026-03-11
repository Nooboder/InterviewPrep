const one = Symbol(2);

const obj = {
    ["one"]: 1,
    [one]: 2
}

console.log(obj.one); // 1

// Explanation:

// In the code snippet provided, we are creating a symbol using `Symbol(2)` and assigning it to the variable `one`. Symbols are unique and immutable data types in JavaScript.
// We then create an object `obj` with two properties. The first property is defined using a string key "one", which has a value of 1. The second property is defined using the symbol `one` as the key, which has a value of 2.

// When we log `obj.one`, it accesses the property with the string key "one" and returns the value 1. The symbol key does not interfere with the string key, so it does not affect the value of `obj.one`. Therefore, the output is 1.

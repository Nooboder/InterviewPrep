const obj = {
    name: 'Silver Surfer',
    villain: 'Galactus',
}

console.log(obj.length);


// Q1 . whenever we use obj.length we need to count the object keys property ?
// expected output :2

// 1. THIS IN JS 🤟
// 2.PROTOTYPES 🤟
// 3. OBJECT.DEFINEPROPERTY 🤟
// 4.GETTERS SETTERS 🤟

const res = Object.prototype;
Object.defineProperty(res, 'length', {
    get() {
        return Object.keys(this).length;
    }
})

console.log(obj.length);
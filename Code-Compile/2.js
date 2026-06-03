// 2.i) Arrow Function and Normal Function 

const person = {
    name: "Sapta",
    greet: () => {
        console.log(`Hello,  ${this.name}`);
    }
}

person.greet();

// output : Hello,  undefined

//  Arrow functions don't have their own this -
//  they use this from the surrounding lexical context(global scope here).

//  solution  :


//  const person = {
//      name : "Sapta",
//      greet  () {
//         console.log(`Hello,  ${this.name}`);
//      }
//  }

//  person.greet();










// 2.ii) Arrow Function and Normal Function 

const obj = {
    name: 'sapta',
    arrowGreet: () => {
        console.log(`Arrow: Hello, ${this.name}`);
    },
    normalGreet: function () {
        console.log(`Normal: Hello, ${this.name}`);
    },
};

obj.arrowGreet();
obj.normalGreet();



// --------------------------OUTPUT-------------------------------
// Arrow: Hello, undefined
// Normal: Hello, sapta


// * in case of normal function `this` is dynamic. define inside obj so, reffer only that obj object where it can get the name access.
// * in case of arrow function `this` is lexical. But this is not reffering that obj object. it finds the name object globally . (outside the obj)

//  So the solution of accessing the name property from the outside of the object is given below ------

// global.name = "Jhon"
// const obj = {
//     name:'sapta',
//     arrowGreet : () => {
//         console.log(`Arrow: Hello, ${name}`);
//     },
//     normalGreet : function () {
//         console.log(`Normal: Hello, ${this.name}`);
//     },
// };

// obj.arrowGreet();
// obj.normalGreet();

// --------------------------OUTPUT-------------------------------

// Arrow: Hello, Jhon
// Normal: Hello, sapta


// 2.iii) Arrow Function and Normal Function 

const obj1 = {
    a: 1,
    b: 2,
    sum() {
        return this.a + this.b;
    }
}


const res = obj1.sum();
console.log(res());

// explain : In the above code, we have an object `obj1` with properties `a` and `b`, and a method `sum` that returns the sum of `a` and `b`. When we call `obj1.sum()`, it correctly returns the sum of `a` and `b`, which is 3. However, when we try to call `res()` after storing the result of `obj1.sum()` in the variable `res`, it will throw an error because `res` is not a function, but rather the result of the sum, which is a number (3).

// To fix this, we should simply log the result of `obj1.sum()` directly without trying to call it as a function:
// const res = obj1.sum();
// console.log(res);
// This will correctly output 3 without any errors.

// other solution :
const obj1 = {
    a: 1,
    b: 2,
    sum() {
        return this.a + this.b;
    }
}

const res = obj1.sum;
console.log(res()); // This will work because res is now a reference to the sum function, and when we call res(), it will execute the sum function with the correct context of obj1, allowing it to access this.a and this.b correctly.

// bind method can also be used to fix the context of `this` when calling the function:
const obj1 = {
    a: 1,
    b: 2,
    sum() {
        return this.a + this.b;
    }
}

const res = obj1.sum.bind(obj1);
console.log(res()); // This will also work because bind creates a new function with the context of obj1, allowing it to access this.a and this.b correctly when called.


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
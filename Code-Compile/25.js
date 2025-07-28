// 25. Trick Question 4


const obj = {
    name: 'alice',
    greet: function () {
        setTimeout(function () {
            console.log(this.name);
        }, 0)
    }
}

obj.greet();


//OUTPUT : undefined


// How to access the name ?


// 1. Use an arrow function
// Arrow functions do not have their own this; they inherit this from the surrounding lexical context.

// const obj = {
//     name: 'alice',
//     greet: function() {
//         setTimeout(() => {
//             console.log(this.name); // 'alice'
//         }, 0);
//     }
// };

// obj.greet();



// 2. Store this in a variable (like self or that)
// This is a traditional approach before arrow functions were available.

// const obj = {
//     name: 'alice',
//     greet: function() {
//         const self = this;
//         setTimeout(function() {
//             console.log(self.name); // 'alice'
//         }, 0);
//     }
// };

// obj.greet();


// 3. Use .bind(this)
// This ensures the function is bound to the correct this.


// const obj = {
//     name: 'alice',
//     greet: function() {
//         setTimeout(function() {
//             console.log(this.name); // 'alice'
//         }.bind(this), 0);
//     }
// };

// obj.greet();
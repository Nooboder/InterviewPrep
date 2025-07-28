// 24. Interviewer Question 


const obj = {
    name: "Sapta",
    greet: function () {
        return `Hello, ${this.name}`
    }
}

console.log(obj)

// access the function --

console.log(obj.greet())

// Output : Hello, Sapta

// this reffer to the obj object



// copy the greet into a new function --

//  const obj = {
//      name : "Sapta",
//      greet : function(){
//          return `Hello, ${this.name}`
//      }
//  }

//  const greetFn = obj.greet;


//  console.log(greetFn())

// OUTPUT : Hello, undefined

//  when i copy the greet function into greetFn function, then the greetFn is become the standalone function can not find the name property because the the this keyword only refer the obj object and greet function find the object. That's why the name become undefined.


//  Solution

// create a global name variable that can be access by greetFn

//  name = "Sapta"
//  const obj = {
//      name : "Sapta",
//      greet : function(){
//          return `Hello, ${this.name}`
//      }
//  }

//  const greetFn = obj.greet;


//  console.log(greetFn())

// // bind method: return a new function

//  const obj = {
//      name : "Sapta",
//      greet : function(){
//          return `Hello, ${this.name}`
//      }
//  }

//  const greetFn = obj.greet.bind(obj);


//  console.log(greetFn())
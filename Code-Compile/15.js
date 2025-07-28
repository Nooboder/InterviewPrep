// 15. Async & Await



// async/await is a feature in many programming languages (like JavaScript, Python, C#) that makes asynchronous code easier to write and read. It provides a way to structure asynchronous operations in a way that resembles synchronous code. 

// Here's a breakdown :

//  What it does :

// Async:

// This keyword is used before a function definition to make it an asynchronous function. Asynchronous functions automatically return a promise, which is an object representing the eventual completion (or failure) of an asynchronous operation.

// Await:

// This keyword is used within an async function to pause the execution of that function until a promise is resolved. The await keyword can only be used within an async function. When the promise is resolved, the function resumes, and the value of the resolved promise is returned to the await expression





//  Using Promise


// fetch('https://jsonplaceholder.typicode.com/todos/1')
// .then(response => response.json())
// .then(data =>{
//     console.log('Promise:', data);
// })
// .catch(error =>{
//     console.log('Error:', error);
// });


// using Async Await

async function fetchDate() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);

    }
}

fetchDate();
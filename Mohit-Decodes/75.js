try {
  setTimeout(() => {
    console.log("Boom");
  }, 1000);
} catch (error) {
  console.log("Error:", error);
}

// explain : In this code snippet, we are using `setTimeout` to schedule a function that will log "Boom" to the console after a delay of 1000 milliseconds (1 second). The `setTimeout` function is asynchronous and does not throw an error that can be caught by the surrounding `try...catch` block.

// Since `setTimeout` is non-blocking and executes the callback function after the specified delay, any errors that occur within the callback function will not be caught by the `try...catch` block. Instead, they will be handled by the JavaScript runtime's error handling mechanism.
// In this case, if there were an error inside the callback function (for example, if we tried to access an undefined variable), it would not be caught by the `try...catch` block, and the error would be logged to the console as an uncaught error. However, since our callback function simply logs "Boom", it will execute successfully without any errors.
// Therefore, the output of this code will be:
// Boom

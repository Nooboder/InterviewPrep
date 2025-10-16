// 32. Clear Interval, SET Interval, SET Timeout how it works give an example ?

const intervalId = setInterval(() => {
    console.log("Sapta")
}, 2000)

// alawys return an id
console.log(intervalId)


setTimeout(() => {
    clearInterval(intervalId)
    console.log("Stopped")
}, 7000)

// after 7 second it will stop printing Sapta
// output
// Sapta
// Sapta
// Sapta

// --------------------------------describe ---------------------------------
// setInterval is a function that will run a piece of code repeatedly at a specified interval of time.
// setTimeout is a function that will run a piece of code once after a specified delay.
// clearInterval is a function that stops the execution of the code that was set to run repeatedly by setInterval.
// clearTimeout is a function that stops the execution of the code that was set to run once by setTimeout.
// Both setInterval and setTimeout return a unique identifier (ID) that can be used to stop the execution using clearInterval or clearTimeout respectively.
// In the example above, setInterval is used to print "Sapta" every 2 seconds. After 7 seconds, setTimeout is used to call clearInterval, which stops the repeated printing of "Sapta".
// The output will be "Sapta" printed three times at 2-second intervals, followed by "Stopped" after 7 seconds.
// Note: The actual timing may vary slightly due to the nature of JavaScript's event loop and execution environment.


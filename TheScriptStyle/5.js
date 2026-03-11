function normalFunction() {

    console.log(arguments);
}

normalFunction(1, 2, 3); // Output: [Arguments] { '0': 1, '1': 2, '2': 3 }

// why?

// In a normal function, the arguments object is available and contains all the arguments passed to the function. When you call normalFunction(1, 2, 3), it logs the arguments object, which shows that it contains the values 1, 2, and 3. This is because normal functions have their own arguments object that is created when the function is called, allowing you to access the arguments passed to the function.







// What is Debouncing?

// Debouncing means delaying the execution of a function until a certain amount of time has passed since the last time it was called.

// 👉 It prevents a function from running too many times.

// Common use cases:

// Search input API calls

// Window resize events

// Button click protection

// Scroll events













function debounce(func, delay) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}


function search(value) {
    console.log("Searching for:", value);
}

const debouncedSearch = debounce(search, 3000);

// simulate typing
debouncedSearch("s");
debouncedSearch("sa");
debouncedSearch("sap");
debouncedSearch("sapt");
debouncedSearch("sapta");
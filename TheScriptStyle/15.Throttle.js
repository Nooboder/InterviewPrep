function throttle(func, delay) {
    let lastCall = 0;

    return function (...args) {
        let now = Date.now();

        if (now - lastCall >= delay) {
            lastCall = now;
            func(...args);
        }
    };
}

function search(value) {
    console.log("Searching for:", value);
}

const throttledSearch = throttle(search, 3000);

throttledSearch("s");
throttledSearch("sa");
throttledSearch("sap");
throttledSearch("sapt"); 
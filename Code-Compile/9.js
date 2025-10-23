// 9. Promise



const fetchData = () => {
    return new Promise((resolve, reject) => {
        const success = true;
        setTimeout(() => {
            if (success) {
                resolve("Data Fetched Successfully!");
            } else {
                reject("Failed To Fetched...");
            }
        }, 2000)
    })
}

fetchData().then((message) => console.log(message))
    .catch((error) => console.log(error));

//  provided by javascript to handle the response of asynchronous operation.
//     has 3 state pending, fulfilled, rejecting.






// ✅ accept custom delay (how long before fetching),
// ✅ accept retries (how many times to retry if it fails),
// ✅ accept retryInterval (how long to wait between retries),
// and then resolve or reject accordingly.



// function fetchDataWithRetry(delay = 2000, retries = 3, retryInterval = 1000) {
//   return new Promise((resolve, reject) => {
//     let attempt = 0;

//     const data = {
//       name: "sapta",
//       position: "admin",
//       age: 28,
//       country: "India"
//     };

//     const fetchAttempt = () => {
//       console.log(`⏳ Attempt ${attempt + 1} of ${retries}`);

//       // Simulate random success or failure
//       const status = Math.random() > 0.5; // 50% success chance

//       setTimeout(() => {
//         if (status) {
//           console.log("✅ Data fetched successfully!", data);
//           resolve(data);
//         } else {
//           console.log("❌ Fetch failed...");
//           attempt++;
//           if (attempt < retries) {
//             console.log(`🔁 Retrying in ${retryInterval / 1000}s...`);
//             setTimeout(fetchAttempt, retryInterval);
//           } else {
//             reject("🚨 All retries failed. Something went wrong!");
//           }
//         }
//       }, delay);
//     };

//     fetchAttempt();
//   });
// }

// // 🧪 Example usage:
// fetchDataWithRetry(1500, 3, 1000)
//   .then((data) => console.log("🎉 Success:", data))
//   .catch((error) => console.log(error));



// 🧠 Explanation

// fetchDataWithRetry(delay, retries, retryInterval) — takes all three params.

// status = Math.random() > 0.5 — simulates random success/failure.

// If success → it resolves the promise with the data.

// If failure →

// increases the attempt count.

// if there are retries left → waits for retryInterval ms and tries again.

// if no retries left → rejects with an error.

// Uses recursive call fetchAttempt() for retry logic.


// ┌────────────────────────────┐
// │        Promise()           │
// │ (Starts in Pending state)  │
// └────────────┬───────────────┘
//              │
//              │ async operation (e.g. API call, timer, DB query)
//              ▼
// ┌────────────────────────────┐
// │  resolve(value) called     │
// │  ✅ Operation successful   │
// └────────────┬───────────────┘
//              │
//              ▼
//      .then(value => { ... })
//              │
//              ▼
//    (Handle success result)

// OR (if something goes wrong 👇)

//                      │
//              ▼
// ┌────────────────────────────┐
// │  reject(error) called      │
// │  ❌ Operation failed       │
// └────────────┬───────────────┘
//              │
//              ▼
//     .catch(error => { ... })
//              │
//              ▼
//    (Handle failure message)




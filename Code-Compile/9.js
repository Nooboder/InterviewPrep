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
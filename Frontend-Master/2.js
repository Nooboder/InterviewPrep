const getData = () => {
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



getData()
    .then(() => {
        return "Successfully Fetched Data";
    })
    .then()
    .then()
    .catch()
    .then()
    .then()
    .then((data) => {
        console.log(data);
    })

// Output: Successfully Fetched Data

// 🖐️this is the 1st data we retuen on the 1St then block.

// 👽 Explaining the code:

// 👌👌 when we return any value from a then block then  that value passes through the subsequent then blocks and
// if on that then block has no callback then it passes again the previous value to the next then block.👌👌

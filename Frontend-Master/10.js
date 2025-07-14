const obj = {
    lib: 'React',
    showName: function () {
        console.log(this.lib);
    }

}

obj.showName(); // React
setTimeout(obj.showName, 1000); // undefined


// ✋✋ Solution 1:


// const obj = {
//     lib: 'React',
//     showName: function () {
//         console.log(this.lib);
//     }

// }

// obj.showName(); // React
// setTimeout(() => {
//     obj.showName(); // React
// }, 1000); // React



// ✋✋ Solution 2:

// const obj = {
//     lib: 'React',
//     showName: function () {
//         console.log(this.lib);
//     }

// }

// obj.showName(); // React

// obj.showName = obj.showName.bind(obj);
// setTimeout(obj.showName, 1000);
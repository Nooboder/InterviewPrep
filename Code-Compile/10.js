// 10. Class, Object, Constructor


// class User{
//     constructor(name){
//         this._name = name
//     }
// }
// const user = new User("Sapta");



// , getter


// class User{
//     constructor(name){
//         this._name = name
//     }

//     get name(){
//         return this._name.toUpperCase();
//     }
// }
// const user = new User("Sapta");

// console.log(user.name)


// setter > if we need to change the name

class User {
    constructor(name) {
        this._name = name
    }

    set name(newName) {
        if (newName) {
            return this._name = newName.trim();
        }
    }

    get name() {
        return this._name.toUpperCase();
    }
}
const user = new User("Sapta");

console.log(user.name) // getter
user.name = "      SaptaShree"
console.log(user.name) // setter
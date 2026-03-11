const employee = {
    name: "John Doe",
    age: 30,
    adharCardNo: "1234-5678-9012",
    panCardNo: "ABCDE1234F",
    accountNo: "9876543210",
    ifscCode: "SBIN0001234",
    branch: "Main Branch",
}


//default behaviour controlled by the engine
// Proxy in JavaScript allows you to create a proxy object that can intercept and customize operations performed on the target object. By default, when you create a proxy, it behaves like the original object, but you can define custom behavior for various operations such as property access, assignment, enumeration, function invocation, etc.


const empProxy = new Proxy(employee, {

    get(target, prop) {
        if (prop === "adharCardNo" || prop === "panCardNo" || prop === "accountNo") {
            console.log("Access Denied");
            return "xxxxxxxxxxxxxxx0000";
        }

        // return Reflect.get({ ...target }, prop);
        return Reflect.get(target, prop);
    }

});

console.log(empProxy.name); // Output: John Doe
console.log(empProxy.age); // Output: 30
console.log(empProxy.adharCardNo); // Output: Access Denied, xxxxxxxxxxxxxxx0000
console.log(empProxy.panCardNo); // Output: Access Denied, xxxxxxxxxxxxxxx0000
console.log(empProxy.accountNo); // Output: Access Denied, xxxxxxxxxxxxxxx0000
console.log(empProxy.ifscCode); // Output: SBIN0001234
console.log(empProxy.branch); // Output: Main Branch
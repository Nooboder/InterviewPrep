

//✋✋✋✋✋✋✋✋ Q Find the bug



// let a = "JS";

// switch (a) {
//     case "learn":
//         let msg = "Learning JS";
//         console.log(msg);
//         break;
//     case "write":
//         let msg = "JS is fun";
//         console.log(msg);
//         break;
// }


//✋✋ here both case share the same variable name `msg`, which is not allowed in the same scope. ✋✋




let a = "JS";

switch (a) {
    case "learn":
        {
            let msg = "Learning JS";
            console.log(msg);
            break;
        }

    case "write":
        {
            let msg = "JS is fun";
            console.log(msg);
            break;
        }

}
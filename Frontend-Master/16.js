

// 👽👽 Q.is the sibling function create a closure over the parent function's variables?


function parent() {
    let lang = "JavaScript";
    let version = "ES6";


    function child() {
        console.log(lang);
        console.log(version);
    }

    function sibling() {
        console.log("What is the language?");
    }

    console.dir(child);
    console.dir(sibling);
}

parent();

//✋✋ Explaination:
//  "Here we clearly sees the concept of closure. The child function has access to the variables of the parent function even after the parent function has finished executing. This is because the child function forms a closure over the variables in its lexical scope.";

// "The sibling function creates a closure over the parent function's variables as well, but it does not access them. It simply logs a string to the console. However, if it were to access `lang` or `version`, it would also have access to those variables due to closure."; it is called 🤖 CLOSURE PRESERVATION.🤖 ✋✋
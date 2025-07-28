// 19. Closure , Lexical Scope 



//  Lexical Scope : only access the parent function variable.
//  Closure : store the variable of parent function after execution.

let count = 0;

//  IFFE function :

const add = (function () {

    if (count === 0) {
        count += 1;
    }
    return function () {
        count += 1;
        console.log(count);
    }

})();

add();
add();
add();
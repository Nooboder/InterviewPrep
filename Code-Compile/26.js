// 26. Trick Question 5


var x = 1;
if (function f() {

}) {
    console.log(x + typeof f)
}


// OUTPUT : 1undefined
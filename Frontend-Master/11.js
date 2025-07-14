var y = 1;

if (function f() { }) {
    y += typeof f;
}

console.log(y); // Output: "1undefined"



// ✋✋ The code we written in if block the code execute on a separate scope . when the if condition code execute, that separate scope immidiately destroys.
// so the f() function could not accessable so the value is "undefined" . string because of typeof operator.
// then simply concatination with 1✋✋
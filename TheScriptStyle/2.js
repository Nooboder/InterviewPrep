var name = "Global Name";

(function () {
    console.log(name);
    var name = "Local Name";
})();

console.log(name);
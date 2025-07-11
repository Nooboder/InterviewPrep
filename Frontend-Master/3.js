const arr = [1, 2, 3, 4, 5];

const res = arr.map(function magicfn(num) {
    return num * num;
})

console.log(res);

const fn = magicfn();

console.log(fn);

// 💣 Output : ReferenceError: magicfn is not defined

// ✋✋ because `magicfn` is defined as a function expression (not function defination) inside the `map` method,
// it is not hoisted and cannot be accessed outside of that scope.✋✋
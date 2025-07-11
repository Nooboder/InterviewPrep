// interviewer give you a string and given you to construct a object

// "a.b.c.d.e" =======> { a: { b: { c: { d: e } } } }

const str = "a.b.c.d.e";
const strArray = str.split(".");

const obj = strArray.reduceRight(cb);

function cb(acc, nxt) {
    return { [nxt]: acc };
}

console.log(obj);

console.log(JSON.stringify(obj, null, 2));
// TS- Generics (Reusable Code with Types)

function identity<T>(arg: T): T {
    return arg;
}

const output1 = identity<string>("Hello, World!");
const output2 = identity<number>(42);

console.log(output1); // Output: Hello, World!
console.log(output2); // Output: 42
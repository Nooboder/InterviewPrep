if ([]) {
    console.log('🤩')
}

if ([] == true) {
    console.log('🤩')
} else {
    console.log('😢')
}

// Output :
// 🤩
// 😢



//✋✋ Explaination:

//  In JavaScript, an empty array `[]` is truthy, meaning it evaluates to `true` in a boolean context. However, when comparing an empty array to `true` using the equality operator (`==`), JavaScript attempts to convert both sides to a common type. The empty array is converted to an empty string(try to convert it into a primitive value), which is then converted to a number (0). Since `0` is not equal to `true` (which is `1`), the comparison evaluates to `false`. Thus, the first condition logs '🤩' and the second logs '😢'.; ✋✋
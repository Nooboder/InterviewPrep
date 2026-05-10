Input - "  hello     world  ";

Output - "helloworld";

const str = "  hello     world  ";

const noSpacesStr = str.replace(/\s/g, "");

// const reversedStr = noSpacesStr.split('').join('');

console.log(noSpacesStr); // Output: "helloworld"

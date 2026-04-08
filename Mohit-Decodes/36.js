// check if two string are equal or not

function areStringsEqual(str1, str2) {
  if (str1.length !== str2.length) {
    return false; // If lengths are different, strings are not equal
  }

  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      return false; // If any character is different, strings are not equal
    }
  }

  return true; // If all characters are the same, strings are equal
}

console.log(areStringsEqual("hello", "hello")); // true
console.log(areStringsEqual("hello", "world")); // false

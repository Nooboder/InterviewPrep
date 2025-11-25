// String basically indexed


// console.log("Hello"[0]) // H

// console.log("Hello"[5]) // undefined 










// 📝 JavaScript String Methods & Properties Table



// | **Category**          | **Method / Property**        | **Description**                 | **Example**                   | **Output**      |
// | --------------------- | ---------------------------- | ------------------------------- | ----------------------------- | --------------- |
// | **Property**          | `length`                     | Returns string length           | `"Hello".length`              | `5`             |
// | **Access**            | `charAt(index)`              | Returns character at index      | `"Hello".charAt(1)`           | `"e"`           |
// |                       | `charCodeAt(index)`          | Returns Unicode of character    | `"A".charCodeAt(0)`           | `65`            |
// |                       | `codePointAt(index)`         | Returns full Unicode code point | `"😊".codePointAt(0)`         | `128522`        |
// |                       | `[]`                         | Access like array               | `"Hello"[1]`                  | `"e"`           |
// | **Case**              | `toUpperCase()`              | Convert to uppercase            | `"hello".toUpperCase()`       | `"HELLO"`       |
// |                       | `toLowerCase()`              | Convert to lowercase            | `"HELLO".toLowerCase()`       | `"hello"`       |
// |                       | `toLocaleUpperCase(locale)`  | Locale-specific uppercase       | `"i".toLocaleUpperCase('tr')` | `"İ"`           |
// |                       | `toLocaleLowerCase(locale)`  | Locale-specific lowercase       | `"I".toLocaleLowerCase('tr')` | `"ı"`           |
// | **Searching**         | `indexOf(sub, start)`        | First index of substring        | `"hello".indexOf("l")`        | `2`             |
// |                       | `lastIndexOf(sub)`           | Last index of substring         | `"hello".lastIndexOf("l")`    | `3`             |
// |                       | `includes(sub)`              | Check if substring exists       | `"hello".includes("ll")`      | `true`          |
// |                       | `startsWith(sub)`            | Check start                     | `"hello".startsWith("he")`    | `true`          |
// |                       | `endsWith(sub)`              | Check end                       | `"hello".endsWith("lo")`      | `true`          |
// |                       | `search(regex)`              | Regex search                    | `"hello".search(/l/)`         | `2`             |
// | **Extract**           | `slice(start, end)`          | Extract part of string          | `"hello".slice(1,4)`          | `"ell"`         |
// |                       | `substring(start, end)`      | Extract substring               | `"hello".substring(1,4)`      | `"ell"`         |
// |                       | `substr(start, length)`      | Extract by length               | `"hello".substr(1,3)`         | `"ell"`         |
// | **Modify**            | `replace(search, newStr)`    | Replace first occurrence        | `"hello".replace("l","x")`    | `"hexlo"`       |
// |                       | `replaceAll(search, newStr)` | Replace all occurrences         | `"hello".replaceAll("l","x")` | `"hexxo"`       |
// |                       | `trim()`                     | Remove spaces both ends         | `" hello ".trim()`            | `"hello"`       |
// |                       | `trimStart()` / `trimLeft()` | Remove start spaces             | `"  hello".trimStart()`       | `"hello"`       |
// |                       | `trimEnd()` / `trimRight()`  | Remove end spaces               | `"hello  ".trimEnd()`         | `"hello"`       |
// |                       | `padStart(len, char)`        | Pad start                       | `"5".padStart(3,"0")`         | `"005"`         |
// |                       | `padEnd(len, char)`          | Pad end                         | `"5".padEnd(3,"0")`           | `"500"`         |
// | **Split/Join**        | `split(sep, limit)`          | Split into array                | `"a,b,c".split(",")`          | `["a","b","c"]` |
// |                       | `concat(str1,str2)`          | Concatenate strings             | `"Hello".concat(" ","World")` | `"Hello World"` |
// | **Repeat**            | `repeat(count)`              | Repeat string                   | `"ha".repeat(3)`              | `"hahaha"`      |
// | **Regex**             | `match(regex)`               | Get matches                     | `"abc123".match(/\d+/)`       | `["123"]`       |
// |                       | `matchAll(regex)`            | All matches (iterator)          | `[..."a1b2".matchAll(/\d/g)]` | `[["1"],["2"]]` |
// | **Conversion**        | `String(value)`              | Convert to string               | `String(123)`                 | `"123"`         |
// |                       | `toString()`                 | Convert number to string        | `(123).toString()`            | `"123"`         |
// |                       | `Number(str)`                | Convert string to number        | `Number("123")`               | `123`           |
// |                       | `parseInt(str)`              | Convert string to integer       | `parseInt("123.45")`          | `123`           |
// |                       | `parseFloat(str)`            | Convert string to float         | `parseFloat("123.45")`        | `123.45`        |
// | **Template Literals** | ``                           | Multi-line + expressions        | `` `Hello ${name}` ``         | `"Hello John"`  |





// ✅ Quick Tips

// Strings are immutable → all methods return new strings.

// Use slice for negative indexing; substring does not accept negative.

// replace replaces only the first occurrence; replaceAll replaces all.

// Template literals are modern and interview favorite for multi-line and interpolation.













// Tricky String Questions in JavaScript

// String vs String Object Comparison

// let a = "hello";
// let b = new String("hello");
// console.log(a == b);  // true
// console.log(a === b); // false


// == does type coercion, so primitive string and object string are equal.

// === checks type too, so they are not strictly equal.

// String Immutability

// let str = "hello";
// str[0] = "H";
// console.log(str); // "hello"


// Strings cannot be modified in-place. Any "modification" creates a new string.

// Type Coercion with + and -

// console.log("5" + 1); // "51"
// console.log("5" - 1); // 4


// + concatenates if one operand is a string.

// - converts string to number if possible.

// String split Tricky Case

// console.log("abc".split(""));     // ["a", "b", "c"]
// console.log("abc".split("b"));    // ["a", "c"]
// console.log("abc".split());       // ["abc"]
// console.log("abc".split("", 2));  // ["a", "b"]


// split behaves differently based on separator and limit.

// Template Literals with Expressions

// let a = 5, b = 10;
// console.log(`${a} + ${b} = ${a + b}`); // "5 + 10 = 15"


// Everything inside ${} is evaluated, not treated as string.

// Trimming Spaces

// let str = "  hello  ";
// console.log(str.trimStart()); // "hello  "
// console.log(str.trimEnd());   // "  hello"


// .trimStart() and .trimEnd() trim only one side.

// String indexOf vs includes

// let str = "hello world";
// console.log(str.indexOf("o"));      // 4
// console.log(str.includes("o"));     // true
// console.log(str.indexOf("x"));      // -1
// console.log(str.includes("x"));     // false


// .indexOf returns index or -1, .includes returns boolean.

// String slice vs substring

// let str = "hello";
// console.log(str.slice(1, 4));     // "ell"
// console.log(str.substring(1, 4)); // "ell"
// console.log(str.slice(-3));       // "llo"
// console.log(str.substring(-3));   // "hello" (- treated as 0)


// slice supports negative indices; substring does not.

// charAt vs [] Access

// let str = "hello";
// console.log(str.charAt(1)); // "e"
// console.log(str[1]);        // "e"
// console.log(str[10]);       // undefined
// console.log(str.charAt(10));// ""


// charAt returns empty string if out of bounds, [] returns undefined.

// Tricky Palindrome Check (Case & Spaces)

// let s = "A man a plan a canal Panama";
// let formatted = s.replace(/\s+/g, "").toLowerCase();
// let isPalindrome = formatted === formatted.split("").reverse().join("");
// console.log(isPalindrome); // true


// You need normalize the string before checking palindrome.

// String repeat Edge Case

// console.log("abc".repeat(0));   // ""
// console.log("abc".repeat(2));   // "abcabc"
// console.log("abc".repeat(-1));  // RangeError


// Negative repeat values throw an error.

// Empty String Checks

// let str = "";
// console.log(str == false);  // true
// console.log(str === false); // false


// Empty string is falsy, but type matters with ===.
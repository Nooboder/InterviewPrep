// count words in a sentence

function countWords(sentence) {
  let count = 0;
  let words = sentence.split(" ");
  for (let word of words) {
    if (word.trim() !== "") {
      count++;
    }
  }

  return count;
}

// function countWords(sentence) {
//   let count = 1;
// for(let i=0; i<sentence.length; i++) {
//   if(sentence[i] === " ") {
//     count++;
//   }
// }
// return count;
// }

const mySentence = "Hello, how are you doing today?";
const wordCount = countWords(mySentence);
console.log(`The number of words in the sentence is: ${wordCount}`); // Output: The number of words in the sentence is: 6

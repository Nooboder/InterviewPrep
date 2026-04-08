// Find Sum of digit in a number

// Input : 1234

// Output : 10

function sumOfDigits(num) {
  let sum = 0;
  while (num > 0) {
    sum += num % 10; // Add the last digit to the sum
    num = Math.floor(num / 10); // Remove the last digit
  }
  return sum; // Return the total sum of digits
}

console.log(sumOfDigits(1234)); // Output: 10

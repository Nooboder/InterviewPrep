// Input :[1,3,2,4,,1]
// Output : 3

// First Peak Element in an Array

function findPeakElement(nums) {
  for (let i = 0; i < nums.length; i++) {
    if (
      (i === 0 || nums[i] > nums[i - 1]) &&
      (i === nums.length - 1 || nums[i] > nums[i + 1])
    ) {
      return nums[i];
    }
  }
  return null; // Return null if no peak element is found
}

const input = [1, 3, 2, 4, 1];
const output = findPeakElement(input);
console.log(output); // Output: 3

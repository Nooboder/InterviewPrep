// ============================================================
// DATA STRUCTURES & ALGORITHMS - FRONTEND DEVELOPER PREP
// ============================================================

/**
 * DSA is critical for all interviews at MNC/Big4
 * Companies: PWC, Deloitte, TCS, Cognizant, Google, Meta
 * Focus: Frontend-specific problems, not pure CS
 */

// ============================================================
// 1. ARRAY PROBLEMS (Most Common)
// ============================================================

/*
Q1: Two Sum - Find two numbers that add up to target
*/
function twoSum(arr, target) {
  const seen = new Set();
  for (const num of arr) {
    if (seen.has(target - num)) {
      return [target - num, num];
    }
    seen.add(num);
  }
  return null;
}

/*
Q2: Rotate Array - Rotate array right by k steps
*/
function rotateArray(arr, k) {
  k = k % arr.length;
  if (k === 0) return arr;

  // Reverse entire array
  arr.reverse();
  // Reverse first k elements
  arr.slice(0, k).reverse();
  // Reverse remaining
  arr.slice(k).reverse();

  return arr;
}

/*
Q3: Remove Duplicates from Sorted Array
*/
function removeDuplicates(arr) {
  let j = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[j]) {
      j++;
      arr[j] = arr[i];
    }
  }
  return arr.slice(0, j + 1);
}

/*
Q4: Container With Most Water
*/
function maxArea(heights) {
  let left = 0, right = heights.length - 1;
  let maxArea = 0;

  while (left < right) {
    const width = right - left;
    const height = Math.min(heights[left], heights[right]);
    maxArea = Math.max(maxArea, width * height);

    if (heights[left] < heights[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}

/*
Q5: Merge Sorted Arrays
*/
function mergeSorted(arr1, arr2) {
  const result = [];
  let i = 0, j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i++]);
    } else {
      result.push(arr2[j++]);
    }
  }

  return [...result, ...arr1.slice(i), ...arr2.slice(j)];
}

// ============================================================
// 2. STRING PROBLEMS
// ============================================================

/*
Q6: Valid Parentheses - Check if brackets are balanced
*/
function isValidParentheses(s) {
  const stack = [];
  const pairs = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if (char in pairs) {
      if (stack.pop() !== pairs[char]) return false;
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}

/*
Q7: Longest Substring Without Repeating Characters
*/
function lengthOfLongestSubstring(s) {
  const charIndex = {};
  let maxLength = 0;
  let start = 0;

  for (let i = 0; i < s.length; i++) {
    if (charIndex[s[i]] !== undefined && charIndex[s[i]] >= start) {
      start = charIndex[s[i]] + 1;
    }
    charIndex[s[i]] = i;
    maxLength = Math.max(maxLength, i - start + 1);
  }

  return maxLength;
}

/*
Q8: Reverse String
*/
function reverseString(s) {
  return s.split('').reverse().join('');
}

/*
Q9: Palindrome String
*/
function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === clean.split('').reverse().join('');
}

/*
Q10: First Unique Character
*/
function firstUniqueChar(s) {
  const charCount = {};
  for (const char of s) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  for (let i = 0; i < s.length; i++) {
    if (charCount[s[i]] === 1) return i;
  }

  return -1;
}

// ============================================================
// 3. TREE PROBLEMS
// ============================================================

/*
Q11: Binary Tree Traversal - In-order, Pre-order, Post-order
*/
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// In-order: Left, Root, Right
function inOrderTraversal(root, result = []) {
  if (!root) return result;
  inOrderTraversal(root.left, result);
  result.push(root.val);
  inOrderTraversal(root.right, result);
  return result;
}

// Pre-order: Root, Left, Right
function preOrderTraversal(root, result = []) {
  if (!root) return result;
  result.push(root.val);
  preOrderTraversal(root.left, result);
  preOrderTraversal(root.right, result);
  return result;
}

// Level-order (BFS)
function levelOrderTraversal(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length) {
    const node = queue.shift();
    result.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return result;
}

/*
Q12: Maximum Depth of Binary Tree
*/
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

/*
Q13: Is Balanced Binary Tree
*/
function isBalanced(root) {
  if (!root) return true;

  const getHeight = (node) => {
    if (!node) return 0;
    const left = getHeight(node.left);
    const right = getHeight(node.right);

    if (left === -1 || right === -1 || Math.abs(left - right) > 1) {
      return -1;
    }

    return 1 + Math.max(left, right);
  };

  return getHeight(root) !== -1;
}

/*
Q14: Lowest Common Ancestor
*/
function lowestCommonAncestor(root, p, q) {
  if (!root) return null;
  if (root.val === p.val || root.val === q.val) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) return root;
  return left || right;
}

/*
Q15: Serialize & Deserialize Binary Tree
*/
function serialize(root) {
  const result = [];

  function dfs(node) {
    if (!node) {
      result.push('null');
      return;
    }
    result.push(node.val);
    dfs(node.left);
    dfs(node.right);
  }

  dfs(root);
  return result.join(',');
}

function deserialize(data) {
  const values = data.split(',');
  let index = 0;

  function dfs() {
    if (values[index] === 'null') {
      index++;
      return null;
    }

    const node = new TreeNode(parseInt(values[index]));
    index++;
    node.left = dfs();
    node.right = dfs();
    return node;
  }

  return dfs();
}

// ============================================================
// 4. SORTING & SEARCHING
// ============================================================

/*
Q16: Binary Search
*/
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

/*
Q17: Search in Rotated Sorted Array
*/
function searchRotated(arr, target) {
  let left = 0, right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;

    // Determine which half is sorted
    if (arr[left] <= arr[mid]) {
      // Left half is sorted
      if (target >= arr[left] && target < arr[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (target > arr[mid] && target <= arr[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}

/*
Q18: Merge Sort - Stable sorting algorithm
*/
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}

/*
Q19: Quick Sort
*/
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[0];
  const left = arr.slice(1).filter(x => x < pivot);
  const right = arr.slice(1).filter(x => x >= pivot);

  return [...quickSort(left), pivot, ...quickSort(right)];
}

/*
Q20: Find Median in Data Stream (Using Heaps - Conceptual)
*/
class MedianFinder {
  constructor() {
    this.small = []; // Max heap (negate values)
    this.large = []; // Min heap
  }

  addNum(num) {
    // Add to max heap (small)
    if (this.small.length === 0 || num <= -this.small[0]) {
      this.small.push(-num);
    } else {
      this.large.push(num);
    }

    // Balance
    if (this.small.length > this.large.length + 1) {
      this.large.push(-this.small.shift());
    }
    if (this.large.length > this.small.length) {
      this.small.push(-this.large.shift());
    }
  }

  findMedian() {
    if (this.small.length > this.large.length) {
      return -this.small[0];
    }
    return (-this.small[0] + this.large[0]) / 2;
  }
}

// ============================================================
// INTERVIEW TIPS FOR DSA
// ============================================================

/*
TCS/Cognizant/PWC Level (Easy-Medium):
- Two Sum, Reverse Array, Valid Parentheses
- Longest Substring, Merge Sorted, Binary Search
- Tree Traversal, Balanced Tree, Median Finder

Deloitte Level (Medium):
- All above plus
- Rotated Array Search, Lowest Common Ancestor
- Serialize Tree, Quick Sort variations

Big4 Level (Medium-Hard):
- All above plus complex variations
- Combine concepts
- Optimize for space/time
- Explain trade-offs

KEY TIPS:
1. Understand problem completely
2. Start with brute force
3. Optimize step by step
4. Write clean code
5. Test with examples
6. Discuss complexity (Time & Space)
7. Ask clarifying questions
*/

export const DSA_TOPICS = {
  ARRAYS: [1, 2, 3, 4, 5],
  STRINGS: [6, 7, 8, 9, 10],
  TREES: [11, 12, 13, 14, 15],
  SORTING_SEARCHING: [16, 17, 18, 19, 20],
};

let nums = [2, 7, 11, 15];
let target = 18;

let map = {};

for (let i = 0; i < nums.length; i++) {
  let complement = target - nums[i];
  if (map[complement] !== undefined) {
    console.log([map[complement], i]);
    break;
  }
  map[nums[i]] = i;
}

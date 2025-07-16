let name = 'JS';
name[1] = 'Q';

console.log(name); // Output: JS    


//✋✋ Explaination:
// here we are trying to change the second character of the string 'JS' to 'Q'. However, 🤖strings in JavaScript are immutable🤖, meaning that their characters cannot be changed directly. When we attempt to assign a new value to `name[1]`, it does not affect the original string. Therefore, when we log `name`, it still outputs 'JS'. This demonstrates that while we can read characters from a string, we cannot modify them directly. Instead, we would need to create a new string if we wanted to change its content.✋✋
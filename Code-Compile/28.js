// 28. Filter Method.


const users = [
    { id: 1, name: 'Alice', age: 28, city: 'New York' },
    { id: 2, name: 'Bob', age: 34, city: 'Los Angeles' },
    { id: 3, name: 'Charlie', age: 22, city: 'Chicago' },
    { id: 4, name: 'David', age: 17, city: 'New York' },
    { id: 5, name: 'Eve', age: 30, city: 'Los Angeles' }
]

const adults = users.filter(user => user.age > 18).map(user => user.name);

console.log(adults);
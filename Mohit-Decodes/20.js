// Group array items by Property

const users = [
  { name: "sapta", city: "WestBengal" },
  { name: "Amit", city: "Delhi" },
  { name: "Mohit", city: "Mumbai" },
];

const res = users.reduce((acc, user) => {
  (acc[user.city] = acc[user.city] || []).push(user);
  return acc;
}, {});

console.log(res);

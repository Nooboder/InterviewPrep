// convert array to object  by ID

const users = [
  {
    id: 1,
    name: "Sapta",
  },
  {
    id: 2,
    name: "Singha",
  },
];

const res = {};

for (let u of users) {
  res[u.id] = u;
}

console.log(res);

// 🔥 MODERN ES6 WAY — Object.fromEntries()
const usersById = Object.fromEntries(users.map((user) => [user.id, user]));

console.log(usersById);

// 🔥 BEST & MOST USED WAY — reduce()
const usersById2 = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});

console.log(usersById2);

// Array of Objects -> Single Array

const arr = [
  { id: 1, name: "Sapta" },
  { id: 2, name: "Amit" },
];

const res = arr.reduce((acc, item) => {
  acc[item.id] = item.name;
  return acc;
}, {});

console.log(res);

//Prevent object Mutation (freeze, seal)

const obj = {
  name: "Sapta",
};

Object.freeze(obj);
obj.name = "SINGHA";
obj.age = 25;
delete obj.name;

console.log(obj);

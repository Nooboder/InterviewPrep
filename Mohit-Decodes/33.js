const user = {
  profile: {
    name: "Sapta",
  },
};

// console.log(user.profile.address.city); // ❌ TypeError

console.log(user.profile?.address?.city);

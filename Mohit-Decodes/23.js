// Create private variable without class

// Closures

const AuthModule = (function () {
  let isLoggedIn = false; // private

  function login() {
    isLoggedIn = true;
  }

  function logout() {
    isLoggedIn = false;
  }

  function status() {
    return isLoggedIn;
  }

  return {
    login,
    logout,
    status,
  };
})();

AuthModule.login();
console.log(AuthModule.status()); // true

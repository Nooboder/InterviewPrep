// 40. refractor the code 


function fetchRole(roleID) {
    switch (roleID) {
        case 1:
            return 'Admin';
        case 2:
            return 'User';
        case 3:
            return 'Guest';
        default:
            return 'Unknown';
    }
}

console.log(fetchRole(1)); // Admin
console.log(fetchRole(2)); // User
console.log(fetchRole(3)); // Guest
console.log(fetchRole(4)); // Unknown



// REFACTOR **************

function fetchRole(roleID) {
    const createRoleObj = {
        1: 'Admin',
        2: 'User',
        3: 'Guest'
    }
    return createRoleObj[roleID] ?? 'Unknown';
}


console.log(fetchRole(1)); // Admin
console.log(fetchRole(2)); // User
console.log(fetchRole(3)); // Guest
console.log(fetchRole(4)); // Unknown
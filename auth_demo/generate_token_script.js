const jwt = require('jsonwebtoken');
const fs = require('fs'); // File System module to save files

const SECRET_KEY = 'my_super_secret_key_shhh'; 

const userData = {
    id: 123,
    username: "john_doe",
    role: "admin"
};

console.log("Generating Token...");
const token = jwt.sign(userData, SECRET_KEY, { expiresIn: '2h' });

// --- STORE THE TOKEN ---
// Hum token ko ek file 'my_token.txt' mein save kar rahe hain
// Real life mein ye Frontend (Browser) ke LocalStorage mein save hota hai
fs.writeFileSync('my_token.txt', token);

console.log("\n✅ Token Generated and SAVED to 'my_token.txt'");
console.log("Check the file 'my_token.txt' in your folder to see it.");

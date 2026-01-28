const jwt = require('jsonwebtoken');

// 1. Define Secret Keys
// In a real app, these should be in environment variables (process.env.ACCESS_TOKEN_SECRET)
const ACCESS_TOKEN_SECRET = 'your_access_token_secret_key_123';
const REFRESH_TOKEN_SECRET = 'your_refresh_token_secret_key_456';

// 2. Mock User Data (Payload)
const user = {
    id: '12345',
    username: 'learning_user',
    role: 'admin'
};

// 3. Function to Generate Access Token (Short-lived, e.g., 15 minutes)
function generateAccessToken(userPayload) {
    // payload: data you want to store in token
    // secret: key used to sign the token
    // options: expiresIn
    return jwt.sign(userPayload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

// 4. Function to Generate Refresh Token (Long-lived, e.g., 7 days)
function generateRefreshToken(userPayload) {
    return jwt.sign(userPayload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

// --- execution ---

console.log('--- Generating JWT Tokens ---');

// Generate Tokens
const accessToken = generateAccessToken(user);
const refreshToken = generateRefreshToken(user);

console.log('\n1. Access Token (JWT):');
console.log(accessToken);

console.log('\n2. Refresh Token (JWT):');
console.log(refreshToken);

console.log('\n3. Bearer Token Format (for Authorization header):');
console.log(`Authorization: Bearer ${accessToken}`);


// --- Verification Example (How server checks it) ---
console.log('\n--- Verifying Access Token ---');
try {
    const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    console.log('Token is Valid! Decoded Payload:', decoded);
} catch (err) {
    console.log('Invalid Token:', err.message);
}

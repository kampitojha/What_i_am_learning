const jwt = require('jsonwebtoken');
require('dotenv').config();

// Ye ek "Guard" function hai jo har request ko check karega
module.exports = function (req, res, next) {
    // 1. Header se token nikalo
    const token = req.header('auth-token');

    // 2. Check karo agar token hi nahi hai
    if (!token) {
        return res.status(401).send('Access Denied! Token hi nahi hai bhai.');
    }

    try {
        // 3. Token ko verify karo (Secret key ke sath)
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        
        // 4. Agla function chalne do (Request aage badhao)
        next();
    } catch (err) {
        res.status(400).send('Invalid Token! Fake token mat bhej.');
    }
};

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const PORT = 3000;
const SECRET_KEY = 'my_super_secret_key_shhh'; // In real app, put this in .env

// 1. Mock Database (Users)
const users = [
    {
        id: 1,
        username: 'john_doe',
        password: 'password123', // In real app, passwords must be HASHED (e.g., bcrypt)
        role: 'user'
    },
    {
        id: 2,
        username: 'admin_jane',
        password: 'adminpassword',
        role: 'admin'
    }
];

// 2. Authentication Route (Login)
// "Who are you?"
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find user
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Authentication Failed: Invalid username or password' });
    }

    // Generate Token (The "Boarding Pass")
    // Payload contains non-sensitive info to identify user and their role
    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role }, 
        SECRET_KEY, 
        { expiresIn: '1h' }
    );

    res.json({
        message: 'Authentication Successful',
        token: token
    });
});

// 3. Authorization Middleware
// "Do you have permission?"
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // Format: "Bearer <token>"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Authorization Failed: No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, decodedUser) => {
        if (err) {
            return res.status(403).json({ message: 'Authorization Failed: Invalid token' });
        }
        req.user = decodedUser; // Attach user info to request
        next(); // Proceed to the next step
    });
};

// 4. Protected Route (User Profile)
// Only accessible if Logged In (Authenticated)
app.get('/profile', verifyToken, (req, res) => {
    res.json({
        message: 'Authorization Successful: You are accessing protected data.',
        user: req.user
    });
});

// 5. Protected Route (Admin Only)
// Demonstrating Role-Based Authorization
app.get('/admin', verifyToken, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Authorization Failed: You are not an Admin!' });
    }
    
    res.json({
        message: 'Welcome Admin! You have special access.',
        secretData: 'Protocol Omega Initiated'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Check 'conceptual_guide.md' to understand the logic.`);
});

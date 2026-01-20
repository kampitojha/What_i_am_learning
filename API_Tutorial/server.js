const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const verify = require('./middleware/auth');

const app = express();
dotenv.config();

// Middleware: JSON data read karne ke liye zaruri hai
app.use(express.json());

// --- ROUTES ---

// 1. Public Route (Sab dekh sakte hain)
app.get('/api/intro', (req, res) => {
    res.json({
        message: "Welcome to API Tutorial!",
        tips: "Ye public route hai, iske liye token nahi chahiye."
    });
});

// 2. Login Route (Yahan se Token milega)
app.post('/api/user/login', (req, res) => {
    const { username, password } = req.body;

    // Dummy user checking (Real app mein DB se check karenge)
    if (username === "admin" && password === "1234") {
        
        // Payload: Token mein kya data store karna hai
        const payload = {
            name: username,
            role: "coder"
        };

        // Token banate waqt Secret key aur expiry dete hain
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        res.header('auth-token', token).send({
            message: "Login Successful! Ye lo tumhara token.",
            token: token
        });

    } else {
        res.status(400).send("Invalid Credentials! Dubara try karo.");
    }
});

// 3. Protected Route (Sirf Token wale allow hain)
// Hum yahan 'verify' middleware pass kar rahe hain
app.get('/api/posts', verify, (req, res) => {
    res.json({
        posts: {
            title: "My First Secret Post",
            content: "Ye data sirf token hone pe hi dikh raha hai!",
            user: req.user // Ye data middleware ne token decode karke dala hai
        }
    });
});

// 4. Shop Categories Endpoint (Jo image aapne dikhayi)
const spicesData = require('./spices_data.json');

app.get('/api/categories/spices', (req, res) => {
    // Real User Scenario: 
    // Frontend request karta hai: "Mujhe Spices tab ka data do"
    
    // Backend logic:
    // 1. Database se check karo ki 'Spices' category mein kya kya hai.
    // 2. Unka count nikalo.
    // 3. Response JSON bana ke bhej do.

    res.json({
        success: true,
        message: "Categories fetched successfully",
        totalCategories: spicesData.length,
        timestamp: new Date().toISOString(),
        data: spicesData
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Bhai Server chal raha hai at http://localhost:${PORT}`));

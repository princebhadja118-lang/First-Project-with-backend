const User = require('../models/User');
const express = require('express');
const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const { userName, email, pass } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { username: userName }]
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Email or username already exists' });
        }

        await User.create({
            username: userName,
            email,
            password: pass
        });

        res.status(201).json({
            message: 'User created successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, pass } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }

        if (existingUser.password !== pass) {
            return res.status(400).json({ message: "Wrong password" });
        }

        res.json({
            success: true,
            message: "Login Successfully",
            user: existingUser
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
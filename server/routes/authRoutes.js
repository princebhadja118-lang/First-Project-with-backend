const User = require('../models/User');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware')


// REGISTER
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Email or username already exists' });
        }

        const user = await User.create({
            username,
            email,
            password
        });

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }

        if (existingUser.password !== password) {
            return res.status(400).json({ message: "Wrong password" });
        }

        const token = jwt.sign(
            { id: existingUser._id, role: existingUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            success: true,
            message: "Login Successfully",
            token,
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                role: existingUser.role
            }

        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put('/admin/update/:id', authMiddleware, async (req, res) => {
    try {

        if (req.user.id !== req.params.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "You are not authorized to update this user" })
        }
        const { username, email, password } = req.body;
        const updateuser = await User.findByIdAndUpdate(
            req.params.id,
            { username, email, password },
            { new: true }
        );
        if (!updateuser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            message: "User updated successfully",
            user: {
                id: updateuser._id,
                username: updateuser.username,
                email: updateuser.email,
                role: updateuser.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
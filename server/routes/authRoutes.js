const User = require('../models/User');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


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

module.exports = router;





// // ================= REGISTER =================
// router.post('/register', async (req, res) => {
//     try {
//         const { username, email, pass } = req.body;

//         // Check existing user
//         const existingUser = await User.findOne({
//             $or: [{ email }, { username: username }]
//         });

//         if (existingUser) {
//             return res.status(400).json({
//                 message: "Email or username already exists"
//             });
//         }

//         // Create user (NO HASH)
//         const user = await User.create({
//             username: username,
//             email: email,
//             password: pass
//         });

//         // Create JWT token
//         const token = jwt.sign(
//             { id: user._id, role: user.role },
//             process.env.JWT_SECRET,
//             { expiresIn: "1d" }
//         );

//         res.status(201).json({
//             message: "User registered successfully",
//             token,
//             user: {
//                 id: user._id,
//                 username: user.username,
//                 email: user.email,
//                 role: user.role
//             }
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });


// // ================= LOGIN =================
// router.post('/login', async (req, res) => {
//     try {
//         const { email, pass } = req.body;

//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(400).json({
//                 message: "User not found"
//             });
//         }

//         // Plain password compare
//         if (user.password !== pass) {
//             return res.status(400).json({
//                 message: "Wrong password"
//             });
//         }

//         const token = jwt.sign(
//             { id: user._id, role: user.role },
//             process.env.JWT_SECRET,
//             { expiresIn: "1d" }
//         );

//         res.json({
//             success: true,
//             token,
//             user: {
//                 id: user._id,
//                 username: user.username,
//                 email: user.email,
//                 role: user.role
//             }
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Internal server error"
//         });
//     }
// });

// module.exports = router;
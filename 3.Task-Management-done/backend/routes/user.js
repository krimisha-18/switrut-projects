const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


router.post("/sign-in", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (username.length < 4) {
            return res
                .status(400)
                .json({ message: "Username should have at least 4 characters" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error in /sign-in:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


router.post("/log-in", async (req, res) => {
    const { username, password } = req.body;
    const existinUser = await User.findOne({ username });
    if (!existinUser) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    bcrypt.compare(password, existinUser.password, (err, data) => {
        if (data) {
            const authClaims = [{ name: username }, { jti: jwt.sign({}, "tcmTM") }];
            const token = jwt.sign({ authClaims }, "tcmTm", { expiresIn: "2d" });
            res.status(200).json({ id: existinUser._id, token: token });
        } else {
            return res.status(400).json({ message: "Invalid credentials " });
        }
    })
})


module.exports = router;
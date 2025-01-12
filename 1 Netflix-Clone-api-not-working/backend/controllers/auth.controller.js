import { User } from "../models/user.model.js"; 
// Import the User model to work with the database.

import bcryptjs from "bcryptjs"; 
// Import bcryptjs to handle password security (hashing and checking).

import { generateTokenAndSetCookie } from "../utils/generateToken.js"; 
// Import a function to create a token and set it in a cookie.

// Function for signing up a new user.
export async function signup(req, res) {
    try {
        const { email, password, username } = req.body; 
        // Get email, password, and username from the request.

        if (!email || !password || !username) {
            // If any field is missing, return an error.
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        // Check if the email is valid.

        if (!emailRegex.test(email)) {
            // If email is invalid, return an error.
            return res.status(400).json({ success: false, message: "Invalid email" });
        }

        if (password.length < 6) {
            // If the password is too short, return an error.
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }

        const existingUserByEmail = await User.findOne({ email }); 
        // Check if the email is already registered.

        if (existingUserByEmail) {
            // If email exists, return an error.
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const existingUserByUsername = await User.findOne({ username }); 
        // Check if the username is already taken.

        if (existingUserByUsername) {
            // If username exists, return an error.
            return res.status(400).json({ success: false, message: "Username already exists" });
        }

        const salt = await bcryptjs.genSalt(10); 
        // Create a salt for hashing the password.

        const hashedPassword = await bcryptjs.hash(password, salt); 
        // Hash the password.

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"]; 
        // List of default profile pictures.

        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]; 
        // Randomly pick a profile picture.

        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image,
        }); 
        // Create a new user object.

        generateTokenAndSetCookie(newUser._id, res); 
        // Generate a token and set it in a cookie.

        await newUser.save(); 
        // Save the new user in the database.

        res.status(201).json({
            success: true,
            user: { ...newUser._doc, password: "" }, 
            // Respond with the new user's data (hide the password).
        });
    } catch (error) {
        console.log("Error in signup:", error.message); 
        // Log any errors.

        res.status(500).json({ success: false, message: "Internal server error" }); 
        // Return a server error response.
    }
}

// Function for logging in an existing user.
export async function login(req, res) {
    try {
        const { email, password } = req.body; 
        // Get email and password from the request.

        if (!email || !password) {
            // If any field is missing, return an error.
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await User.findOne({ email }); 
        // Find the user by email.

        if (!user) {
            // If user is not found, return an error.
            return res.status(404).json({ success: false, message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password); 
        // Check if the password is correct.

        if (!isPasswordCorrect) {
            // If the password is wrong, return an error.
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        generateTokenAndSetCookie(user._id, res); 
        // Generate a token and set it in a cookie.

        res.status(200).json({
            success: true,
            user: { ...user._doc, password: "" }, 
            // Respond with the user's data (hide the password).
        });
    } catch (error) {
        console.log("Error in login:", error.message); 
        // Log any errors.

        res.status(500).json({ success: false, message: "Internal server error" }); 
        // Return a server error response.
    }
}

// Function for logging out a user.
export async function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix"); 
        // Clear the login cookie.

        res.status(200).json({ success: true, message: "Logged out successfully" }); 
        // Respond with a success message.
    } catch (error) {
        console.log("Error in logout:", error.message); 
        // Log any errors.

        res.status(500).json({ success: false, message: "Internal server error" }); 
        // Return a server error response.
    }
}

// Function to check if the user is authenticated.
export async function authCheck(req, res) {
    try {
        console.log("Authenticated user:", req.user); 
        // Log the authenticated user data.

        res.status(200).json({ success: true, user: req.user }); 
        // Respond with the user data.
    } catch (error) {
        console.log("Error in authCheck:", error.message); 
        // Log any errors.

        res.status(500).json({ success: false, message: "Internal server error" }); 
        // Return a server error response.
    }
}

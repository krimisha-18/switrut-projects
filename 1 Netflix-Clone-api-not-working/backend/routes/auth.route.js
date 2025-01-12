import express from "express"; // Import Express to create routes.
import { authCheck, login, logout, signup } from "../controllers/auth.controller.js"; // Import functions from the controller.
import { protectRoute } from "../middleware/protectRoute.js"; // Import middleware to protect routes.

const router = express.Router(); // Create a new Express router.

router.post("/signup", signup); // Route to handle user signup.
router.post("/login", login); // Route to handle user login.
router.post("/logout", logout); // Route to handle user logout.

router.get("/authCheck", protectRoute, authCheck); // Route to check if a user is authenticated, protected by middleware.

export default router; // Export the router.

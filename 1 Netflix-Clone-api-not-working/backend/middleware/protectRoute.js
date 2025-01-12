import jwt from "jsonwebtoken"; // Import JWT for token handling.
import { User } from "../models/user.model.js"; // Import User model to fetch user data.
import { ENV_VARS } from "../config/envVars.js"; // Import environment variables.

export const protectRoute = async (req, res, next) => {
	try {
		// Get the token from cookies.
		const token = req.cookies["jwt-netflix"];

		// If no token is found, respond with "Unauthorized".
		if (!token) {
			return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
		}

		// Verify the token using the secret key.
		const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

		// If the token is invalid, respond with "Unauthorized".
		if (!decoded) {
			return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
		}

		// Find the user by ID stored in the token and exclude the password field.
		const user = await User.findById(decoded.userId).select("-password");

		// If no user is found, respond with "User not found".
		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		// Attach the user data to the request object for use in other routes.
		req.user = user;

		// Proceed to the next middleware or route.
		next();
	} catch (error) {
		// Log errors and respond with "Internal Server Error".
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

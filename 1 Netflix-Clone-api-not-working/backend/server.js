import express from "express"; // Import Express framework
import cookieParser from "cookie-parser"; // Import cookie parser to handle cookies
import path from "path"; // Import path module to handle file paths

import authRoutes from "./routes/auth.route.js"; // Import authentication routes
import movieRoutes from "./routes/movie.route.js"; // Import movie routes
import tvRoutes from "./routes/tv.route.js"; // Import TV routes
import searchRoutes from "./routes/search.route.js"; // Import search routes

import { ENV_VARS } from "./config/envVars.js"; // Import environment variables
import { connectDB } from "./config/db.js"; // Import database connection
import { protectRoute } from "./middleware/protectRoute.js"; // Import middleware to protect certain routes

const app = express(); // Create an Express app

const PORT = ENV_VARS.PORT; // Set the port from environment variables
const __dirname = path.resolve(); // Get the directory path of the current file

app.use(express.json()); // Enable Express to parse JSON data in requests
app.use(cookieParser()); // Enable cookie parsing to handle cookies

// Define routes
app.use("/api/v1/auth", authRoutes); // Authentication routes
app.use("/api/v1/movie", protectRoute, movieRoutes); // Movie routes (protected by middleware)
app.use("/api/v1/tv", protectRoute, tvRoutes); // TV routes (protected by middleware)
app.use("/api/v1/search", protectRoute, searchRoutes); // Search routes (protected by middleware)

// If the app is running in production, serve the frontend static files
if (ENV_VARS.NODE_ENV === "production") {
	// Serve static files from the 'frontend/dist' folder
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	// Handle any other requests and send the main HTML file
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// Start the server and connect to the database
app.listen(PORT, () => {
	console.log("Server started at http://localhost:" + PORT); // Log server start
	connectDB(); // Connect to the database
});

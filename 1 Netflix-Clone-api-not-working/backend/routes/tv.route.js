import express from "express"; // Import Express to create routes.
import { 
    getSimilarTvs, // Function to get similar TV shows.
    getTrendingTv, // Function to get trending TV shows.
    getTvDetails, // Function to get details of a specific TV show.
    getTvsByCategory, // Function to get TV shows by category.
    getTvTrailers, // Function to get trailers for a specific TV show.
} from "../controllers/tv.controller.js"; // Import all TV-related functions from the controller.

const router = express.Router(); // Create a new Express router.

// Define routes for TV operations:
router.get("/trending", getTrendingTv); // Route to get trending TV shows.
router.get("/:id/trailers", getTvTrailers); // Route to get trailers for a TV show by its ID.
router.get("/:id/details", getTvDetails); // Route to get details of a TV show by its ID.
router.get("/:id/similar", getSimilarTvs); // Route to get similar TV shows based on the TV show's ID.
router.get("/:category", getTvsByCategory); // Route to get TV shows by a specific category (like popular, top-rated, etc.).

export default router; // Export the router to be used in other parts of the application.

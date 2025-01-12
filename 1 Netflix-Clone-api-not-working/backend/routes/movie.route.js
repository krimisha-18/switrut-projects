import express from "express"; // Import Express to create routes.
import { 
	getMovieDetails, // Function to get details of a specific movie.
	getMoviesByCategory, // Function to get movies based on category.
	getMovieTrailers, // Function to get movie trailers.
	getSimilarMovies, // Function to get movies similar to a given one.
	getTrendingMovie, // Function to get trending movies.
} from "../controllers/movie.controller.js"; // Import all movie-related functions from the controller.

const router = express.Router(); // Create a new Express router.

// Define routes for movie operations:
router.get("/trending", getTrendingMovie); // Route to get trending movies.
router.get("/:id/trailers", getMovieTrailers); // Route to get trailers of a specific movie by its ID.
router.get("/:id/details", getMovieDetails); // Route to get details of a specific movie by its ID.
router.get("/:id/similar", getSimilarMovies); // Route to get movies similar to a specific movie by its ID.
router.get("/:category", getMoviesByCategory); // Route to get movies by category (e.g., popular, top-rated).

export default router; // Export the router to be used in other parts of the application.

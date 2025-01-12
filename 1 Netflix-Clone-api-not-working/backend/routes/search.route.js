import express from "express"; // Import Express to create routes.
import { 
    getSearchHistory, // Function to get search history.
    removeItemFromSearchHistory, // Function to remove an item from search history.
    searchMovie, // Function to search for movies.
    searchPerson, // Function to search for people (actors/directors).
    searchTv, // Function to search for TV shows.
} from "../controllers/search.controller.js"; // Import all search-related functions from the controller.

const router = express.Router(); // Create a new Express router.

// Define routes for search operations:
router.get("/person/:query", searchPerson); // Route to search for a person (actor/director) by query.
router.get("/movie/:query", searchMovie); // Route to search for a movie by query.
router.get("/tv/:query", searchTv); // Route to search for a TV show by query.

router.get("/history", getSearchHistory); // Route to get the search history.

router.delete("/history/:id", removeItemFromSearchHistory); // Route to remove an item from the search history by ID.

export default router; // Export the router to be used in other parts of the application.

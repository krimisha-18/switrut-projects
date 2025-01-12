import { User } from "../models/user.model.js"; // Import the User model.
import { fetchFromTMDB } from "../services/tmdb.service.js"; // Import a function to make requests to TMDB API.

// Search for a person (actor/actress) in TMDB.
export async function searchPerson(req, res) {
    const { query } = req.params; // Get the search query from the URL.
    try {
        // Fetch results from TMDB for a person search.
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
        );

        // If no results are found, send a 404 response.
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }

        // Save the first result in the user's search history.
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id, // TMDB person ID.
                    image: response.results[0].profile_path, // Person's image.
                    title: response.results[0].name, // Person's name.
                    searchType: "person", // Type of search (person).
                    createdAt: new Date(), // Timestamp of the search.
                },
            },
        });

        // Send the search results as a response.
        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        // Handle errors and send an error response.
        console.log("Error in searchPerson controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Search for a movie in TMDB.
export async function searchMovie(req, res) {
    const { query } = req.params; // Get the search query from the URL.

    try {
        // Fetch results from TMDB for a movie search.
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
        );

        // If no results are found, send a 404 response.
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }

        // Save the first result in the user's search history.
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id, // TMDB movie ID.
                    image: response.results[0].poster_path, // Movie poster image.
                    title: response.results[0].title, // Movie title.
                    searchType: "movie", // Type of search (movie).
                    createdAt: new Date(), // Timestamp of the search.
                },
            },
        });

        // Send the search results as a response.
        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        // Handle errors and send an error response.
        console.log("Error in searchMovie controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Search for a TV show in TMDB.
export async function searchTv(req, res) {
    const { query } = req.params; // Get the search query from the URL.

    try {
        // Fetch results from TMDB for a TV show search.
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
        );

        // If no results are found, send a 404 response.
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }

        // Save the first result in the user's search history.
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id, // TMDB TV show ID.
                    image: response.results[0].poster_path, // TV show poster image.
                    title: response.results[0].name, // TV show name.
                    searchType: "tv", // Type of search (TV show).
                    createdAt: new Date(), // Timestamp of the search.
                },
            },
        });

        // Send the search results as a response.
        res.json({ success: true, content: response.results });
    } catch (error) {
        // Handle errors and send an error response.
        console.log("Error in searchTv controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Get the user's search history.
export async function getSearchHistory(req, res) {
    try {
        // Send the user's search history as a response.
        res.status(200).json({ success: true, content: req.user.searchHistory });
    } catch (error) {
        // Handle errors and send an error response.
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Remove a specific item from the user's search history.
export async function removeItemFromSearchHistory(req, res) {
    let { id } = req.params; // Get the item ID to remove from the URL.

    id = parseInt(id); // Convert the ID to a number.

    try {
        // Remove the item with the given ID from the user's search history.
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: id },
            },
        });

        // Send a success response.
        res.status(200).json({ success: true, message: "Item removed from search history" });
    } catch (error) {
        // Handle errors and send an error response.
        console.log("Error in removeItemFromSearchHistory controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

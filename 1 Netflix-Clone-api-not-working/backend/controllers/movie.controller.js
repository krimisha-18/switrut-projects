import { fetchFromTMDB } from "../services/tmdb.service.js";
// Import a function to make requests to the TMDB API.

// Function to get a trending movie.
export async function getTrendingMovie(req, res) {
    try {
        // Fetch trending movies from TMDB.
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        
        // Pick a random movie from the results.
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        
        // Send the random movie as the response.
        res.json({ success: true, content: randomMovie });
    } catch (error) {
        // If something goes wrong, send an error response.
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Function to get trailers for a specific movie.
export async function getMovieTrailers(req, res) {
    const { id } = req.params; // Get the movie ID from the URL.
    try {
        // Fetch trailers for the movie from TMDB.
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        
        // Send the trailers as the response.
        res.json({ success: true, trailers: data.results });
    } catch (error) {
        // If the movie is not found, send a 404 error.
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        
        // If something else goes wrong, send a server error.
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Function to get details for a specific movie.
export async function getMovieDetails(req, res) {
    const { id } = req.params; // Get the movie ID from the URL.
    try {
        // Fetch movie details from TMDB.
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        
        // Send the movie details as the response.
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        // If the movie is not found, send a 404 error.
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        
        // If something else goes wrong, send a server error.
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Function to get movies similar to a specific movie.
export async function getSimilarMovies(req, res) {
    const { id } = req.params; // Get the movie ID from the URL.
    try {
        // Fetch similar movies from TMDB.
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        
        // Send the similar movies as the response.
        res.status(200).json({ success: true, similar: data.results });
    } catch (error) {
        // If something goes wrong, send an error response.
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Function to get movies by category (like popular, upcoming, etc.).
export async function getMoviesByCategory(req, res) {
    const { category } = req.params; // Get the category from the URL.
    try {
        // Fetch movies in the category from TMDB.
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        
        // Send the movies in the category as the response.
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        // If something goes wrong, send an error response.
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

import { fetchFromTMDB } from "../services/tmdb.service.js"; // Import the helper function to fetch data from TMDB.

// Get a trending TV show.
export async function getTrendingTv(req, res) {
    try {
        // Fetch trending TV shows for the day.
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        // Pick a random TV show from the results.
        const randomTv = data.results[Math.floor(Math.random() * data.results?.length)];

        // Send the random TV show as a response.
        res.json({ success: true, content: randomTv });
    } catch (error) {
        // Handle errors and send an error response.
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Get trailers for a specific TV show.
export async function getTvTrailers(req, res) {
    const { id } = req.params; // Get the TV show ID from the URL.
    try {
        // Fetch trailers for the given TV show ID.
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);

        // Send the trailers as a response.
        res.json({ success: true, trailers: data.results });
    } catch (error) {
        // If the TV show is not found, send a 404 response.
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }

        // Handle other errors and send an error response.
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Get details about a specific TV show.
export async function getTvDetails(req, res) {
    const { id } = req.params; // Get the TV show ID from the URL.
    try {
        // Fetch details for the given TV show ID.
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);

        // Send the TV show details as a response.
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        // If the TV show is not found, send a 404 response.
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }

        // Handle other errors and send an error response.
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Get similar TV shows to a specific TV show.
export async function getSimilarTvs(req, res) {
    const { id } = req.params; // Get the TV show ID from the URL.
    try {
        // Fetch similar TV shows for the given TV show ID.
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);

        // Send the similar TV shows as a response.
        res.status(200).json({ success: true, similar: data.results });
    } catch (error) {
        // Handle errors and send an error response.
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Get TV shows by category (e.g., popular, top-rated).
export async function getTvsByCategory(req, res) {
    const { category } = req.params; // Get the category from the URL (e.g., "popular", "top_rated").
    try {
        // Fetch TV shows for the given category.
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);

        // Send the TV shows as a response.
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        // Handle errors and send an error response.
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

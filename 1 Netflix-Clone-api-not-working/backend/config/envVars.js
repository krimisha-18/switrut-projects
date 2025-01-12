import dotenv from "dotenv"; 
// Import the dotenv library to use `.env` files.

dotenv.config(); 
// Load the `.env` file so we can use its values.

console.log('Mongo URI:', process.env.MONGO_URI); 
// Print the MongoDB link to check if it works.

export const ENV_VARS = { 
    // Store all important settings here.

    MONGO_URI: process.env.MONGO_URI, 
    // The link to connect to MongoDB.

    PORT: process.env.PORT || 5000, 
    // The server will run on this port (use the value in `.env`, or 5000 by default).

    JWT_SECRET: process.env.JWT_SECRET, 
    // A secret key for authentication.

    NODE_ENV: process.env.NODE_ENV, 
    // Environment type (e.g., dev or production).

    TMDB_API_KEY: process.env.TMDB_API_KEY, 
    // API key for TMDB (movie database).
};

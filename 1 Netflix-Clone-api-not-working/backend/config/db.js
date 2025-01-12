import mongoose from "mongoose"; 
// Load the mongoose library to use MongoDB.

import { ENV_VARS } from "./envVars.js"; 
// Load settings (like the database link) from another file.

export const connectDB = async () => { 
    // A function to connect to the database.

    try { 
        // Try to connect to the database.
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI); 
       // Connect to the database using the link from ENV_VARS.

       console.log("MongoDB connected: " + conn.connection.host); 
       // If successful, show a message with the server name.

    } catch (error) { 
        // If something goes wrong...

        console.error("Error connecting to MongoDB: " + error.message); 
        // Show the error message.

        process.exit(1); 
        // Stop the app because the connection failed.
    }
};

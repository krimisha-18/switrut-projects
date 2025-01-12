import axios from "axios"; // Import the axios library to make HTTP requests.
import { ENV_VARS } from "../config/envVars.js"; // Import environment variables, specifically the TMDB API key.

export const fetchFromTMDB = async (url) => { // Define an asynchronous function to fetch data from TMDB.
  
  const options = { // Set up options for the HTTP request.
    headers: { // Add headers to the request.
      accept: "application/json", // Tell the server we want JSON data.
      Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY, // Add the TMDB API key for authorization.
    },
  };

  const response = await axios.get(url, options); // Make the GET request to the TMDB API with the given URL and options.

  // If the response status is not 200 (OK), throw an error.
  if (response.status !== 200) {
    throw new Error("Failed to fetch data from TMDB" + response.statusText);
  }

  return response.data; // Return the data from the response if successful.
};

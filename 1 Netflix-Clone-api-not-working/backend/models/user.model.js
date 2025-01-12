import mongoose from "mongoose"; // Import mongoose to work with MongoDB.

const userSchema = mongoose.Schema({
	// Define the schema for user data.
	username: {
		type: String, // The username should be a string.
		required: true, // The username is required.
		unique: true, // The username must be unique.
	},
	email: {
		type: String, // The email should be a string.
		required: true, // The email is required.
		unique: true, // The email must be unique.
	},
	password: {
		type: String, // The password should be a string.
		required: true, // The password is required.
	},
	image: {
		type: String, // The image should be a string (URL or file path).
		default: "", // If no image is provided, set it to an empty string by default.
	},
	searchHistory: {
		type: Array, // The search history is an array to store multiple search records.
		default: [], // If no search history is provided, set it as an empty array.
	},
});

// Create a User model based on the schema.
export const User = mongoose.model("User", userSchema);

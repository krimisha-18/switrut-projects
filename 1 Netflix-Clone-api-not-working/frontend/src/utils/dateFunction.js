// Function to format release date to a more readable format
export function formatReleaseDate(date) {
	// Converts the date to a localized string (e.g., "January 12, 2025")
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric", // Shows the year (e.g., 2025)
		month: "long",   // Shows the full month name (e.g., January)
		day: "numeric",  // Shows the day of the month (e.g., 12)
	});
}

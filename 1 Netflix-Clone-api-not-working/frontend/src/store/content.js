import { create } from "zustand"; // Import Zustand for state management

// Create the content store using Zustand
export const useContentStore = create((set) => ({
  contentType: "movie", // Default content type is set to 'movie'
  
  // Function to update the content type
  setContentType: (type) => set({ contentType: type }), // Update contentType state with the given 'type'
}));

import axios from "axios"; // Import axios for making API requests
import toast from "react-hot-toast"; // Import toast for notifications
import { create } from "zustand"; // Import Zustand for state management

// Create the auth store using Zustand
export const useAuthStore = create((set) => ({
  user: null, // Default user is null (not logged in)
  isSigningUp: false, // Flag to track if signup is in progress
  isCheckingAuth: true, // Flag to track if auth check is in progress
  isLoggingOut: false, // Flag to track if logout is in progress
  isLoggingIn: false, // Flag to track if login is in progress

  // Signup function to create a new account
  signup: async (credentials) => {
    set({ isSigningUp: true }); // Set signing up flag to true
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials); // API call for signup
      set({ user: response.data.user, isSigningUp: false }); // Set user data and reset the signing up flag
      toast.success("Account created successfully"); // Show success toast
    } catch (error) {
      toast.error(error.response.data.message || "Signup failed"); // Show error toast
      set({ isSigningUp: false, user: null }); // Reset signup flag and user data
    }
  },

  // Login function to authenticate user
  login: async (credentials) => {
    set({ isLoggingIn: true }); // Set logging in flag to true
    try {
      const response = await axios.post("/api/v1/auth/login", credentials); // API call for login
      set({ user: response.data.user, isLoggingIn: false }); // Set user data and reset the logging in flag
    } catch (error) {
      set({ isLoggingIn: false, user: null }); // Reset login flag and user data
      toast.error(error.response.data.message || "Login failed"); // Show error toast
    }
  },

  // Logout function to log the user out
  logout: async () => {
    set({ isLoggingOut: true }); // Set logging out flag to true
    try {
      await axios.post("/api/v1/auth/logout"); // API call for logout
      set({ user: null, isLoggingOut: false }); // Reset user data and logout flag
      toast.success("Logged out successfully"); // Show success toast
    } catch (error) {
      set({ isLoggingOut: false }); // Reset logout flag
      toast.error(error.response.data.message || "Logout failed"); // Show error toast
    }
  },

  // Auth check to verify if user is logged in or not
  authCheck: async () => {
    set({ isCheckingAuth: true }); // Set auth check flag to true
    try {
      const response = await axios.get("/api/v1/auth/authCheck"); // API call for auth check
      set({ user: response.data.user, isCheckingAuth: false }); // Set user data if authenticated
    } catch (error) {
      set({ isCheckingAuth: false, user: null }); // Reset auth check flag and user data if error occurs
      // Optionally show an error toast here if needed
    }
  },
}));

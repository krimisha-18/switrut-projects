import jwt from "jsonwebtoken"; // Import the JWT library to create and verify tokens.
import { ENV_VARS } from "../config/envVars.js"; // Import environment variables, especially the JWT secret.

export const generateTokenAndSetCookie = (userId, res) => { 
  // Define a function to generate a JWT token and set it as a cookie.

  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });
  // Create a JWT token with the userId and a secret, setting it to expire in 15 days.

  // Set the token as a cookie in the response.
  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Set cookie expiration time to 15 days in milliseconds.
    httpOnly: true, // This makes the cookie not accessible by JavaScript, protecting from cross-site scripting (XSS) attacks.
    sameSite: "strict", // This setting helps prevent cross-site request forgery (CSRF) attacks.
    secure: ENV_VARS.NODE_ENV !== "development", // Only use secure cookies in production environments (when using HTTPS).
  });

  return token; // Return the token.
};

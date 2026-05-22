// Centralized API configuration
// In development: reads from .env (http://localhost:5000)
// In production:  reads from .env.production (your deployed backend URL)

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

/**
 * Returns the full API endpoint URL for a given path.
 * @param {string} path - The API path, e.g. "/services" or "/service/123"
 * @returns {string} Full URL like "http://localhost:5000/services"
 */
export const getApiUrl = (path) => {
  return `${API_URL}${path}`;
};

/**
 * Returns the full URL for an uploaded image.
 * Handles both absolute URLs (external) and local upload paths.
 * @param {string} imagePath - The image path from the database
 * @returns {string} Full image URL
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return "";

  // If it's already an absolute URL, return as-is
  try {
    new URL(imagePath);
    return imagePath;
  } catch {
    // It's a relative path — prefix with API_URL
    const normalizedPath = imagePath.startsWith("/") ? imagePath : `/uploads/${imagePath}`;
    return `${API_URL}${normalizedPath}`;
  }
};

export default API_URL;

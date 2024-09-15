// axiosInstance.js
import axios from 'axios';

// Set the base URL conditionally
const baseURL = process.env.NODE_ENV === 'production'
  ? 'http://backend.melanatedsanctuary.com:5000' // Your live backend API URL
  : '/api'; // Proxy URL for development

const axiosInstance = axios.create({
  baseURL, // Use the determined base URL
});

// Add a request interceptor to include the auth token if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Retrieve the token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
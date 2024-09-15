// axiosInstance.js
import axios from 'axios';

const token = localStorage.getItem('authToken'); // Retrieve the token

// Set the base URL conditionally
const baseURL = process.env.NODE_ENV === 'production'
  ? 'http://backend.melanatedsanctuary.com:5000' // Your live backend API URL
  : '/api'; // Proxy URL for development

const axiosInstance = axios.create({
  baseURL, // Use the determined base URL
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});

export default axiosInstance;
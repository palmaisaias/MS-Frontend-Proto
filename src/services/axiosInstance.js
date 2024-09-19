// axiosInstance.js
import axios from 'axios';

// Set the base URL conditionally
const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://backend.melanatedsanctuary.com:5000' // Your live backend API URL
  : '/api'; // Proxy URL for development

const axiosInstance = axios.create({
  baseURL, // Use the determined base URL
});

let requestInterceptor; // Variable to store the interceptor ID

// Function to set up or reset the interceptor
export const setAxiosInterceptor = () => {
  // Eject the previous interceptor if it exists
  if (requestInterceptor !== undefined) {
    axiosInstance.interceptors.request.eject(requestInterceptor);
  }

  // Add a new request interceptor
  requestInterceptor = axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken'); // Retrieve the token
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

// Set the interceptor when the axios instance is first created
setAxiosInterceptor();

export default axiosInstance;
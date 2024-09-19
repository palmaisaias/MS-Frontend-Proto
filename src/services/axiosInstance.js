// axiosInstance.js
import axios from 'axios';

// **Hardcode the base URL to your live backend URL**
const baseURL = 'https://backend.melanatedsanctuary.com:5000';

const axiosInstance = axios.create({
  baseURL,
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
      // Exclude certain endpoints from having the Authorization header
      const excludedEndpoints = ['/register', '/login'];
      if (token && !excludedEndpoints.includes(config.url)) {
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

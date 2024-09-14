// axiosInstance.js
import axios from 'axios';

const token = localStorage.getItem('authToken'); // Retrieve the token

const axiosInstance = axios.create({
  baseURL: '/api', // Base URL for your API
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});

export default axiosInstance;

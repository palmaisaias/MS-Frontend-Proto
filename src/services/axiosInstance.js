import axios from "axios";

// Hardcode the base URL to avoid repetition. This way whenever we make an axios call to the backend we dont need to explicitly write out the url
const baseURL = "https://backend.melanatedsanctuary.com:5000";

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

  // Add a new request interceptor. This checks the request and keeps it from sending a token
  // to the register and login endpoints since those dont need an auth token. All others will
  // receive a token in the headers
  requestInterceptor = axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken"); // Retrieve the token
      // Exclude certain endpoints from having the Authorization header
      const excludedEndpoints = ["/register", "/login"];
      if (token && !excludedEndpoints.includes(config.url)) {
        config.headers["Authorization"] = `Bearer ${token}`;
        console.log("Token being passed:", token); 
        // console log implemented for troubleshooting. I was having issues with the tokens not 
        // being removed from local storage or cache which was leading to improper data being fetched.
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

setAxiosInterceptor();

export default axiosInstance;

import axios from "axios";
import config from "./config.json";

export const API_URL = config.API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to automatically attach the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // Attach token to headers
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

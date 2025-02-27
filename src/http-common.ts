import axios from "axios";
import config from "./http/config.json";

export const API_URL = config.API_URL;
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if ((status === 401 || (data && data.error === "FAST_JWT_MALFORMED")) && data.message.includes('token')) {
        console.warn("JWT is invalid. Logging out...");

        localStorage.clear();
        localStorage.setItem('login_token_incorrect','1');
        window.location.href = window.location.protocol + "//" + window.location.host;
      }
    }

    return Promise.reject(error);
  }
);

export default api;

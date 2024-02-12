import axios from "axios";
import config from "./http/config.json";

export const API_URL = config.API_URL;
export default axios.create({
  baseURL: API_URL,
});

import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config({path: __dirname+'/.env'});

export const API_URL = process.env.API_URL;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})


export default $api;

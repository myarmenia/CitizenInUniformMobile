import axios from "axios";

const baseURL = process.env.BASE_URL
export const BASE_URL_BACK = process.env.BASE_URL_BACK

export const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
    }
});


export const axiosInstanceBack = axios.create({
    baseURL: BASE_URL_BACK,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
    }
});
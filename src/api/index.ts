import axios from "axios";

const baseURL = process.env.BASE_URL

export const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
    }
});
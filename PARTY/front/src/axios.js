import axios from "axios";
import {LOCALHOST} from "./settings";

export const axiosInstance = axios.create({
    baseURL: LOCALHOST,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('access_token')
            ? "JWT" + localStorage.getItem('access_token')
            : null,
        "Content-Type": 'application/json',
        accept: 'application/json',
    }
})

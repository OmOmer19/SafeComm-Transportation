// axios instance configured with our backend base URL

import axios from "axios"

const API = axios.create({
    baseURL: "https://safecomm-api.onrender.com/api", // deployed backend URL
})

// attaching token to every request automatically if it exists
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token")
    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }
    return req
})

export default API
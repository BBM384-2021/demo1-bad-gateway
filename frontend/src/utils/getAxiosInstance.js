import axios from 'axios';

// axios instance for making requests
const axiosInstance = axios.create({baseURL:"http://localhost:8080"});

// request interceptor for adding token
axiosInstance.interceptors.request.use((config) => {
    // add token to request headers
    console.log("token")
    console.log(localStorage.getItem('token'))
    config.headers['Authorization'] = "Bearer " +localStorage.getItem('token') || "";
    return config;
});

export default axiosInstance;

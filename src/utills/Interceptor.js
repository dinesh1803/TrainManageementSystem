import axios from "axios";
import { errorHandler } from "./ErrorHandler";



const axiosHeader=axios.create({
    baseURL:`http://192.168.1.15:8081/admin`
})
axiosHeader.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        if(config.headers['Content-Type'] !== 'multipart/form-data')
            config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        console.log(error)
        return Promise.reject(error);
    })

    axiosHeader.interceptors.response.use((response) => response.data, (error) => {
        console.log(error)
        errorHandler(error)
        return Promise.reject(error)
    })


export default axiosHeader;
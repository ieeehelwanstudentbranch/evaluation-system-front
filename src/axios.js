import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://api.evaluation-system.ieeehsb.org/api'
})

export default axiosInstance;
import axios from 'axios';
import {endpoint} from './utilize/endpoint';

const axiosInstance = axios.create({
    baseURL: `${endpoint}/api`
})

export default axiosInstance;
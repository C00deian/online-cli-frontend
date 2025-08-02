// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // adjust to your backend
  withCredentials: true, // allow sending cookies
});

export default axiosInstance;

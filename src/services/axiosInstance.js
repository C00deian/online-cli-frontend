import axios from 'axios';
// const axiosInstance = axios.create({
//   baseURL: 'http://13.204.81.232:3400/api',  
//   withCredentials: true, 
// });

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',  
  withCredentials: true, 
});

export default axiosInstance;

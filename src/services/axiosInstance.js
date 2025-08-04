import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://comprig.com/api',  // ✅ just the origin
  withCredentials: true,           // ✅ to send cookies
});

export default axiosInstance;

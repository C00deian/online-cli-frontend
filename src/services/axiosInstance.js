import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://comprig.com/api',  // ✅ just the origin
  withCredentials: true,           // ✅ to send cookies
});


// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3400',  // ✅ just the origin
//   withCredentials: true,           // ✅ to send cookies
// });

export default axiosInstance;

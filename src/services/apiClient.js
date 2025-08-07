import axios from 'axios';

console.log('Base URL:', import.meta.env.VITE_API_BASE_URL);
console.log('Mode:', import.meta.env.MODE); // development | production

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,  
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;

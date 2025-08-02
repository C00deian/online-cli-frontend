
import axios from "axios";
const BASE_URL = "http://localhost:3000/api/auth"; 

export const useAuth = () => {
const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      method: 'POST',
      credentials: 'include', // Important: to send cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.msg || 'Login failed');

    return data; // { msg, user }
  } catch (error) {
    throw error;
  }
};
  const signup = async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/register`, data);
      return res.data;
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };
  return { login, signup };
};

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { toast } from "react-toastify";

export const useLogin = () => {
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const response = await axiosInstance.post("/auth/login", formData);
      const { id, name, email } = response.data.user;
      
      // Save user data using context
      login({ id, name, email });
    

      toast.success(response.data.msg || "Login successful.");
      navigate("/");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return { handleLogin };
};

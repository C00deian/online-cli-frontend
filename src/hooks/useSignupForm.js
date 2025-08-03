import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../services/axiosInstance";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export const useSignupForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // get login method from context

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("auth/register", data);

      const user = response.data?.user;
      if (user && user.id && user.name && user.email) {
        // ⬅️ Save all user info using login context
        login({
          id: user.id,
          name: user.name,
          email: user.email,
        });

        toast.success(response.data.msg || "Registration successful.");
        reset();
        navigate("/");
      } else {
        toast.error("Invalid user data received.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Something went wrong!");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    password,
  };
};

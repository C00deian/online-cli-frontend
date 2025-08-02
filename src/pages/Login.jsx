import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Service/Authantication';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Service/AxiosInstance';
const Login = () => {
  const navigate=useNavigate();
 const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const onSubmit = async (data) => {
  try {
    const response = await axiosInstance.post('/auth/login', data);
    console.log(response.data);

    // Save user id to localStorage
    localStorage.setItem('userId', response.data.user.id);

    toast.success(response.data.msg || 'Login successful.');
    navigate("/");
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.msg); 
    } else {
      toast.error('Something went wrong!');
    }
  }
};

  return (
    <div className=" p-12 mt-7  flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md">
        <h2 className="text-2xl font-bold mb-1 text-gray-900">Log In</h2>
        <p className="text-sm text-gray-600 mb-6">Enter your credentials to continue</p>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", { required: "Email is required" })}
            />
               {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", { required: "password is required" })}
            />
               {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition"
          >
            Log In
          </button>
        </form>
        <div className="text-sm text-center mt-4">
          <a href="#" className="text-gray-600 hover:underline">
            Forgot your password?
          </a>
        </div>
        <div className="text-sm text-center mt-2 text-gray-700">
          Need an account?{" "}
          <Link to="/singup" className="text-black font-semibold hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;

import { Link } from "react-router-dom";
import { useSignupForm } from "../hooks/useSignupForm";

const Signup = () => {
  const { register, handleSubmit, onSubmit, errors, password } = useSignupForm();

  return (
    <div className="p-24 min-h-screen bg-gray-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 text-center">Sign Up</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">Create your account to get started</p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          {/* Uncomment this block to enable confirm password check */}
          {/* 
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) => value === password || "Passwords do not match"
            })}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>} 
          */}

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

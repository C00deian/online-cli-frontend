 import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';  
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className=" fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-2xl font-extrabold text-black tracking-wide">
            <Link to="/">CloudStream</Link>
          </div>
          <div className="hidden md:flex gap-4">
            <Link
              to="/login"
              className="px-5 py-2 text-sm font-semibold text-white bg-gray-800 rounded-full hover:bg-gray-700 transition duration-200"
            >
              Log In
            </Link>
            <Link
              to="/singup"
              className="px-5 py-2 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-700 transition duration-200"
            >
              Sign Up
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white px-6 pb-4">
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center px-4 py-2 my-2 text-sm font-semibold text-white bg-gray-800 rounded-full hover:bg-gray-700 transition"
          >
            Log In
          </Link>
          <Link
            to="/singup"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center px-4 py-2 my-2 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-700 transition"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};
export default Navbar;

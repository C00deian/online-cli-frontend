import React, { useState, useRef, useEffect } from 'react';
import user from "../assets/Profile.webp"
import { useAuth } from "../context/AuthContext"; // ⬅️ import useAuth

const Profile = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { name, email, logout } = useAuth();
    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {/* User Avatar Button */}
            <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 "
                id="user-menu-button"
            >
                <span className="sr-only">Open user menu</span>
                <img
                    className="w-8 h-8 rounded-full cursor-pointer"
                    src={user}
                    alt="user"
                />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
                <div
                    ref={dropdownRef}
                    className="z-50 absolute top-16 right-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm "
                >
                    <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 ">
                            {name}
                        </span>
                        <span className="block text-sm text-gray-500 truncate ">
                            {email}
                        </span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  "
                            >
                                Settings
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  "
                            >
                                Biling
                            </a>
                        </li>
                        <li>
                            <button
                                onClick={logout}
                                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Sign out
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>

    );
};

export default Profile;

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const navigate=useNavigate();
    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        const storedName = localStorage.getItem("name");
        const storedEmail = localStorage.getItem("email");

        if (storedUserId) setUserId(storedUserId);
        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
    }, []);

    const login = ({ id, name, email }) => {
        localStorage.setItem("userId", id);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        setUserId(id);
        setName(name);
        setEmail(email);
    };

    const logout = () => {
       
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        setUserId(null);
        setName(null);
        setEmail(null);
        navigate(0);

    };

    return (
        <AuthContext.Provider value={{ userId, name, email, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for consuming AuthContext
export const useAuth = () => useContext(AuthContext);

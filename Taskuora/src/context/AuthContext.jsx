
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api, { getMe } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await getMe();
        setUser(userData);
      } catch (error) {
        setUser(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers["x-auth-token"] = token;
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.post("/users/login", credentials);
      console.log("Login data:", response); // Debug login response
      const { token } = response.data; // Destructure token from response
        console.log("Login API response:", response.data); // Debugging login response
      localStorage.setItem("token", token);
      console.log("Token set in localStorage after login:", token); // Debug token storage
      api.defaults.headers["x-auth-token"] = token;
      const userData = await getMe();
      setUser(userData);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error); // Debug login failure
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post("/users/register", userData);
      const { token} = response.data; // Destructure token from response
      localStorage.setItem("token", token); // Store token in localStorage
      console.log("Register API response:", response.data); // ADD THIS LINE
      //localStorage.setItem("token", data.token);
      console.log("Token set in localStorage after register:", token);
      if (!token) {
        console.error("No token received from register endpoint");
        throw new Error("Authentication failed: No token received");
      }
      api.defaults.headers["x-auth-token"] = token;
      const user = await getMe();
      setUser(user);
      navigate("/");
    } catch (error) {
      console.error("Register failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    api.defaults.headers["x-auth-token"] = "";
    setUser(null);
    navigate("/login");
  };

  const contextData = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

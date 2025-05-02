
import React, { useState } from "react";
import { Clock, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-gradient-to-r from-teal-900 to-emerald-900 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock size={28} className="text-white" />
            <h1 className="text-2xl font-bold">Tasko</h1>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/">
              <button className="flex items-center space-x-2 bg-emerald-800 hover:bg-emerald-700 px-4 py-2 rounded-md">
                <span className="text-emerald-300">☑</span>
                <span>Task List</span>
              </button>
            </Link>

            <Link
              to="/spin"
              className="flex items-center space-x-2 hover:bg-emerald-800 px-4 py-2 rounded-md"
            >
              <span>Spin</span>
            </Link>
          </div>

          {/* Authentication buttons removed */}

          {user && (
            <div className="relative">
              <button
                className="flex items-center space-x-2"
                onClick={toggleDropdown}
              >
                <div className="bg-white text-emerald-800 h-8 w-8 rounded-full flex items-center justify-center">
                  <span className="font-semibold">
                    {user.name.charAt(0).toUpperCase() +
                      (user.name.split(" ")[1]
                        ? user.name.split(" ")[1].charAt(0).toUpperCase()
                        : "")}
                  </span>
                </div>
                <span>{user.name}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-10">
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-12 mb-16 max-w-2xl">
          <p className="text-emerald-300 text-lg">
            Hi {user ? user.name : "Guest"}
          </p>
          <h2 className="text-4xl font-bold mt-1">Welcome to Dashboard</h2>
        </div>
      </div>
    </div>
  );
};

export default Header;

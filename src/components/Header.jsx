import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaEnvelope, FaUser, FaSearch } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user_data"));
  const { signOut } = useAuth();

  const displayName = user ? user.first_name : "Guest";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center bg-white p-4 h-16 shadow-md z-50 w-full">
      <div className="flex items-center space-x-4 ml-4">
        <div className="relative">
          <FaSearch
            size={16}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Buscar..."
            className="pl-8 border p-2 rounded-md"
            style={{ width: "250px" }}
          />
        </div>
      </div>
      <div className="flex items-center space-x-8 mr-6">
        <FaBell size={20} className="cursor-pointer" />
        <FaEnvelope size={20} className="cursor-pointer" />

        <div className="relative" ref={dropdownRef}>
          {displayName ? (
            <span
              className="ml-4 text-gray-600 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {displayName}
            </span>
          ) : (
            <FaUser
              size={20}
              className="cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
          )}

          {dropdownOpen && (
            <div className="absolute right-0 mt-4 w-48 bg-white border rounded-md shadow-lg">
              <a href="#" className="block p-4 hover:bg-gray-100">
                Perfil
              </a>
              <a href="#" className="block p-4 hover:bg-gray-100">
                Configurações
              </a>
              <button
                onClick={signOut}
                className="block w-full text-left p-4 hover:bg-gray-100"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

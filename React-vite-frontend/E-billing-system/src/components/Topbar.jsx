import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import classNames from "classnames";
import logo from "../assets/logo.png";

const Topbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(true);
  const [userName, setUserName] = useState("");
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.userId) {
      setUserName(storedUser.firstName);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const topbarClass = classNames(
    "fixed z-50 w-full transition-transform duration-300 ease-in-out",
    {
      "transform -translate-y-full": !isVisible,
    }
  );

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className={topbarClass}>
      <div className="backdrop-brightness-50  backdrop-blur-3xl p-2 shadow-lg">
        <div className="container mx-auto flex justify-between items-center text-white">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl p-1 font-bold text-trueGray-50">
              <NavLink to="/" className="flex items-center">
                <img src={logo} className="w-8 sm:w-10 mr-2" alt="logo" />
                TANGEDCO
              </NavLink>
            </h1>
          </div>
          <div className="flex items-center space-x-4 lg:hidden">
            <button
              onClick={toggleDropdown}
              className="text-white hover:text-gray-300 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex flex-wrap justify-center items-center text-[#bebebe] space-x-4 lg:space-x-10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "border-b-4 border-[#ffffff] text-white transition duration-300"
                  : "hover:text-white transition duration-300"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/DisplayBills"
              className={({ isActive }) =>
                isActive
                  ? "border-b-4 border-[#ffffff] text-white transition duration-300"
                  : "hover:text-white transition duration-300"
              }
            >
              Pay Bills
            </NavLink>
            <NavLink
              to="/MeterReadingDisplay"
              className={({ isActive }) =>
                isActive
                  ? "border-b-4 border-[#ffffff] text-white transition duration-300"
                  : "hover:text-white transition duration-300"
              }
            >
              Past Readings
            </NavLink>
            <NavLink
              to="/CalculateBills"
              className={({ isActive }) =>
                isActive
                  ? "border-b-4 border-[#ffffff] text-white transition duration-300"
                  : "hover:text-white transition duration-300"
              }
            >
              Billing Math
            </NavLink>
          </div>
          <div className="hidden lg:flex items-center text-trueGray-300 space-x-4 lg:space-x-6">
            <button className="hover:text-gray-200 font-bold hover:text-white transition duration-300">
              {userName}
            </button>
            {!isAuthenticated ? (
              <div className="flex space-x-2">
                <NavLink
                  to="/login"
                  className="hover:text-white transition duration-300"
                >
                  Login /
                </NavLink>
                <NavLink
                  to="/register"
                  className="hover:text-white transition duration-300"
                >
                  Register
                </NavLink>
              </div>
            ) : (
              <button
                onClick={logout}
                className="bg-lightBlue-600 hover:scale-95 hover:bg-lightBlue-700 text-white font- py-1 px-3 rounded-full transition shadow-xl hover:shadow-none hover:outline-none outline outline-1 hover:text-trueGray-300 outline-light-blue-900 duration-300"
              >
                <NavLink to={"/login"}>Logout</NavLink>
              </button>
            )}
            <button className="hover:text-gray-200 font-bold hover:text-white transition duration-300">
              தமிழ்
            </button>
          </div>
        </div>

        <div
          className={classNames(
            "lg:hidden transition-max-height duration-500 ease-in-out overflow-hidden",
            { "max-h-0": !isDropdownOpen, "max-h-96": isDropdownOpen }
          )}
        >
          <div className="px-4 text-white">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "block border-b-2 border-[#ffffff] text-white transition duration-300 py-2"
                  : "block hover:text-white transition duration-300 py-2"
              }
              onClick={() => setIsDropdownOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/DisplayBills"
              className={({ isActive }) =>
                isActive
                  ? "block border-b-4 border-[#ffffff] text-white transition duration-300 py-2"
                  : "block hover:text-white transition duration-300 py-2"
              }
              onClick={() => setIsDropdownOpen(false)}
            >
              Pay Bills
            </NavLink>
            <NavLink
              to="/MeterReadingDisplay"
              className={({ isActive }) =>
                isActive
                  ? "block border-b-4 border-[#ffffff] text-white transition duration-300 py-2"
                  : "block hover:text-white transition duration-300 py-2"
              }
              onClick={() => setIsDropdownOpen(false)}
            >
              Past Readings
            </NavLink>
            <NavLink
              to="/CalculateBills"
              className={({ isActive }) =>
                isActive
                  ? "block border-b-4 border-[#ffffff] text-white transition duration-300 py-2"
                  : "block hover:text-white transition duration-300 py-2"
              }
              onClick={() => setIsDropdownOpen(false)}
            >
              Billing Math
            </NavLink>
            <div className="flex justify-between items-center pb-2 pt-4 text-center border-t border-gray-2 mt-2">
              <button className="hover:text-gray-200 font-bold hover:text-white transition duration-300">
                {userName}
              </button>
              {!isAuthenticated ? (
                <div className="flex space-x-2">
                  <NavLink
                    to="/login"
                    className="hover:text-white transition duration-300"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Login /
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="hover:text-white transition duration-300"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Register
                  </NavLink>
                </div>
              ) : (
                <button
                  onClick={logout}
                  className="bg-lightBlue-600 hover:scale-95 hover:bg-lightBlue-700 text-white font- py-1 px-3 rounded-full transition shadow-xl hover:shadow-none hover:outline-none outline outline-1 hover:text-trueGray-300 outline-light-blue-900 duration-300"
                >
                                    <NavLink to={"/login"} onClick={() => setIsDropdownOpen(false)}>
                    Logout
                  </NavLink>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;


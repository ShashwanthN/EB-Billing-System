import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import { AuthContext } from "../context/AuthContext.jsx";
import classNames from "classnames";
import logo from '../assets/logo.png';

const Topbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(true);
  const [isClicked, setIsClicked] = useState(true);
  const [userName, setUserName] = useState("");
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

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

  return (
    <div className={topbarClass}>
      <div className="backdrop-brightness-50 border-b border-trueGray-700 backdrop-blur-3xl p-2 shadow-lg">
        <div className="container mx-auto flex justify-between items-center text-white">
          <div>
          <h1 className="text-2xl p-1  flex items-center font-bold text-trueGray-50">
            <NavLink to="/" className="flex items-center">
              <img src={logo} className="w-10 mr-2" alt="logo" />
              TANGEDCO
            </NavLink>
          </h1>
          </div>
          <div className="flex left-1/2 mx-auto items-end text-[#bebebe] space-x-10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "border-b-4 border-[#ffffff]  text-white transition duration-300"
                  : "hover:text-white transition duration-300"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/DisplayBills"
              className={({ isActive }) =>
                isActive
                  ? "border-b-4 border-[#ffffff]  text-white transition duration-300"
                  : "hover:text-white transition duration-300"
              }
            >
              Pay Bills
            </NavLink>
            <NavLink
              to="/MeterReadingDisplay"
              className={({ isActive }) =>
                isActive
                  ? "border-b-4 border-[#ffffff]  text-white transition duration-300"
                  : "hover:text-white transition duration-300"
              }
            >
              Past Readings
            </NavLink>
            <NavLink
              to="/CalculateBills"
              className={({ isActive }) =>
                isActive
                  ? "border-b-4 border-[#ffffff] items-end text-end text-white transition duration-300"
                  : "hover:text-white transition duration-300"
              }
            >
              Billing Math
            </NavLink>
          </div>
          <div className="flex items-center text-trueGray-300 space-x-6">
            <button className="hover:text-gray-200 font-bold hover:text-white transition duration-300">
              {userName}
            </button>
            {!isAuthenticated ? (
              <>
                <div>
                  <NavLink
                    to="/login"
                    className="hover:text-white transition duration-300"
                  >
                    Login /{" "}
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="hover:text-white transition duration-300"
                  >
                    Register
                  </NavLink>
                </div>
              </>
            ) : (
              <button
                onClick={logout}
                className="bg-lightBlue-500 hover:bg-lightBlue-600 text-white font- py-1 px-3 rounded-full transition duration-300"
              >
                <NavLink to={"/login"}>Logout</NavLink>
              </button>
            )}
            <button className="hover:text-gray-200 font-bold hover:text-white transition duration-300">
              தமிழ்
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;

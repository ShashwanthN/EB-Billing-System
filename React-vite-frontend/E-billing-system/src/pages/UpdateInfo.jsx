import React, { useState, useEffect } from "react";
import bg from "../assets/powerlines.jpg";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

const UpdateInfo = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [Email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showSplash, setShowSplash] = useState(false);
  const [showOtpSplash, setShowOtpSplash] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.userId) {
      setUserId(storedUser.userId);
      setEmail(storedUser.email);
      setPhoneNumber(storedUser.phoneNumber);
    }
  }, []);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/api/get/otp/sendOtp",
        { email: Email }
      );

      if (response.data.statusCode === 200) {
        setShowOtpSplash(true);
        setMessage("OTP sent to your email.");
      } else {
        setError("Failed to send OTP.");
      }
    } catch (error) {
      if (error.response) {
        setError("Error sending OTP: " + error.response.data.message);
      } else if (error.request) {
        setError("Error sending OTP: No response from server");
      } else {
        setError("Error sending OTP: " + error.message);
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
  
    try {
      const otpResponse = await axiosInstance.post(
        "http://localhost:8080/users/otp/validate",
        {
          email: Email,
          otp,
        }
      );
  
      if (otpResponse.data.statusCode === 200) {
        try {
          const response = await axiosInstance.post(
            "http://localhost:8080/users/update",
            {
              userId: userId,
              email: Email,
              phoneNumber: phoneNumber,
              otpValidationRequest: { email: Email, otp },
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
  
          if (response.status === 200) {
            const updatedUser = response.data;
            setUserId(updatedUser.userId);
            setShowSplash(true);
            setShowOtpSplash(false);
            setMessage("User updated successfully.");
          } else {
            setError("Update failed.");
          }
        } catch (error) {
          console.error("There was an error updating the user info!", error);
          alert("Update failed");
        }
      } else {
        setError("OTP validation failed: " + otpResponse.data.responseMessage);
      }
    } catch (error) {
      if (error.response) {
        setError("Error validating OTP: " + error.response.data.message);
      } else if (error.request) {
        setError("Error validating OTP: No response from server");
      } else {
        setError("Error validating OTP: " + error.message);
      }
    }
  };
  
  return (
    <div className="relative h-screen overflow-scroll main-content bg-cover bg-center">
      <img
        src={bg}
        alt="background"
        className="bg-full overflow-hidden brightness-50 hue-rotate-15 max-h-screen"
      />

      {!showOtpSplash && !showSplash && (
        <div className="relative h-max max-w-2xl rounded mx-auto p-8 backdrop-blur-2xl backdrop-brightness-50 border border-[#555555] mb-10">
          <div className="flex items-center mb-10 justify-between">
            <h2 className="text-3xl font-bold text-gray-3">
              Update Information
            </h2>
            <img src={logo} alt="logo" className="w-36 h-36" />
          </div>

          <form
            onSubmit={handleRegister}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div className="flex flex-col">
              <label className="block text-gray-3 text-sm text-left font-bold mb-2">
                User ID:
              </label>
              <div className="appearance-none rounded-sm border transition-all border-gray-2 duration-200 bg-transparent hover:border-gray w-full py-2 px-3 text-gray-3 leading-tight focus:outline-accent focus:shadow-outline">
                {userId}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-3 text-sm text-left font-bold mb-2">
                Email
              </label>
              <input
                type="text"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-sm bg-transparent border-gray-2 border transition-all duration-200 hover:border-gray w-full py-2 px-3 text-gray-3 leading-tight focus:outline-accent focus:shadow-outline"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-3 text-sm text-left font-bold mb-2">
                Phone
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="appearance-none rounded-sm bg-transparent border-gray-2 border transition-all duration-200 hover:border-gray w-full py-2 px-3 text-gray-3 leading-tight focus:outline-accent focus:shadow-outline"
                placeholder="Enter your phone number"
              />
            </div>
            {message && (
              <p
                className={`mt-4 text-sm text-center ${
                  error ? "text-red-500" : "text-green-500"
                }`}
              >
                {message}
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 mt-6 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-md transition-all duration-200 hover:bg-accent-dark focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
          </form>
        </div>
      )}
      {showOtpSplash && !showSplash && (
        <div className="relative bg-gray-1 mx-auto p-8 rounded shadow-lg w-full max-w-lg z-10 overflow-y-auto max-h-screen">
          <form onSubmit={handleOtpSubmit} className="p-1 overflow-scroll">
            <div className="mb-4">
              <label
                className="block text-gray-3 text-sm font-bold mb-2"
                htmlFor="otp"
              >
                OTP
              </label>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="appearance-none rounded border border-gray bg-gray-5 transition-all transform duration-200 hover:border-gray w-full py-2 px-3 text-gray-3 placeholder-trueGray-600 focus:outline-blue-500 outline-none"
                required
              />
            </div>
            {message && (
              <p className="text-green-500 mb-2 text-xs italic">{message}</p>
            )}
            {error && <p className="text-red-500 mb-2 text-xs italic">{error}</p>}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-light-blue-700 hover:bg-light-blue-900 transition-all transform duration-200 text-white font-bold py-2 px-4 rounded focus:outline-blue-500 outline-none"
              >
                Validate OTP
              </button>
            </div>
          </form>
        </div>
      )}

      {showSplash && (
        <div className="relative bg-gray-1 p-8 border border-gray rounded shadow-lg w-full max-w-lg z-10 overflow-y-auto mx-auto max-h-screen">
          <div className="splash-screen">
            <h2 className="text-lg text-green-500 font-semibold mb-4">
              Update Successful!
            </h2>
            <div className="border-gray rounded bg-gray-5 border">
              <p className="text-gray-3 p-4 text-3xl font-bold text-center">
                {userId}
              </p>
            </div>
            <div className="flex mt-4 justify-between">
              <button
                className="transition-all transform duration-200 text-light-blue-600 font-bold px-4 rounded py-2 focus:outline-blue-500 outline-none mt-4"
                onClick={() => navigate("/")}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateInfo;

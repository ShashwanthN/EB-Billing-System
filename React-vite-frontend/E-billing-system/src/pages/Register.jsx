import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import bg from "../assets/login-bg.png";
import logo from "../assets/logo.png";
import PasswordValidattor from "react-password-validattor";

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    aadharId: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const [showSplash, setShowSplash] = useState(false);
  const [showOtpSplash, setShowOtpSplash] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "aadharId") {
      const formattedValue = formatAadhar(value);
      setUser({ ...user, [name]: formattedValue });
    } else if (name === "phoneNumber") {
      const formattedPhone = formatPhone(value);
      setUser({ ...user, [name]: formattedPhone });
    } else if (name === "firstName" || name === "lastName") {
      setUser({ ...user, [name]: capitalize(value) });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const formatAadhar = (value) => {
    const onlyDigits = value.replace(/\D/g, "");
    return onlyDigits
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(\d{4}) (\d{4})(\d)/, "$1 $2 $3");
  };

  const formatPhone = (value) => {
    const onlyDigits = value.replace(/\D/g, "");
    return onlyDigits.length > 10 ? onlyDigits.slice(0, 10) : onlyDigits;
  };

  const capitalize = (value) =>
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");


    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const normalizedAadharId = user.aadharId.replace(/\s/g, "");
    if (normalizedAadharId.length !== 12) {
      setError("Aadhar ID must be exactly 12 digits.");
      return;
    }

    if (user.phoneNumber.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (!validateEmail(user.email)) {
      setError("Invalid email format.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/api/get/otp/sendOtp",
        {
          email: user.email,
        }
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
    }finally {
      setIsLoading(false);
    }

  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const otpResponse = await axiosInstance.post(
        "http://localhost:8080/users/otp/validate",
        {
          email: user.email,
          otp,
        }
      );

      if (otpResponse.data.statusCode === 200) {
        const normalizedAadharId = user.aadharId.replace(/\s/g, "");
        const { confirmPassword, ...userData } = user;

        const registrationResponse = await axiosInstance.post(
          "http://localhost:8080/users/register",
          {
            user: { ...userData, aadharId: normalizedAadharId },
            otpValidationRequest: { email: user.email, otp },
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (registrationResponse.status === 201) {
          const registeredUser = registrationResponse.data;
          setUserId(registeredUser.userId);
          setShowSplash(true);
          setShowOtpSplash(false);
          setMessage("User registered successfully.");
        } else {
          setError("Registration failed.");
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
    }finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(userId);
    setMessage("copied!");
  };

  const onValidatorChangeHandler = (result) => {};

  return (
    <div className="min-h-screen justify-center relative flex items-center transition-all transform duration-200">
      {isLoading && (
        <div className="fixed top-0 inset-0 bg-trueGray-900 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )}
       <div className={`loading-bar ${isLoading ? "loading" : ""}`}></div>
      <img
        src={bg}
        alt="background"
        className="fixed inset-0 w-full h-full object-cover brightness-50 hue-rotate-180"
      />

      <div
        className={`relative bg-gray-1 p-8 rounded shadow-lg w-full max-w-lg z-10 overflow-y-auto max-h-screen ${
          showOtpSplash || showSplash ? "pointer-events-none brightness-50" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-6xl font-bold opacity-50 my-4 text-center text-white">
            Register
          </h2>
          <img src={logo} alt="logo" className="my-2 hue-rotate-270 w-36" />
        </div>

        <form onSubmit={handleSubmit} className="overflow-scroll">
          <div className="p-1">
            <div className="flex justify-between">
              <div className="mb-4 w-full mr-2">
                <label
                  className="block text-gray-3 text-sm font-bold mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  placeholder="John"
                  onChange={handleChange}
                  className="appearance-none rounded border border-gray bg-gray-5 transition-all transform duration-200 hover:border-gray w-full py-2 px-3 text-gray-3 placeholder-trueGray-600 focus:outline-blue-500 outline-none"
                  required
                />
              </div>
              <div className="mb-4 w-full ml-2">
                <label
                  className="block text-gray-3 text-sm font-bold mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="appearance-none rounded border border-gray bg-gray-5 transition-all transform duration-200 hover:border-gray w-full py-2 px-3 text-gray-3 placeholder-trueGray-600 focus:outline-blue-500 outline-none"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-3 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="example@domain.com"
                className="appearance-none rounded border border-gray bg-gray-5 transition-all transform duration-200 hover:border-gray w-full py-2 px-3 text-gray-3 placeholder-trueGray-600 focus:outline-blue-500 outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-3 text-sm font-bold mb-2"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
                maxLength="10"
                placeholder="9999999999"
                className="appearance-none rounded border border-gray bg-gray-5 transition-all transform duration-200 hover:border-gray w-full py-2 px-3 text-gray-3 placeholder-trueGray-600 focus:outline-blue-500 outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-3 text-sm font-bold mb-2"
                htmlFor="aadharId"
              >
                Aadhar ID
              </label>
              <input
                type="text"
                name="aadharId"
                value={user.aadharId}
                onChange={handleChange}
                maxLength="14"
                placeholder="0000 0000 0000"
                className="appearance-none rounded border border-gray bg-gray-5 transition-all transform duration-200 hover:border-gray w-full py-2 px-3 text-gray-3 placeholder-trueGray-600 focus:outline-blue-500 outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-3 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="********"
                className="appearance-none mb-2 rounded border border-gray bg-gray-5 transition-all transform duration-200 hover:border-gray w-full py-2 px-3 text-gray-3 placeholder-trueGray-600 focus:outline-blue-500 outline-none"
                required
              />
             
              
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-3 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                placeholder="********"
                className="appearance-none rounded border border-gray bg-gray-5 transition-all transform duration-200 hover:border-gray w-full py-2 px-3 text-gray-3 placeholder-trueGray-600 focus:outline-blue-500 outline-none"
                required
              />

            </div>
            <div className="mb-6">

            <PasswordValidattor
                rules={[
                  "minLength",
                  "maxLength",
                  "specialChar",
                  "number",
                  "capital",
                  "matches",
                  "lowercase",
                  "notEmpty",
                  "shouldNotContain",
                ]}
                forbiddenWords={["John", "Doe"]}
                minLength={8}
                maxLength={32}
                password={user.password}
                confirmedPassword={user.confirmPassword}
                iconSize={16}
                onValidatorChange={onValidatorChangeHandler}
                config={{
                  showProgressBar: true,
                  showPasswordSuggestion: true,
                }}
              />
              </div>
            {message && (
              <p className="text-success text-xs mb-3 italic">{message}</p>
            )}
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-light-blue-700 hover:bg-primary-600 hover:bg-light-blue-900 transition-all transform duration-200 text-white font-bold py-2 px-4 rounded focus:outline-blue-500 outline-none"
              >
                Register
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-trueGray-300 hover:text-primary-600"
                onClick={() => navigate("/login")}
              >
                Already have an account?{" "}
                <span className="text-light-blue-500">Log in</span>
              </a>
            </div>
          </div>
        </form>
      </div>

      {showOtpSplash && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className=" backdrop-blur-lg border border-trueGray-800 p-8 rounded shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">
              Authentication
            </h2>
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-4">
                <label
                  className="block text-trueGray-300 text-sm font-bold mb-2"
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
                  className="appearance-none rounded border border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-light-blue-500 hover:bg-light-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Validate OTP
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setShowOtpSplash(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSplash && (
        <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center z-20">
          <div className="backdrop-blur-2xl border border-trueGray-800 p-8 rounded shadow-lg w-full max-w-md">
            <div className="splash-screen">
              <h2 className="text-lg text-[#68E534] font-semibold mb-4">
                Registration Successful!
              </h2>
              <div className=" border-gray rounded  bg-gray-1 border">
                <p className="text-gray-3 p-4 text-3xl font-bold text-center">
                  {userId}
                </p>
              </div>
              <div className="flex mt-4 justify-between">
                <button
                  className="bg-light-blue-700 hover:bg-light-blue-800 transition-all transform duration-200 text-white font-bold px-2  mt-4 rounded focus:outline-blue-500 outline-none"
                  onClick={handleCopy}
                >
                  Copy User ID
                </button>
                <button
                  className=" transition-all transform duration-200  text-light-blue-600 font-bold px-4 rounded py-2 focus:outline-blue-500 outline-none mt-4"
                  onClick={() => navigate("/login")}
                >
                  Go to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {(message || error) && (
        <div className="absolute  top-0 left-0 w-full flex z-10 justify-center">
          <div
            className={`${
              message ? "bg-green-500" : "bg-red-500"
            } text-white font-bold py-2 px-4 rounded mt-2 mb-2 shadow-lg`}
          >
            {message || error}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;

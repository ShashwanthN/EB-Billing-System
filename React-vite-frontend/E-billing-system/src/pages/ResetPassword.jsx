import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PasswordValidattor from "react-password-validattor";
import axiosInstance from "../services/axiosInstance";
import bg from "../assets/login-bg.png";

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); 
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (step === 2 || step === 3) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setError("Timeout, please request OTP again.");
            setStep(1);
            return 300; 
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer); 
  }, [step]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/get/otp/sendOtpForVerification",
        { email }
      );
      if (response.data.statusCode === 200) {
        setStep(2);
        setMessage("OTP sent to your email.");
        setTimeLeft(300); // reset timer to 5 minutes
      } else {
        setError(response.data.responseMessage);
      }
    } catch (error) {
      setError("Error sending OTP: " + error.message);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/users/otp/validate",
        { email, otp }
      );
      if (response.data.statusCode === 200) {
        setStep(3);
      } else {
        setError("OTP validation failed: " + response.data.responseMessage);
      }
    } catch (error) {
      setError("Error validating OTP: " + error.message);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/users/resetPassword",
        {
          email: email,
          password: password,
          otpValidationRequest: { email, otp },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        setMessage("Password reset successful.");
        navigate("/login");
      } else {
        setError("Password reset failed.");
      }
    } catch (error) {
      setError("Error resetting password: " + error.message);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <img
        src={bg}
        alt="background"
        className="fixed inset-0 w-full z-0 h-full object-cover brightness-50 hue-rotate-180"
      />
      {step === 1 && (
        <form
          onSubmit={handleEmailSubmit}
          className="min-w-96 backdrop-brightness-50 rounded text-white z-10 backdrop-blur-lg py-6 px-10 max-w-sm"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
              className="appearance-none rounded border border-gray bg-gray-200 w-full py-2 px-3 text-black leading-tight focus:outline-none"
              required
            />
          </div>
          {message && <p className="text-green-500">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-6">
            <button
              type="submit"
              className="bg-light-blue-600 hover:bg-light-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send OTP
            </button>
          </div>
        </form>
      )}
      {(step === 2 || step === 3) && (
        <div className="w-full mx-auto backdrop-brightness-50 rounded text-white z-10 backdrop-blur-lg py-6 px-10 max-w-sm">
          <div className="text-center text-2xl font-bold text-red-500 mb-4">
            {formatTime(timeLeft)}
          </div>
          {step === 2 && (
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
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
                  className="appearance-none rounded border border-gray bg-gray-200 w-full py-2 px-3 text-trueGray-700 leading-tight focus:outline-none"
                  required
                />
              </div>
              {message && <p className="text-green-500 mb-2">{message}</p>}
              {error && <p className="text-red-500">{error}</p>}
              <div className="mb-6">
                <button
                  type="submit"
                  className="bg-light-blue-600 hover:bg-light-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Validate OTP
                </button>
              </div>
            </form>
          )}
          {step === 3 && (
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="appearance-none rounded border border-gray bg-gray-200 w-full py-2 px-3 text-trueGray-800 leading-tight focus:outline-none"
                  required
                />
                <div className="text-trueGray-700">
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
                    password={password}
                    confirmedPassword={confirmPassword}
                    iconSize={16}
                    onValidatorChange={setError}
                    config={{
                      showProgressBar: true,
                      showPasswordSuggestion: true,
                    }}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="********"
                  className="appearance-none rounded border text-trueGray-800 border-gray bg-gray-200 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  required
                />
              </div>
              {message && <p className="text-green-500">{message}</p>}
              {error && <p className="text-red-500">{error}</p>}
              <div className="mb-6">
                <button
                  type="submit"
                  onClick={handlePasswordSubmit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Reset Password
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default ResetPassword;

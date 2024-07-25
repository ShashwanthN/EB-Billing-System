import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import bg from "../assets/login-bg.png";
import logo from "../assets/logo.png";

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/users/login', { userId, password });
      const { message, user, token } = response.data;
      setMessage(message);
      if (user) {
        login(user);
        localStorage.setItem('token', token);
        setIsSuccess(true);
        navigate('/');
      } else {
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("Login error: " + (error.response?.data?.message || "Unexpected error occurred"));
      setIsSuccess(false);
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen max-h-screen flex items-center transition-all transform duration-200 justify-center overflow-hidden relative">
      <img src={bg} alt="background" className="bg-full overflow-hidden brightness-50 max-h-screen hue-rotate-180" />
      <div className="bg-gray-1 p-8 rounded shadow-lg w-full max-w-md z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-6xl font-bold opacity-50 my-4 text-center text-white">Login</h2>
          <img src={logo} alt="logo" className="my-4 hue-rotate-270 w-36" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-3 text-sm text-left font-bold mb-2" htmlFor="userId">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              placeholder='00112233'
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="appearance-none rounded border border-gray bg-gray-5 transition-all transform duration-200 hover:border-gray w-full py-2 px-3 text-gray-3  focus:outline-none outline-1 focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-left text-gray-3 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded border border-gray bg-gray-5 transition-all transform duration-200 hover:border-gray w-full py-2 px-3 text-gray-3 focus:outline-none  focus:shadow-outline"
              required
            />
            <div className='text-xs justify-end flex text-gray-3 mt-1'><button>forgot password?</button></div>
          </div>
          {message && (
            <p className={`mt-4 text-sm text-center ${isSuccess ? 'text-success' : 'text-error'}`}>
              {message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-lightBlue-600 hover:bg-lightBlue-700 mt-5 hover:border-secondary text-gray-3 font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            <div className="mt-4 text-sm text-center">
              <span className="text-gray-3">Not registered? </span>
              <a href="/register" className="text-lightBlue-400 hover:underline">Register here</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

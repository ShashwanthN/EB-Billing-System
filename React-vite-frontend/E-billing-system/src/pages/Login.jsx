import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bg from "../assets/login-bg.png";
import logo from "../assets/logo.png";

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8080/users/login', {
        userId: userId,
        password: password,
      });
  
      // Check the response and set the message
      if (response.data.user) {
        setMessage(response.data.message); 
        setIsSuccess(true);
        navigate('/');  // Redirect to home page
      } else {
        setMessage(response.data.message); 
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
      <img src={bg} alt="background" className="bg-full overflow-hidden brightness-75 max-h-screen" />
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-6xl font-bold opacity-50 my-4 text-center text-primary">Login</h2>
          <img src={logo} alt="logo" className="my-4 w-36" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray text-sm text-left font-bold mb-2" htmlFor="userId">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              placeholder='00112233'
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="appearance-none rounded-sm border transition-all transform duration-200 hover:border-gray w-full py-2 px-3 text-gray leading-tight focus:outline-accent focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-left text-gray text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-sm border transition-all transform duration-200 hover:border-gray w-full py-2 px-3 text-gray leading-tight focus:outline-accent focus:shadow-outline"
              required
            />
            <div className='text-xs justify-end flex text-gray-2 mt-1'><button>forgot password?</button></div>
          </div>
          {message && (
            <p className={`mt-4 text-sm text-center ${isSuccess ? 'text-success' : 'text-error'}`}>
              {message}
            </p>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-accent hover:bg-purple mt-5 hover:border-secondary text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            <div className="mt-4 text-sm text-center">
              <span className="text-gray-2">Not registered? </span> 
              <a href="/register" className="text-accent hover:underline">Register here</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

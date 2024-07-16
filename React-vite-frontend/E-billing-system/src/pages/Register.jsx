import React, { useState } from 'react';
import axios from 'axios';
import bg from "../assets/login-bg.png"; 
import logo from "../assets/logo.png"; 

const Register = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    aadharId: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const [showSplash, setShowSplash] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

   
    if (name === 'aadharId') {
      const formattedValue = formatAadhar(value);
      setUser({ ...user, [name]: formattedValue });
    } else if (name === 'phoneNumber') {
      const formattedPhone = formatPhone(value);
      setUser({ ...user, [name]: formattedPhone });
    } else if (name === 'firstName' || name === 'lastName') {
      
      setUser({
        ...user,
        [name]: capitalize(value)
      });
    } else {
      
      setUser({
        ...user,
        [name]: value
      });
    }
  };

  const formatAadhar = (value) => {
    const onlyDigits = value.replace(/\D/g, '');
    return onlyDigits.replace(/(\d{4})(\d)/, '$1 $2').replace(/(\d{4}) (\d{4})(\d)/, '$1 $2 $3');
  };

  const formatPhone = (value) => {
    const onlyDigits = value.replace(/\D/g, '');
    return onlyDigits.length > 10 ? onlyDigits.slice(0, 10) : onlyDigits;
  };

  const capitalize = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

      if (user.password !== user.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const normalizedAadharId = user.aadharId.replace(/\s/g, '');
    if (normalizedAadharId.length !== 12) {
      setError('Aadhar ID must be exactly 12 digits.');
      return;
    }


    if (user.phoneNumber.length !== 10) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }


    if (!validateEmail(user.email)) {
      setError('Invalid email format.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/users', {
        ...user,
        aadharId: normalizedAadharId 
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUserId(response.data.userId); 
      setMessage('User registered successfully.');
      setShowSplash(true); 
    } catch (error) {
      if (error.response) {
        setError('Error registering user: ' + error.response.data.message);
      } else if (error.request) {
        setError('Error registering user: No response from server');
      } else {
        setError('Error registering user: ' + error.message);
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(userId);
    setMessage('User ID copied to clipboard!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <img src={bg} alt="background" className="absolute inset-0 w-full h-full object-cover brightness-75" />
      <div className="bg-white bg-blend-multiply p-8 rounded shadow-lg w-full max-w-lg z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-6xl font-bold opacity-50 text-center text-primary">Register</h2>
          <img src={logo} alt="logo" className="w-36" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className='flex justify-between'>
            <div className="mb-4">
              <label className="block text-gray-2 text-sm font-bold mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                placeholder='John'
                onChange={handleChange}
                className="appearance-none rounded-sm border transition-all duration-200 hover:border-gray w-full py-2 px-3 text-gray leading-tight focus:outline-accent focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-2 text-sm font-bold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                placeholder='Doe'
                className="appearance-none rounded-sm border transition-all duration-200 hover:border-gray w-full py-2 px-3 text-gray leading-tight focus:outline-accent focus:shadow-outline"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-2 text-sm font-bold mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              placeholder='1234567890'
              maxLength="10"
              className="appearance-none rounded-sm border transition-all duration-200 hover:border-gray w-full py-2 px-3 text-gray leading-tight focus:outline-accent focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-2 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder='JohnDoe@gmail.com'
              className="appearance-none rounded-sm border transition-all duration-200 hover:border-gray w-full py-2 px-3 text-gray leading-tight focus:outline-accent focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-2 text-sm font-bold mb-2" htmlFor="aadharId">
              Aadhar ID
            </label>
            <input
              type="text"
              name="aadharId"
              value={user.aadharId}
              onChange={handleChange}
              maxLength="14" 
              placeholder="1111 2222 3333"
              className="appearance-none rounded-sm border transition-all duration-200 hover:border-gray w-full py-2 px-3 text-gray leading-tight focus:outline-accent focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-2 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="appearance-none rounded-sm border transition-all duration-200 hover:border-gray w-full py-2 px-3 text-gray leading-tight focus:outline-accent focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-2 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              className="appearance-none rounded-sm border transition-all duration-200 hover:border-gray w-full py-2 px-3 text-gray leading-tight focus:outline-accent focus:shadow-outline"
              required
            />
          </div>
          <div className='mt-5'>
            {message && <p className="mt-4 text-sm text-center text-success">{message}</p>}
            {error && <p className="mt-4 text-sm text-center text-error">{error}</p>}
          </div>
          <div className='mt-10 flex justify-between items-center'>
            <button
              type="submit"
              className="bg-accent hover:bg-purple text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
            <div className="text-sm text-center">
              <span className="text-gray-2">Already Registered? </span>
              <a href="/login" className="text-accent hover:underline">Login here</a>
            </div>
          </div>
        </form>
      </div>
      {showSplash && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray bg-opacity-50 z-20">
          <div className="backdrop-blur-lg bg-white p-4 border-2 border-gray-3 rounded shadow-2xl text-center">
            <p className="text-lg">Your User ID is:</p>
            <p className="text-2xl font-bold">{userId}</p>
            <button
              onClick={handleCopy}
              className="mt-2 text-purple font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={() => setShowSplash(false)}
              className="mt-2 hover:bg-gray-400 text-black font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <a href="/login" className="text-white my-2 rounded bg-accent py-1.5 px-4 hover:bg-purple ">Okay</a>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;

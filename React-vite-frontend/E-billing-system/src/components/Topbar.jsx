import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthContext } from '../context/AuthContext.jsx';
import classNames from 'classnames';

const Topbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const topbarClass = classNames(
    'fixed z-50 w-full transition-transform duration-300 ease-in-out',
    {
      'transform -translate-y-full': !isVisible,
    },
  );

  return (
    <div className={topbarClass}>
      <div className="backdrop-brightness-50 backdrop-blur-3xl p-2 shadow-lg">
        <div className="container mx-auto flex justify-between items-center text-white">
          <h1 className="text-2xl p-1 font-bold text-blue-gray-100">TANGEDCO</h1>
          <div className="flex items-center text-blue-gray-100 space-x-6">
            <Link to="/" className="hover:text-white transition duration-300">Home</Link>
            {!isAuthenticated ? (
              <>
              <div>
              <Link to="/login" className="hover:text-white transition duration-300">Login / </Link>
              <Link to="/register" className="hover:text-white transition duration-300">Register</Link>
              </div>
                
              </>
            ) : (
              <button
                onClick={logout}
                className="bg-blue-500 hover:bg-blue-600 text-white font- py-1 px-3 rounded-full transition duration-300"
              >
                Logout
              </button>
            )}
            <button className="hover:text-gray-200 font-bold hover:text-white transition duration-300">தமிழ்</button>
          </div>
        </div>
      </div>
      <Navbar/>
    </div>
  );
};

export default Topbar;

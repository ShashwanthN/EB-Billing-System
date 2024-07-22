import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthContext } from '../context/AuthContext.jsx';
import classNames from 'classnames';

const Topbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(true);
  const [userName, setUserName] = useState("");
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
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
          <h1 className="text-2xl p-1  font-bold text-gray-3"><Link to="/">TANGEDCO</Link></h1>
          <div className='flex absolute left-1/2 transform -translate-x-1/2 items-center text-[#bebebe] space-x-10'>
          <Link to="/" className="hover:text-white hover:bg- items-center transition duration-300">Home</Link>
          <Link to="/DisplayBills" className="hover:text-white items-center transition duration-300">Pay Bills</Link>
          <Link to="/MeterReadingDisplay" className="hover:text-white items-center transition duration-300">Past Readings</Link>
          <Link to="/CalculateBills" className="hover:text-white items-center transition duration-300">Billing Math</Link>
          </div>
          <div className="flex items-center text-blue-gray-100 space-x-6">
            

            
            <button className="hover:text-gray-200 font-bold hover:text-white transition duration-300">{userName}</button>
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
                <Link to={"/login"}>Logout</Link>
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

import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      const isTokenValid = checkTokenValidity(token);
      if (isTokenValid) {
        setUser(storedUser);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const checkTokenValidity = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      console.log(decodedToken.exp);
      return decodedToken.exp > currentTime;
      
    } catch (error) {
      return false;
    }
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

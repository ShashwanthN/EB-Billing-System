import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ServiceRegisteration from './pages/ServiceRegistration';

function App() {
  return (
    <Router>
      
      <div className='main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/serviceApplication" element={<ServiceRegisteration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

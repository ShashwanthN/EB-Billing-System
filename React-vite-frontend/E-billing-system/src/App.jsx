import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ServiceRegistration from './pages/ServiceRegistration';
import ApplicationConfirmation from './pages/ApplicationConfirmation';
import MeterReadingsDisplay from './pages/MeterReadingDisplay';
import CalculateBills from './pages/CalculateBills';
import DisplayBills from './pages/DisplayBills';
function App() {
  return (
    <Router>
      
      <div className='main'>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/serviceApplication" element={<ServiceRegistration />} />
          <Route path="/ApplicationConfirmation" element={<ApplicationConfirmation />} />
          <Route path="/MeterReadingDisplay" element={<MeterReadingsDisplay />} />
          <Route path="/CalculateBills" element={<CalculateBills />} />
          <Route path="/DisplayBills" element={<DisplayBills />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

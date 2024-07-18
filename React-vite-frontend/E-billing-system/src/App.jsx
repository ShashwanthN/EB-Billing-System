import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ServiceRegistration from './pages/ServiceRegistration';
import ApplicationConfirmation from './pages/ApplicationConfirmation';
import MeterReadingsDisplay from './pages/MeterReadingDisplay';
import CalculateBills from './pages/CalculateBills';
import DisplayBills from './pages/DisplayBills';
import { AuthProvider } from './context/AuthContext.jsx';  
import PrivateRoute from './components/PrivateRoute.jsx';
import Topbar from './components/Topbar.jsx'; // Import the Topbar component

const AppContent = () => {
  const location = useLocation();
  const hideNavPaths = ['/login', '/register'];

  return (
    <>
      {!hideNavPaths.includes(location.pathname) && <Topbar />}
      <div className=''>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/serviceApplication" element={<PrivateRoute><ServiceRegistration /></PrivateRoute>} />
          <Route path="/ApplicationConfirmation" element={<PrivateRoute><ApplicationConfirmation /></PrivateRoute>} />
          <Route path="/MeterReadingDisplay" element={<PrivateRoute><MeterReadingsDisplay /></PrivateRoute>} />
          <Route path="/CalculateBills" element={<PrivateRoute><CalculateBills /></PrivateRoute>} />
          <Route path="/DisplayBills" element={<PrivateRoute><DisplayBills /></PrivateRoute>} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='main'>
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

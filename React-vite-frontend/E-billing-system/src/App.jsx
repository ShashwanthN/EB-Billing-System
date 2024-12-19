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
import Topbar from './components/Topbar.jsx'; 
import PaymentPage from './pages/PaymentPage.jsx';
import PaymentSuccess from './pages/PaymentSuccess.jsx';
import UpdateInfo from './pages/UpdateInfo.jsx';
import PaymentSuccessService from './pages/PaymentSuccesService.jsx';
import "./index.css"
import ResetPassword from './pages/ResetPassword.jsx';
const AppContent = () => {
  const location = useLocation();
  const hideNavPaths = ['/login', '/register', '/resetPassword'];

  return (
    <>
      {!hideNavPaths.includes(location.pathname) && <Topbar />}
      <div className=''>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update" element={<PrivateRoute><UpdateInfo /></PrivateRoute>} />
          <Route path="/resetPassword" element={<ResetPassword/>} />
          <Route path="/Payment_Success/:billId" element={<PrivateRoute><PaymentSuccess/></PrivateRoute>} />
          <Route path="/payment/:userId/:readingId" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
          <Route path="/Payment_Success/Service/:connectionId/:connectionType" element={<PrivateRoute><PaymentSuccessService /></PrivateRoute>} />
          <Route path="/serviceApplication" element={<PrivateRoute><ServiceRegistration /></PrivateRoute>} />
          <Route path="/ApplicationConfirmation" element={<PrivateRoute><ApplicationConfirmation /></PrivateRoute>} />
          <Route path="/MeterReadingDisplay" element={<PrivateRoute><MeterReadingsDisplay /></PrivateRoute>} />
          <Route path="/CalculateBills" element={<CalculateBills />} />
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

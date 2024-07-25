import React, { useState } from 'react';
import axios from 'axios';

const OtpVerification = ({ phoneNumber, onSuccess }) => {
  const [otp, setOtp] = useState('');
  const [otpMessage, setOtpMessage] = useState('');
  const [otpError, setOtpError] = useState('');

  const handleValidateOtp = async () => {
    setOtpMessage('');
    setOtpError('');
    try {
      const response = await axios.post('http://localhost:8080/api/get/otp/validateOtp', {
        phoneNumber,
        otp,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setOtpMessage('OTP validated successfully.');
        onSuccess();
      } else {
        setOtpError('Invalid OTP.');
      }
    } catch (error) {
      setOtpError('Failed to validate OTP.');
    }
  };

  return (
    <div className="otp-verification">
      <h2 className="text-2xl font-bold mb-4">OTP Verification</h2>
      <div className="mb-4">
        <label className="block text-gray-3 text-sm font-bold mb-2" htmlFor="otp">
          Enter OTP
        </label>
        <input
          type="text"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="appearance-none rounded border border-gray bg-gray-5 transition-all transform duration-200 hover:border-gray w-full py-2 px-3 text-gray-3 focus:outline-none focus:shadow-outline"
          required
        />
        <button
          type="button"
          onClick={handleValidateOtp}
          className="mt-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        >
          Validate OTP
        </button>
      </div>
      {otpMessage && <p className="text-sm text-success">{otpMessage}</p>}
      {otpError && <p className="text-sm text-error">{otpError}</p>}
    </div>
  );
};

export default OtpVerification;

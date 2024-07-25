import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PasswordValidattor from 'react-password-validattor';
import axiosInstance from '../services/axiosInstance';

const ResetPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await axios.post('http://localhost:8080/api/get/otp/sendOtpForVerification', { email });
            if (response.data.statusCode === 200) {
                setStep(2);
                setMessage('OTP sent to your email.');
            } else {
                setError(response.data.responseMessage);
            }
        } catch (error) {
            setError('Error sending OTP: ' + error.message);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await axios.post('http://localhost:8080/users/otp/validate', { email, otp });
            if (response.data.statusCode === 200) {
                setStep(3);
            } else {
                setError('OTP validation failed: ' + response.data.responseMessage);
            }
        } catch (error) {
            setError('Error validating OTP: ' + error.message);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
    
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
    
        try {
            const response = await axiosInstance.post('http://localhost:8080/users/resetPassword', {
                email : email,
                password : password,
                otpValidationRequest: { email, otp },
            },{
                headers: {
                  "Content-Type": "application/json",
                },
              });
            if (response.data) {
                setMessage('Password reset successful.');
                navigate('/login');
            } else {
                setError('Password reset failed.');
            }
        } catch (error) {
            setError('Error resetting password: ' + error.message);
        }
    };
    

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {step === 1 && (
                <form onSubmit={handleEmailSubmit} className="w-full max-w-sm">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@domain.com"
                            className="appearance-none rounded border border-gray bg-gray-200 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                            required
                        />
                    </div>
                    {message && <p className="text-green-500">{message}</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="mb-6">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Send OTP
                        </button>
                    </div>
                </form>
            )}
            {step === 2 && (
                <form onSubmit={handleOtpSubmit} className="w-full max-w-sm">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">OTP</label>
                        <input
                            type="text"
                            name="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="appearance-none rounded border border-gray bg-gray-200 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                            required
                        />
                    </div>
                    {message && <p className="text-green-500">{message}</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="mb-6">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Validate OTP
                        </button>
                    </div>
                </form>
            )}
            {step === 3 && (
                <form onSubmit={handlePasswordSubmit} className="w-full max-w-sm">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">New Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            className="appearance-none rounded border border-gray bg-gray-200 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                            required
                        />
                        <PasswordValidattor
                            rules={[
                                "minLength",
                                "maxLength",
                                "specialChar",
                                "number",
                                "capital",
                                "matches",
                                "lowercase",
                                "notEmpty",
                                "shouldNotContain",
                            ]}
                            forbiddenWords={["John", "Doe"]}
                            minLength={8}
                            maxLength={32}
                            password={password}
                            confirmedPassword={confirmPassword}
                            iconSize={16}
                            onValidatorChange={setError}
                            config={{
                                showProgressBar: true,
                                showPasswordSuggestion: true,
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="********"
                            className="appearance-none rounded border border-gray bg-gray-200 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                            required
                        />
                    </div>
                    {message && <p className="text-green-500">{message}</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="mb-6">
                        <button
                            type="submit"
                            onClick={handlePasswordSubmit}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ResetPassword;

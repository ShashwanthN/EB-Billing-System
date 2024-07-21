import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import SuccessAnimation from '../components/SuccessAnimation';

const PaymentSuccess = () => {
  const { billId } = useParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const paymentId = new URLSearchParams(window.location.search).get('razorpay_payment_id');
        console.log('Payment ID:', paymentId);

        const response = await axiosInstance.get('/payment/redirect', {
          params: {
            payment_id: paymentId,
            Order_id: billId,
          },
        });
        console.log('Response:', response);

        setMessage(response.data.paymentStatus ? `Payment Status: ${response.data.paymentStatus}` : 'Payment status unknown.');

        console.log(paymentStatus);
        if (response.data.paymentStatus === 'Success') {
          setTimeout(() => {
            navigate('/DisplayBills');
          }, 3000);
        }
      } catch (error) {
        setError('Error processing payment.');
        console.error(error);
      }
    };

    fetchPaymentStatus();
  }, [billId, navigate]);

  return (
    <div className=" flex items-center justify-center min-h-screen bg-gray-1">
      <div className="text-center">
      <h1 className="text-2xl font-bold text-[#68E534] mt-4 mb-4">Payment Successful!</h1>
        <SuccessAnimation /> 
        {message && (
          <div>
            
            <p className="text-gray-3 mb-4 mt-4 text-center">Your transaction was successful</p>
            <p className="text-gray-2">Redirecting to your bills</p>
          </div>
        )}
        {error && (
          <div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Error</h1>
            <p className="text-gray-700">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;

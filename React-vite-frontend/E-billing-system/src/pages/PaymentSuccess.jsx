import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import SuccessAnimation from "../components/SuccessAnimation";
import bg from "../assets/bg-2.jpeg";

const PaymentSuccess = () => {
  const { billId } = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const paymentId = new URLSearchParams(window.location.search).get(
          "razorpay_payment_id"
        );
        console.log("Payment ID:", paymentId);

        const response = await axiosInstance.get("/payment/redirect", {
          params: {
            payment_id: paymentId,
            Order_id: billId,
          },
        });
        console.log("Response:", response);

        const paymentStatus = response.data.paymentStatus;
        setMessage(
          paymentStatus ? `Payment Status: ${paymentStatus}` : "Payment status unknown."
        );

        if (paymentStatus === "paid") {
          setTimeout(() => {
            navigate("/DisplayBills");
          }, 3000);
        }
      } catch (error) {
        setError("Error processing payment.");
        console.error(error);
      }
    };

    fetchPaymentStatus();
  }, [billId, navigate]);

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <img
        src={bg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />
      <div className="relative z-10 text-center backdrop-blur-md border backdrop-brightness-75 p-6 md:p-10 rounded-lg border-trueGray-500 max-w-lg mx-4">
        <h1 className="text-2xl font-bold text-[#68E534] mt-4 mb-4">
          Payment Successful!
        </h1>
        <SuccessAnimation />
        {message && (
          <div>
            <p className="text-gray-3 mb-4 mt-4 text-center">
              Your transaction was successful
            </p>
            <p className="text-warmGray-300">Redirecting to your bills</p>
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

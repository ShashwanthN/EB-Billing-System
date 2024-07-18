import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const { bill } = location.state;
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const handlePayment = async () => {
    try {
      const paymentRequest = {
        billId: bill.billId,
        paymentMethod,
        transactionId,
      };
      const response = await axios.post(
        "http://localhost:8080/api/payments",
        paymentRequest
      );
      alert("Payment successful!");
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Payment Page</h2>
      <div className="border p-4 rounded shadow-md max-w-lg mx-auto">
        <p className="font-semibold">
          Bill Amount: <span className="font-normal">₹{bill.amount}</span>
        </p>
        <div className="mt-4">
          <label className="block font-semibold mb-2">
            Payment Method:
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Payment Method</option>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="net_banking">Net Banking</option>
              <option value="upi">UPI</option>
            </select>
          </label>
        </div>
        <div className="mt-4">
          <label className="block font-semibold mb-2">
            Transaction ID:
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </label>
        </div>
        <button
          onClick={handlePayment}
          className="mt-4 bg-deep-purple-500 hover:bg-deep-purple-700 text-white p-2 rounded w-full"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;

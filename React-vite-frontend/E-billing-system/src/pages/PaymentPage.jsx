import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import bg from "../assets/bg-2.jpeg"
const PaymentPage = () => {
  const { userId, readingId } = useParams();
  const location = useLocation();
  const bill = location.state.bill;
  const [paymentLink, setPaymentLink] = useState("");

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const response = await axiosInstance.post(`/payment/process/${userId}/${readingId}`);
        setPaymentLink(response.data.paymentLink); 
      } catch (error) {
        console.error("Error initiating payment:", error);
      }
    };

    initiatePayment();
  }, [userId, readingId]);
  
  return (
    <div className="flex justify-center items-center h-screen">
      <img src={bg} alt="background" className="bg-full overflow-hidden brightness-50 hue-rotate-180 max-h-screen" />
      <div className="text-center w-full max-w-md backdrop-brightness-50 backdrop-blur-md border-gray-2 shadow-md text-gray-3 rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-white">Confirmation</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left ">
            <tbody>
              <tr>
                <td className="font-semibold p-2">User ID:</td>
                <td className=" p-2 text-end">{bill.userId}</td>
              </tr>
              <tr>
                <td className="font-semibold  p-2">Connection Type:</td>
                <td className="text-end p-2">{bill.connectionType}</td>
              </tr>
              <tr>
                <td className="font-semibold p-2">Reading Date:</td>
                <td className="text-end p-2">{new Date(bill.readingDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td className="font-semibold  p-2">Units Consumed:</td>
                <td className="text-end p-2">{bill.unitsConsumed}</td>
              </tr>
              <tr>
                <td className="font-semibold  p-2">Bill No:</td>
                <td className="text-end p-2">{bill.billId}</td>
              </tr>
              <tr>
                <td className="font-semibold  p-2">Amount:</td>
                <td className="text-end p-2 text-[#68E534] font-bold">₹{bill.amount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {paymentLink ? (
          <a href={paymentLink} className="btn btn-primary mt-6 inline-block bg-lightBlue-600 hover:bg-lightBlue-700 border-lightBlue-400 border text-white py-2 px-4 rounded">
            Click here to pay
          </a>
        ) : (
          <p className="mt-6">Loading payment link...</p>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import bg from "../assets/powerlines.jpg";

const ApplicationConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    userId,
    referenceNumber,
    connectionType,
    address,
    businessName,
    businessType,
    sqMeter,
    phase,
    loadRequired,
  } = location.state || {};
  const [paymentLink, setPaymentLink] = useState("");
  const [connectionId, setConnectionId] = useState(null);

  useEffect(() => {
    const fetchConnectionDetails = async () => {
      try {
        const response = await axiosInstance.get(`/connections/details`, {
          params: { userId, referenceNumber, connectionType },
        });
        setConnectionId(response.data.connectionId);
      } catch (error) {
        console.error("Error fetching connection details:", error);
      }
    };
    fetchConnectionDetails();
  }, [userId, referenceNumber, connectionType]);

  useEffect(() => {
    const initiatePayment = async () => {
      if (connectionId) {
        try {
          const response = await axiosInstance.post(
            `/payment/process/${userId}/${connectionId}/${connectionType}`
          );
          setPaymentLink(response.data.paymentLink);
        } catch (error) {
          console.error("Error initiating payment:", error);
        }
      }
    };
    initiatePayment();
  }, [connectionId, userId, connectionType]);
  const paymentCharges = [
    { slno: 1, description: "CC Deposit", amount: 150 },
    { slno: 2, description: "Development Charges", amount: 100 },
    { slno: 3, description: "Meter Caution Charges", amount: 300 },
    { slno: 4, description: "Registration Processing Charges", amount: 200 },
    { slno: 5, description: "Service Connection Charges", amount: 800 },
    { slno: 6, description: "CGST", amount: 150 },
    { slno: 7, description: "SGST", amount: 150 },
  ];

  const totalAmount = paymentCharges.reduce(
    (total, charge) => total + charge.amount,
    0
  );

  return (
    <div
      className="relative main-content h-screen overflow-scroll bg-cover bg-center"
      
    >
      <img
          src={bg}
          alt="background"
          className="bg-full overflow-hidden brightness-50 hue-rotate-15 max-h-screen"
        />
      <div className="min-h-screen pb-2 md:px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto backdrop-blur-2xl backdrop-brightness-50 border-gray-2 text-gray-3 md:border shadow-lg md:rounded overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center items-center">
              <h2 className="text-3xl font-bold text-left py-5 text-gray-800">
                Application Confirmation
              </h2>
              <p className="mt-4 text-lg bg-green-100 p-5 rounded-lg border border-green-500 text-green-700">
                Your application reference number is:{" "}
                <strong>{referenceNumber || "Not Available"}</strong>
              </p>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-gray-700">
                Details Provided
              </h3>
              <div className="bg-gray-100 border-gray-2 border rounded p-6 mb-6 shadow-sm">
                <p className="text-sm mb-2">
                  <strong className="font-semibold">User ID:</strong> {userId}
                </p>
                <p className="text-sm mb-2">
                  <strong className="font-semibold">Address:</strong> {address}
                </p>
                <p className="text-sm mb-2">
                  <strong className="font-semibold">Load Required:</strong>{" "}
                  {loadRequired}
                </p>
                <p className="text-sm mb-2">
                  <strong className="font-semibold">Phase:</strong> {phase}
                </p>
                {connectionType === "commercial" && (
                  <>
                    <p className="text-sm mb-2">
                      <strong className="font-semibold">Business Name:</strong>{" "}
                      {businessName}
                    </p>
                    <p className="text-sm mb-2">
                      <strong className="font-semibold">Business Type:</strong>{" "}
                      {businessType}
                    </p>
                    <p className="text-sm mb-2">
                      <strong className="font-semibold">Square Meters:</strong>{" "}
                      {sqMeter}
                    </p>
                  </>
                )}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-700">
                Payment Charges
              </h3>
              <div className="bg-gray-1 shadow-sm border-gray-2 border rounded overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                        SL No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                        Amount (Rs.)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentCharges.map((charge, index) => (
                      <tr
                        key={charge.slno}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-5"}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {charge.slno}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {charge.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {charge.amount}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-100">
                      <td
                        className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900"
                        colSpan="2"
                      >
                        Total Amount
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {totalAmount}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-6 text-center">
              {paymentLink ? (
                <a
                  href={paymentLink}
                  className="inline-block bg-lightBlue-600 hover:bg-lightBlue-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-300"
                >
                  Proceed to Payment
                </a>
              ) : (
                <p className="mt-6">Loading payment link...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationConfirmation;

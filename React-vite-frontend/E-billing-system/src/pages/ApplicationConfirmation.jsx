import React from 'react';
import { useLocation } from 'react-router-dom';
import Topbar from '../components/Topbar';
import bg from '../assets/powerlines.jpg'
const ApplicationConfirmation = () => {
  const location = useLocation();
  const { paymentUrl, referenceNumber, userId, address, loadRequired, phase, connectionType, businessName, businessType, sqMeter } = location.state || {};

  console.log('Location State:', location.state); 
  console.log('Reference Number:', referenceNumber); 

  const paymentCharges = [
    { slno: 1, description: 'CC Deposit', amount: 5000 },
    { slno: 2, description: 'Development Charges', amount: 10000 },
    { slno: 3, description: 'Meter Caution Charges', amount: 3000 },
    { slno: 4, description: 'Registration Processing Charges', amount: 2000 },
    { slno: 5, description: 'Service Connection Charges', amount: 8000 },
    { slno: 6, description: 'CGST', amount: 1500 },
    { slno: 7, description: 'SGST', amount: 1500 },
  ];

  const totalAmount = paymentCharges.reduce((total, charge) => total + charge.amount, 0);

  return (
    <div className="relative h-screen overflow-scroll  bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>

    
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        
      <div className="max-w-4xl mx-auto bg-white border-gray-3 border shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center items-center">
            <h2 className="text-3xl font-bold text-left py-5 text-gray-800">Application Confirmation</h2>
            <p className="mt-4 text-lg bg-green-100 p-5 rounded-lg text-green-700">
              Your application reference number is: <strong>{referenceNumber || 'Not Available'}</strong>
            </p>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 text-gray-700">Details Provided</h3>
            <div className="bg-gray-100 border-gray-3 border rounded-lg p-6 mb-6 shadow-sm">
              <p className="text-sm mb-2"><strong className="font-semibold">User ID:</strong> {userId}</p>
              <p className="text-sm mb-2"><strong className="font-semibold">Address:</strong> {address}</p>
              <p className="text-sm mb-2"><strong className="font-semibold">Load Required:</strong> {loadRequired}</p>
              <p className="text-sm mb-2"><strong className="font-semibold">Phase:</strong> {phase}</p>
              {connectionType === 'commercial' && (
                <>
                  <p className="text-sm mb-2"><strong className="font-semibold">Business Name:</strong> {businessName}</p>
                  <p className="text-sm mb-2"><strong className="font-semibold">Business Type:</strong> {businessType}</p>
                  <p className="text-sm mb-2"><strong className="font-semibold">Square Meters:</strong> {sqMeter}</p>
                </>
              )}
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-700">Payment Charges</h3>
            <div className="bg-white shadow-sm border-gray-3 border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">SL No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Amount (Rs.)</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentCharges.map((charge, index) => (
                    <tr key={charge.slno} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{charge.slno}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{charge.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{charge.amount}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900" colSpan="2">Total Amount</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{totalAmount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a href={paymentUrl} className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-300">
              Proceed to Payment
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ApplicationConfirmation;

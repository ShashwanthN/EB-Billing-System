import React, { useState } from 'react';
import Topbar from '../components/Topbar';
import bg from '../assets/bg-2.jpeg';

const CalculateBills = () => {
  const [connectionType, setConnectionType] = useState('');
  const [units, setUnits] = useState('');
  const [bill, setBill] = useState(null);

  const calculateHouseholdBill = (units) => {
    if (units <= 50) return 0;
    if (units <= 100) return (units - 50) * 2;
    if (units <= 300) return 50 * 2 + (units - 100) * 4;
    if (units > 100000) return null;
    return 50 * 2 + 200 * 4 + (units - 300) * 6;
  };

  const calculateCommercialBill = (units) => {
    if (units <= 20) return 0;
    if (units <= 100) return (units - 20) * 4;
    if (units <= 200) return 80 * 4 + (units - 100) * 6;
    if (units > 100000) return null;
    return 80 * 4 + 100 * 6 + (units - 200) * 8;
  };

  const handleCalculate = () => {
    if (connectionType === 'household') {
      setBill(calculateHouseholdBill(Number(units)));
    } else if (connectionType === 'commercial') {
      setBill(calculateCommercialBill(Number(units)));
    }
  };

  return (
    <div className='main-content'>
      <img src={bg} alt="background" className="bg-full overflow-hidden brightness-50 hue-rotate-30 max-h-screen" />
      <div className="container h-[calc(100vh-4rem)] flex justify-center items-center mx-auto lg:p-4">
        <div className="sm:border w-full lg:w-3/5 divide-x text-gray-3 divide-gray-2 backdrop-brightness-50 backdrop-blur-md border-gray-2 p-10 rounded flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 lg:pr-10 mb-8 lg:mb-0">
            <h2 className="lg:text-3xl text-xl font-bold mb-6 text-start">Electricity Bill Calculator</h2>
            <div className="mb-6">
              <select
                className="border w-full text-gray-2 bg-transparent p-2 rounded"
                value={connectionType}
                onChange={(e) => setConnectionType(e.target.value)}
              >
                <option value="" disabled>Select Connection Type</option>
                <option value="household">Household</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            {connectionType && (
              <div className="mb-6">
                <input
                  type="number"
                  className="border p-2 bg-transparent border-gray-2 rounded w-full mb-4"
                  placeholder="Enter units consumed"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                />
                <div className="text-end mt-4">
                  <button
                    onClick={handleCalculate}
                    className="bg-light-blue-600 hover:bg-light-blue-700 text-white p-2 px-4 rounded"
                  >
                    Calculate Bill
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="w-full lg:w-1/2 flex text-gray-4 items-center justify-center">
            {bill !== null && (
              <div className="text-center">
                <p className="text-2xl font-semibold"><span className='text-gray-3'>Total Bill: </span>₹{bill}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculateBills;

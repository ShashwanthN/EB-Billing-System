import React, { useState } from 'react';
import Topbar from '../components/Topbar';
import bg from '../assets/bg-2.jpeg'
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
      <img src={bg} alt="background" className="bg-full overflow-hidden  max-h-screen" />
      <div className="container h-[calc(100vh-4rem)] flex justify-center  items-center mx-auto p-4">
        <div className="border w-3/5 divide-x text-gray divide-gray-4 backdrop-blur-2xl  border-gray-3 p-10 rounded flex">
          <div className="w-1/2 pr-10">
            <h2 className="text-3xl font-bold mb-6 text-start">Electricity Bill Calculator</h2>
            <div className="mb-6">
              <select
                className="border w-full text-gray-700 p-2 rounded"
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
                  className="border p-2 rounded w-full mb-4"
                  placeholder="Enter units consumed"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                />
                <div className="text-end mt-4">
                  <button
                    onClick={handleCalculate}
                    className="bg-blue-gray-200 hover:bg-blue-gray-400 text-white p-2 px-4 rounded"
                  >
                    Calculate Bill
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="w-1/2 flex text-gray items-center justify-center">
            {bill !== null && (
              <div className="text-center">
                <p className="text-2xl font-semibold"><span className='text-blue-gray-400'>Total Bill: </span>₹{bill}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculateBills;

import React, { useState } from 'react';
import axios from 'axios';
import Topbar from '../components/Topbar';

const DisplayBills = () => {
  const [userId, setUserId] = useState('');
  const [unpaidReadings, setUnpaidReadings] = useState([]);
  const [generatedBills, setGeneratedBills] = useState([]);

  const fetchUnpaidReadings = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/readings/user/${userId}/unpaid`);
      const sortedReadings = response.data.sort((a, b) => new Date(b.readingDate) - new Date(a.readingDate));
      setUnpaidReadings(sortedReadings);
    } catch (error) {
      console.error('Error fetching unpaid readings:', error);
    }
  };

  const generateBills = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/readings/generate-bills`);
      setGeneratedBills(response.data);
    } catch (error) {
      console.error('Error generating bills:', error);
    }
  };

  return (
    <div>
      <Topbar />
      <div className="container  flex flex-col justify-center items-center mx-auto p-4">
        <div className='border w-2/3 text-deep-purple-200 border-gray-300 p-10 rounded'>
          <h2 className="text-3xl font-bold mb-6 text-center">Unpaid Bills</h2>
          <div className="mb-6 flex flex-col items-center">
            <input
              type="text"
              className="border p-2 rounded w-full mb-4"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={fetchUnpaidReadings} className="mb-6 p-2 bg-blue-500 text-white rounded">
              Fetch Unpaid Readings
            </button>
          </div>
          <button onClick={generateBills} className="mb-6 p-2 bg-blue-500 text-white rounded">
            Generate Bills
          </button>
          {unpaidReadings.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {unpaidReadings.map((reading) => (
                <div key={reading.readingId} className="p-4 border rounded shadow-sm bg-white">
                  <p className="font-semibold">User ID: <span className="font-normal">{reading.userId}</span></p>
                  <p className="font-semibold">Connection Type: <span className="font-normal">{reading.connectionType}</span></p>
                  <p className="font-semibold">Reading Date: <span className="font-normal">{new Date(reading.readingDate).toLocaleDateString()}</span></p>
                  <p className="font-semibold">Units Consumed: <span className="font-normal">{reading.unitsConsumed}</span></p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No unpaid readings found.</p>
          )}

          {generatedBills.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mt-6 mb-4 text-center">Generated Bills</h2>
              <div className="grid grid-cols-1 gap-4">
                {generatedBills.map((bill) => (
                  <div key={bill.billId} className="p-4 border rounded shadow-sm bg-white">
                    <p className="font-semibold">Bill ID: <span className="font-normal">{bill.billId}</span></p>
                    <p className="font-semibold">Reading ID: <span className="font-normal">{bill.meterReading.readingId}</span></p>
                    <p className="font-semibold">Bill Date: <span className="font-normal">{new Date(bill.billDate).toLocaleDateString()}</span></p>
                    <p className="font-semibold">Amount: <span className="font-normal">{bill.amount.toFixed(2)}</span></p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayBills;

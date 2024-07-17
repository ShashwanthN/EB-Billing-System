import React, { useState } from 'react';
import axios from 'axios';
import Topbar from '../components/Topbar';
import bg from '../assets/bg-2.jpeg'
const DisplayBills = () => {
  const [userId, setUserId] = useState('');
  const [unpaidReadingsWithBills, setUnpaidReadingsWithBills] = useState([]);

  const fetchUnpaidReadingsWithBills = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/readings/user/${userId}/unpaid`);
      const sortedReadings = response.data.sort((a, b) => new Date(b.meterReadings.readingDate) - new Date(a.meterReadings.readingDate));
      setUnpaidReadingsWithBills(sortedReadings);
    } catch (error) {
      console.error('Error fetching unpaid readings with bills:', error);
    }
  };

  return (
    <div>
      <Topbar />
      <img src={bg} alt="background" className="bg-full overflow-hidden  max-h-screen" />
      <div className="container flex flex-col justify-center  pt-10 items-center mx-auto p-4">
        <div className='border w-2/3 text-gray border-gray-3 backdrop-blur-xl p-10 rounded'>
          <h2 className="text-3xl font-bold text-gray  mb-6 text-center">Unpaid Bills</h2>
          <div className="mb-6 flex  items-center">
            <input
              type="text"
              className="border p-2 rounded mr-2 w-full"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={fetchUnpaidReadingsWithBills} className=" w-1/3 p-2 ml-2 bg-deep-purple-300 hover:bg-deep-purple-500 text-white rounded">
              Fetch Unpaid Bills
            </button>
          </div>

          {unpaidReadingsWithBills.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {unpaidReadingsWithBills.map(({ meterReadings, bill }) => (
                <div key={meterReadings.readingId} className="p-4 border justify-between flex border-gray-4 rounded shadow-sm">
                  <div>
                  <p className="font-semibold">User ID: <span className="font-normal">{meterReadings.userId}</span></p>
                  <p className="font-semibold">Connection Type: <span className="font-normal">{meterReadings.connectionType}</span></p>
                  <p className="font-semibold">Reading Date: <span className="font-normal">{new Date(meterReadings.readingDate).toLocaleDateString()}</span></p>
                  <p className="font-semibold">Units Consumed: <span className="font-normal">{meterReadings.unitsConsumed}</span></p>
                  <p className="font-semibold ">Bill No: <span className="font-normal">{bill.billId}</span></p>
                  </div>
                  {bill && (
                    <>
                    <div className=' justify-center items-end flex flex-col '>
                      <div className=''>
                      
                      <p className="font-semibold"><span className="font-bold text-deep-purple-400 text-3xl">{bill.amount}</span></p>
                      </div>
                    
                    </div>
                      
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No unpaid readings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayBills;

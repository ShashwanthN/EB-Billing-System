import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import Topbar from "../components/Topbar";
import bg from "../assets/bg-2.jpeg";
import { useNavigate } from "react-router-dom";

const DisplayBills = () => {
  const [userId, setUserId] = useState("");
  const [unpaidReadingsWithBills, setUnpaidReadingsWithBills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.userId) {
      setUserId(storedUser.userId);
      fetchUnpaidReadingsWithBills(storedUser.userId);
    }
  }, []);

  const fetchUnpaidReadingsWithBills = async (userId) => {
    try {
      const response = await axiosInstance.get(`/readings/user/${userId}/unpaid`);
      const sortedReadings = response.data.sort(
        (a, b) => new Date(b.meterReadings.readingDate) - new Date(a.meterReadings.readingDate)
      );
console.log("fetched");
console.log("it");
      setUnpaidReadingsWithBills(sortedReadings);
    } catch (error) {
      console.error("Error fetching unpaid readings with bills:", error);
    }
  };

  const handlePayment = (bill) => {
    navigate(`/payment/${userId}/${bill.readingId}`, { state: { bill } });
  };

  const formatReadingDate = (readingDate) => {
    const date = new Date(readingDate);
    return date.toLocaleDateString();
  };

  return (
    <div className="main-content">
      <img
        src={bg}
        alt="background"
        className="bg-full overflow-hidden brightness-50 hue-rotate-90 max-h-screen"
      />
      <div className="container flex flex-col justify-center items-center mx-auto p-4">
        <div className="border w-2/3 text-gray-3 border-gray-2 shadow-md backdrop-brightness-50 backdrop-blur-2xl p-10 rounded-lg">
          <h2 className="text-7xl font-bold text-gray-4 mb-6 text-start pb-2">
            Unpaid Bills
          </h2>
          {/* <div className="mb-6 flex items-center">
            <div className="border border-gray-2 p-2 pl-2 bg-gray-5 focus:outline-deep-purple-500 rounded w-full">
              {userId}
            </div>
          </div> */}

          {unpaidReadingsWithBills.length > 0 ? (
            <div className="grid grid-cols-1 backdrop-blur-3xl">
              {unpaidReadingsWithBills.map(({ meterReadings, bill }) => (
                <div
                  key={meterReadings.readingId}
                  className="justify-between flex border-b py-4 border-b-gray-2 shadow-sm"
                >
                  <div>
                    <p className="font-semibold">
                      User ID:{" "}
                      <span className="font-bold text-lightBlue-400">
                        {meterReadings.userId}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Connection Type:{" "}
                      <span className="font-normal">
                        {meterReadings.connectionType}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Reading Date:{" "}
                      <span className="font-normal text-end">
                        {formatReadingDate(meterReadings.readingDate)}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Units Consumed:{" "}
                      <span className="font-normal">
                        {meterReadings.unitsConsumed}
                      </span>
                    </p>
                    <p className="font-semibold ">
                      Bill No:{" "}
                      <span className="font-normal">{bill.billId}</span>
                    </p>
                  </div>
                  {bill && (
                    <div className="flex flex-col justify-between items-center h-full">
                      <div className="text-center">
                        <p className="font-semibold">
                          <span className="font-bold text-gray-3 text-3xl">₹{bill.amount}</span>
                        </p>
                      </div>
                      <div className="w-full">
                        <button
                          onClick={() => handlePayment({ ...meterReadings, ...bill })}
                          className="border border-lightBlue-600 p-2 mt-2 bg-lightBlue-700 hover:bg-lightBlue-800 text-white rounded w-full"
                        >
                          Pay Now
                        </button>
                      </div>
                    </div>
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

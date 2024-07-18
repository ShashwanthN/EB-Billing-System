import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import Topbar from "../components/Topbar";
import bg from "../assets/bg-2.jpeg";

const DisplayBills = () => {
  const [userId, setUserId] = useState("");
  const [unpaidReadingsWithBills, setUnpaidReadingsWithBills] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.userId) {
      console.log('Stored User ID:', storedUser.userId);
      setUserId(storedUser.userId);
      fetchUnpaidReadingsWithBills(storedUser.userId);
    }
  }, []);

  const fetchUnpaidReadingsWithBills = async (userId) => {
    try {
      const response = await axiosInstance.get(`/readings/user/${userId}/unpaid`);
      const sortedReadings = response.data.sort(
        (a, b) =>
          new Date(b.meterReadings.readingDate) -
          new Date(a.meterReadings.readingDate)
      );
      setUnpaidReadingsWithBills(sortedReadings);
    } catch (error) {
      console.error("Error fetching unpaid readings with bills:", error);
    }
  };

  return (
    <div className="main-content">
      
      <img
        src={bg}
        alt="background"
        className="bg-full overflow-hidden brightness-50  hue-rotate-90 max-h-screen"
      />
      <div className="container flex flex-col justify-center   items-center mx-auto p-4">
        <div className="border w-2/3 text-gray-3 border-gray-2 shadow-md backdrop-brightness-50 backdrop-blur-2xl p-10 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-4 mb-6 text-center pb-2">
            Unpaid Bills
          </h2>
          <div className="mb-6 flex  items-center">
            <div
             
              className="border border-gray-2 p-2 pl-2 bg-gray-5 focus:outline-deep-purple-500 rounded w-full"
              
            >{userId}</div>
                        {/* <button
              onClick={() => fetchUnpaidReadingsWithBills(userId)}
              className="border border-deep-purple-200 w-1/3 p-2 ml-2 bg-deep-purple-300 hover:bg-deep-purple-500 text-white rounded"
            >
              Fetch Unpaid Bills
            </button> */}
          </div>

          {unpaidReadingsWithBills.length > 0 ? (
            <div className="grid grid-cols-1 backdrop-blur-3xl">
              {unpaidReadingsWithBills.map(({ meterReadings, bill }) => (
                <div
                  key={meterReadings.readingId}
                  className=" justify-between flex border-b py-4 border-b-gray-2  shadow-sm"
                >
                  <div>
                    <p className="font-semibold">
                      User ID:{" "}
                      <span className="font-normal text-blue-700">
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
                      <span className="font-normal">
                        {new Date(
                          meterReadings.readingDate
                        ).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Units Consumed:{" "}
                      <span className="font-normal text-blue-700">
                        {meterReadings.unitsConsumed}
                      </span>
                    </p>
                    <p className="font-semibold ">
                      Bill No:{" "}
                      <span className="font-normal">{bill.billId}</span>
                    </p>
                  </div>
                  {bill && (
                    <>
                      <div className=" justify-center items-end flex flex-col ">
                        <div className="">
                          <p className="font-semibold">
                            <span className="font-bold text-gray-3 text-3xl">
                              ₹{bill.amount}
                            </span>
                          </p>
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

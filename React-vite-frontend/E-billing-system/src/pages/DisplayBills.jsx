import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import Topbar from "../components/Topbar";
import bg from "../assets/bg-2.jpeg";
import { useNavigate } from "react-router-dom";

const DisplayBills = () => {
  const [userId, setUserId] = useState("");
  const [unpaidReadingsWithBills, setUnpaidReadingsWithBills] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.userId) {
      setUserId(storedUser.userId);
      fetchUnpaidReadingsWithBills(storedUser.userId);
    }
  }, []);

  const fetchUnpaidReadingsWithBills = async (userId) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/readings/user/${userId}/unpaid`);
      const sortedReadings = response.data.sort(
        (a, b) => new Date(b.meterReadings.readingDate) - new Date(a.meterReadings.readingDate)
      );
      console.log("fetched");
      console.log("it");
      setUnpaidReadingsWithBills(sortedReadings);

    } catch (error) {
      console.error("Error fetching unpaid readings with bills:", error);
    } finally {
      setLoading(false);
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
    <div className="main-content scroll-smooth">
      {loading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )}
      <div className={`loading-bar ${loading ? "loading" : ""}`}></div>
      <img
        src={bg}
        alt="background"
        className="bg-full overflow-hidden brightness-50 hue-rotate-90 max-h-screen"
      />
      <div className="container scroll-smooth flex flex-col justify-center items-center mx-auto lg:p-4">
        <div className="lg:border w-full lg:w-2/3 backdrop-blur-3xl backdrop-brightness-50 text-gray-3 border-gray-2 shadow-md p-4 lg:p-10 sm:rounded-lg">
          <h2 className="text-3xl lg:text-7xl font-bold text-gray-4 mb-4 lg:mb-6 text-start pb-2">
            Unpaid Bills
          </h2>

          {unpaidReadingsWithBills.length > 0 ? (
            <div className="grid grid-cols-1 backdrop-blur-3xl">
              {unpaidReadingsWithBills.map(({ meterReadings, bill }) => (
                <div
                  key={meterReadings.readingId}
                  className="flex flex-col lg:flex-row justify-between border-gray-2 border rounded px-4 mb-5 p-4 shadow-sm"
                >
                  <div className="mb-4 lg:mb-0">
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
                      <span className="font-normal">
                        {formatReadingDate(meterReadings.readingDate)}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Units Consumed:{" "}
                      <span className="font-normal">
                        {meterReadings.unitsConsumed}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Bill No:{" "}
                      <span className="font-normal">{bill.billId}</span>
                    </p>
                  </div>
                  {bill && (
                    <div className="flex lg:flex-col justify-between items-center h-full">
                      <div className="text-center lg:mb-0">
                        <p className="font-semibold text-center">
                          <span className="font-bold text-white text-3xl">
                            ₹{bill.amount}
                          </span>
                        </p>
                      </div>
                      <div className="w-full flex justify-end">
                        <button
                          onClick={() =>
                            handlePayment({ ...meterReadings, ...bill })
                          }
                          className="bg-lightBlue-600 hover:bg-lightBlue-700 text-white font- py-2 px-3 rounded-md transition shadow-xl hover:shadow-none hover:outline-none outline outline-1 hover:text-trueGray-300 outline-light-blue-900 duration-300"
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

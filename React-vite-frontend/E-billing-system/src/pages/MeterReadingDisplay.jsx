import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import { format, startOfMonth, addMonths } from "date-fns";
import Topbar from "../components/Topbar";
import bg from "../assets/bg-2.jpeg";
import { FaFileDownload } from "react-icons/fa";
const MeterReadingsDisplay = () => {
  const [userId, setUserId] = useState("");
  const [readings, setReadings] = useState([]);
  const [error, setError] = useState("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.userId) {
      setUserId(storedUser.userId);
      fetchReadings(storedUser.userId);
    }
  }, []);

  const fetchReadings = async (userId) => {
    try {
      const response = await axiosInstance.get(`readings/user/${userId}`);
      setReadings(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch the readings. Please check the user ID.");
      setReadings([]);
    }
  };

  const groupReadingsByType = (type) => {
    return readings.reduce((acc, reading) => {
      if (reading.connectionType !== type) return acc;
      const month = format(new Date(reading.readingDate), "yyyy-MM");
      if (!acc[month]) acc[month] = { unitsConsumed: 0, paymentStatus: "", readingId: null };
      acc[month].unitsConsumed += reading.unitsConsumed;
      acc[month].paymentStatus = reading.paymentStatus;
      acc[month].readingId = reading.readingId;
      return acc;
    }, {});
  };

  const householdReadings = groupReadingsByType("household");
  const commercialReadings = groupReadingsByType("commercial");

  const monthsArray = Array.from({ length: 12 }, (_, i) =>
    startOfMonth(addMonths(new Date(currentYear, 0, 1), i))
  );

  const handleDownloadReceipt = async (readingId) => {
    try {
      const response = await axiosInstance.get(`/payment/receipt/${readingId}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `receipt_${readingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the receipt', error);
    }
  };

  return (
    <div className="main-content ">
      <img
        src={bg}
        alt="background"
        className="bg-full overflow-hidden  brightness-50 hue-rotate-60 max-h-screen"
      />
      <div className="container pt-10 backdrop-blur-lg min-w-full mx-auto items-center p-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-3 text-center">
          Meter Readings
        </h2>
        <div className="mb-6 flex justify-center">
          <div className="text-center p-2 px-10 text-3xl rounded focus:outline-2 outline-deep-purple-400 border-gray-4 font-bold text-lightBlue-400">
            {userId}
          </div>
        </div>
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}
        {readings.length > 0 && (
          <div>
            <div className="flex divide-x divide-gray-4 justify-center mb-6">
              <button
                onClick={() => setCurrentYear(currentYear - 1)}
                className="pr-4 flex bg-gray-300 hover:bg-gray-400 text-gray-3"
              >
                <div className="text-gray-4 mr-2">&larr;</div> Previous Year
              </button>
              <button
                onClick={() => setCurrentYear(currentYear + 1)}
                className="pl-4 bg-gray-300 flex hover:bg-gray-400 text-gray-3"
              >
                Next Year <div className="text-gray-4 ml-2">&rarr;</div>
              </button>
            </div>
            <div className="flex text-white justify-center">
              <div className="w-1/2 p-4">
                <h3 className="text-xl font-semibold mb-4">Household</h3>
                <div className="grid grid-cols-2 gap-4">
                  {monthsArray.map((date) => {
                    const monthKey = format(date, "yyyy-MM");
                    const reading = householdReadings[monthKey] || {
                      unitsConsumed: 0,
                      paymentStatus: "",
                      readingId: null,
                    };
                    return (
                      <div
                        key={monthKey}
                        className={`border border-deep-purple-200 p-4 rounded ${
                          reading.unitsConsumed
                            ? "bg-gradient-to-tl from-deep-purple-700 to-gray-5 shadow-sm"
                            : "bg-deep-purple-50"
                        }`}
                      >
                                                <div className="flex justify-between ">
                        <div className="text-deep-purple-200 text-2xl italic font-semibold">
                          {format(date, "MMMM yyyy")}
                        </div>
                        <div>
                        {reading.paymentStatus === 'paid' && (
                              <button
                                onClick={() => handleDownloadReceipt(reading.readingId)}
                                className=" text-deep-purple-700 bg-white hover:bg-deep-purple-700 hover:text-white border border-deep-purple-400 text-sm font-bold py-2 px-4 rounded"
                              >
                                <FaFileDownload />
                              </button>
                            )}
                          </div>
                          </div>
                        {reading.unitsConsumed > 0 ? (
                          <div className="flex mt-8 justify-between">
                            <div className={`text-sm  text-white p-0.5 px-2 rounded-full border ${reading.paymentStatus === 'not_paid' ? 'border-red-200 bg-red-500' : 'border-green-200 bg-green-500'} text-end font-bold`}>
                              {reading.paymentStatus.replace('_', ' ')}
                            </div>
                            <div className="text-md  text-deep-purple-50 text-end font-bold">
                              {reading.unitsConsumed} units
                            </div>
                            {/* {reading.paymentStatus === 'paid' && (
                              <button
                                onClick={() => handleDownloadReceipt(reading.readingId)}
                                className="mt-10 text-white bg-blue-500 hover:bg-blue-700 text-sm font-bold py-2 px-4 rounded"
                              >
                                Download Receipt
                              </button>
                            )} */}
                          </div>
                        ) : (
                          <div className="text-md mt-8 text-deep-purple-500 text-end font-bold">
                            No data
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="w-1/2 p-4">
                <h3 className="text-xl font-semibold mb-4">Commercial</h3>
                <div className="grid grid-cols-2 gap-4">
                  {monthsArray.map((date) => {
                    const monthKey = format(date, "yyyy-MM");
                    const reading = commercialReadings[monthKey] || {
                      unitsConsumed: 0,
                      paymentStatus: "",
                      readingId: null,
                    };
                    return (
                      <div
                        key={monthKey}
                        className={`border p-4 border-lightBlue-300 text-center rounded ${
                          reading.unitsConsumed
                            ? "bg-gradient-to-tl from-lightBlue-700 to-gray-5 shadow-sm"
                            : "bg-lightBlue-50"
                        }`}
                      >
                        <div className="flex justify-between ">
                        <div className="text-lightBlue-200 text-2xl italic font-semibold">
                          {format(date, "MMMM yyyy")}
                        </div>
                        <div>
                        {reading.paymentStatus === 'paid' && (
                              <button
                                onClick={() => handleDownloadReceipt(reading.readingId)}
                                className=" text-light-blue-700 bg-white hover:bg-light-blue-700 hover:text-white border border-light-blue-400 text-sm font-bold py-1.5 px-4 rounded"
                              >
                                <FaFileDownload/>
                              </button>
                            )}
                          </div>
                          </div>
                       
                        {reading.unitsConsumed > 0 ? (
                          <div className="flex mt-8 justify-between">
                            <div
                              className={`text-sm  text-white p-0.5 px-2 rounded-full border ${
                                reading.paymentStatus === "not_paid"
                                  ? "border-red-200 bg-red-600"
                                  : "border-green-200 bg-green-500"
                              } text-end font-bold`}
                            >
                              {reading.paymentStatus.replace("_", " ")}
                            </div>
                            <div className="text-md text-lightBlue-50 text-end font-bold">
                              {reading.unitsConsumed} units
                            </div>
                            
                          </div>
                        ) : (
                          <div className="text-md mt-8 text-lightBlue-500 text-end font-bold">
                            No data
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeterReadingsDisplay;

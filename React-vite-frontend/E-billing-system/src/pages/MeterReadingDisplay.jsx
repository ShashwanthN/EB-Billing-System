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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedType, setSelectedType] = useState("household");
const [loading, setLoading] = useState(false);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.userId) {
      setUserId(storedUser.userId);
      fetchReadings(storedUser.userId);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchReadings = async (userId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`readings/user/${userId}`);
      setReadings(response.data);
      console.log();
      setError("");
      if (response.data.length === 0) {
        setError("No readings exist for you. Please check if you have registered or else connect support.");
        setReadings([]);  
        return;
    }
    } catch (err) {
      setError("Failed to fetch the readings. Please check the user ID.");
      setReadings([]);
    } finally {
      setLoading(false);
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
    <div className="main-content">
       {loading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )}
      <div className={`loading-bar ${loading ? "loading" : ""}`}></div>
      <img
        src={bg}
        alt="background"
        className="bg-full overflow-hidden brightness-50 hue-rotate-60 max-h-screen"
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
                className="pr-4 hover:text-light-blue-400 flex bg-gray-300 hover:bg-gray-400 text-gray-3"
              >
                <div className="text-gray-4 mr-2 ">&larr;</div> Previous Year
              </button>
              <button
                onClick={() => setCurrentYear(currentYear + 1)}
                className="pl-4 bg-gray-300 hover:text-light-blue-400 flex hover:bg-gray-400 text-gray-3"
              >
                Next Year <div className="text-gray-4 ml-2">&rarr;</div>
              </button>
            </div>
            {isMobile ? (
              <div className="mb-4 text-center">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="p-2 border bg-transparent w-full text-white border-gray-3 rounded"
                >
                  <option value="household">Household</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center">
                <div className="w-full md:w-1/2 p-4">
                  <h3 className="text-xl text-white font-semibold mb-4">Household</h3>
                  <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
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
                                  className="text-deep-purple-700 transition-all transform duration-300 bg-deep-purple-50 hover:bg-deep-purple-700 hover:text-white border border-deep-purple-400 text-sm font-bold py-1.5 px-4 rounded"
                                >
                                  <FaFileDownload />
                                </button>
                              )}
                            </div>
                          </div>
                          {reading.unitsConsumed > 0 ? (
                            <div className="flex mt-8 justify-between">
                              <div className={`text-sm text-white p-0.5 px-2 rounded-full border ${reading.paymentStatus === 'not_paid' ? 'border-red-400 bg-red-600' : 'border-green-300 bg-green-500'} text-end font-bold`}>
                                {reading.paymentStatus.replace('_', ' ')}
                              </div>
                              <div className="text-md text-deep-purple-50 text-end font-bold">
                                {reading.unitsConsumed} units
                              </div>
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
                <div className="w-full md:w-1/2  p-4">
                  <h3 className="text-xl font-semibold  text-white mb-4">Commercial</h3>
                  <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
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
                                  className="text-light-blue-700 transition-all transform duration-300 bg-light-blue-50 hover:bg-light-blue-700 hover:text-white border border-light-blue-400 text-sm font-bold py-1.5 px-4 rounded"
                                >
                                  <FaFileDownload />
                                </button>
                              )}
                            </div>
                          </div>
                          {reading.unitsConsumed > 0 ? (
                            <div className="flex mt-8 justify-between">
                              <div className={`text-sm text-white p-0.5 px-2 rounded-full border ${reading.paymentStatus === 'not_paid' ? 'border-red-200 bg-red-600' : 'border-green-200 bg-green-500'} text-end font-bold`}>
                                {reading.paymentStatus.replace('_', ' ')}
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
            )}
            {isMobile && (
              <div className="grid grid-cols-1 gap-4">
                {monthsArray.map((date) => {
                  const monthKey = format(date, "yyyy-MM");
                  const reading = selectedType === "household"
                    ? householdReadings[monthKey]
                    : commercialReadings[monthKey];
                  return (
                    <div
                      key={monthKey}
                      className={` p-4 rounded ${
                        reading && reading.unitsConsumed
                          ? selectedType === "household"
                            ? "bg-gradient-to-tl border border-deep-purple-200 from-deep-purple-700 to-gray-5 shadow-sm"
                            : "bg-gradient-to-tl from-light-blue-700 border border-light-blue-400 to-gray-5 shadow-sm"
                          : selectedType === "household"
                          ? "bg-deep-purple-50"
                          : "bg-lightBlue-50"
                      }`}
                    >
                      <div className="flex justify-between ">
                        <div
                          className={`text-2xl italic font-semibold ${
                            selectedType === "household"
                              ? "text-deep-purple-200"
                              : "text-lightBlue-200"
                          }`}
                        >
                          {format(date, "MMMM yyyy")}
                        </div>
                        <div>
                          {reading && reading.paymentStatus === "paid" && (
                            <button
                              onClick={() =>
                                handleDownloadReceipt(reading.readingId)
                              }
                              className={`transition-all transform duration-300 text-sm font-bold py-1.5 px-4 rounded ${
                                selectedType === "household"
                                  ? "text-deep-purple-700 bg-deep-purple-50 hover:bg-deep-purple-700 hover:text-white border border-deep-purple-400"
                                  : "text-light-blue-700 bg-light-blue-50 hover:bg-light-blue-700 hover:text-white border border-light-blue-400"
                              }`}
                            >
                              <FaFileDownload />
                            </button>
                          )}
                        </div>
                      </div>
                      {reading && reading.unitsConsumed > 0 ? (
                        <div className="flex mt-8 justify-between">
                          <div
                            className={`text-sm text-white p-0.5 px-2 rounded-full border ${
                              reading.paymentStatus === "not_paid"
                                ? "border-red-400 bg-red-600"
                                : "border-green-300 bg-green-500"
                            } text-end font-bold`}
                          >
                            {reading.paymentStatus.replace("_", " ")}
                          </div>
                          <div
                            className={`text-md text-end font-bold ${
                              selectedType === "household"
                                ? "text-deep-purple-50"
                                : "text-lightBlue-50"
                            }`}
                          >
                            {reading.unitsConsumed} units
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`text-md mt-8 text-end font-bold ${
                            selectedType === "household"
                              ? "text-deep-purple-500"
                              : "text-lightBlue-500"
                          }`}
                        >
                          No data
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeterReadingsDisplay;

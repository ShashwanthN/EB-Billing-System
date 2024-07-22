import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import { format, startOfMonth, addMonths } from "date-fns";
import Topbar from "../components/Topbar";
import bg from "../assets/bg-2.jpeg"
const MeterReadingsDisplay = () => {
  const [userId, setUserId] = useState("");
  const [readings, setReadings] = useState([]);
  const [error, setError] = useState("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
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
      console.log("got it");
      console.log("of");
    } catch (err) {
      setError("Failed to fetch the readings. Please check the user ID.");
      setReadings([]);
    }
  };

  const groupReadingsByType = (type) => {
    return readings.reduce((acc, reading) => {
      if (reading.connectionType !== type) return acc;
      const month = format(new Date(reading.readingDate), "yyyy-MM");
      if (!acc[month]) acc[month] = 0;
      acc[month] += reading.unitsConsumed;
      return acc;
    }, {});
  };

  const householdReadings = groupReadingsByType("household");
  const commercialReadings = groupReadingsByType("commercial");

  const monthsArray = Array.from({ length: 12 }, (_, i) =>
    startOfMonth(addMonths(new Date(currentYear, 0, 1), i))
  );

  const handleFetchButtonClick = () => {
    if (userId.trim() !== "") {
      fetchReadings(userId);
    } else {
      setError("User ID cannot be empty.");
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
        <h2 className="text-3xl font-bold mb-6 text-gray-3 text-center">Meter Readings</h2>
        <div className="mb-6 flex justify-center">
          <div className="text-center p-2 px-10 text-3xl rounded focus:outline-2 outline-deep-purple-400 border-gray-4 font-bold text-blue-400">
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
                <div className="text-gray-2 mr-2">&larr;</div> Previous Year
              </button>
              <button
                onClick={() => setCurrentYear(currentYear + 1)}
                className="pl-4 bg-gray-300 flex hover:bg-gray-400 text-gray-3"
              >
                Next Year <div className="text-gray-2 ml-2">&rarr;</div>
              </button>
            </div>
            <div className="flex text-white justify-center">
              <div className="w-1/2 p-4">
                <h3 className="text-xl font-semibold mb-4">Household</h3>
                <div className="grid grid-cols-2 gap-4">
                  {monthsArray.map((date) => {
                    const monthKey = format(date, "yyyy-MM");
                    const units = householdReadings[monthKey] || 0;
                    return (
                      <div
                        key={monthKey}
                        className={`border border-deep-purple-200 p-4 rounded ${
                          units ? "bg-gradient-to-tl from-deep-purple-700 to-gray-5 shadow-sm" : "bg-deep-purple-50"
                        }`}
                      >
                        <div className="text-deep-purple-200 z-0 absolute text-2xl italic font-semibold">
                          {format(date, "MMMM yyyy")}
                        </div>
                        {units > 0 ? (
                          <div className="flex justify-between">
                            <div className="text-sm mt-10 text-white p-0.5 px-2 rounded-full border border-green-200 bg-green-500 text-end font-bold">
                              Paid
                            </div>
                            <div className="text-md mt-10 text-deep-purple-50 text-end font-bold">
                              {units} units
                            </div>
                          </div>
                        ) : (
                          <div className="text-md mt-10 text-deep-purple-500 text-end font-bold">
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
                    const units = commercialReadings[monthKey] || 0;
                    return (
                      <div
                        key={monthKey}
                        className={`border p-4 border-blue-300 text-center rounded ${
                          units ? "bg-gradient-to-tl from-blue-700 to-gray-5 shadow-sm" : "bg-blue-50"
                        }`}
                      >
                        <div className="text-blue-200 z-0 absolute text-2xl italic font-semibold">
                          {format(date, "MMMM yyyy")}
                        </div>
                        {units > 0 ? (
                          <div className="flex justify-between">
                            <div className="text-sm mt-10 text-white p-0.5 px-2 rounded-full border border-green-200 bg-green-500 text-end font-bold">
                              Paid
                            </div>
                            <div className="text-md mt-10 text-blue-50 text-end font-bold">
                              {units} units
                            </div>
                          </div>
                        ) : (
                          <div className="text-md mt-10 text-blue-500 text-end font-bold">
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

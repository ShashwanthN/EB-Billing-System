import React, { useState } from "react";
import axios from "axios";
import { format, startOfMonth, addMonths } from "date-fns";
import Topbar from "../components/Topbar";

const MeterReadingsDisplay = () => {
  const [userId, setUserId] = useState("");
  const [readings, setReadings] = useState([]);
  const [error, setError] = useState("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const fetchReadings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/readings/user/${userId}`
      );
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

  return (
    <div className="">
       <Topbar/>
    <div className="container pt-10 mx-auto items-center p-4">
     
      
      
        <h2 className="text-3xl font-bold mb-6 text-gray text-center">Meter Readings</h2>
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            className="border-2 p-2 rounded focus:outline-2 outline-deep-purple-400 border-gray-4 w-1/3"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button
            onClick={fetchReadings}
            className="ml-4 bg-deep-purple-400 hover:bg-deep-purple-600 border-2 border-deep-purple-200 text-white p-2 rounded"
          >
            Fetch Readings
          </button>
        </div>
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}
        {readings.length > 0 && (
          <div>
            <div className="flex divide-x divide-gray-4 justify-center mb-6">
              <button
                onClick={() => setCurrentYear(currentYear - 1)}
                className="pr-4 flex bg-gray-300 hover:bg-gray-400 text-gray-700 "
              >
                 <div className="text-gray-2 mr-2">&larr;</div> Previous Year
              </button>
              <button
                onClick={() => setCurrentYear(currentYear + 1)}
                className="pl-4 bg-gray-300 flex hover:bg-gray-400 text-gray-700 "
              >
                Next Year <div className="text-gray-2 ml-2">&rarr;</div>
              </button>
            </div>
            <div className="flex justify-center">
              <div className="w-1/2 p-4">
              <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold mb-4 ">
                  Household
                </h3>
                <h3 className="text-md text-gray-4 font-semibold mb-4 ">
                MMMM YYYY
                </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {monthsArray.map((date) => {
                    const monthKey = format(date, "yyyy-MM");
                    const units = householdReadings[monthKey] || 0;
                    return (
                      <div
                        key={monthKey}
                        className={`border border-deep-purple-200 p-4  rounded ${
                          units ? "bg-gradient-to-tl from-deep-purple-100 to-deep-purple-50 shadow-sm" : "bg-red-50"
                        }`}
                      >
                        <div className="text-deep-purple-200 z-0 absolute text-2xl italic font-semibold">
                          {format(date, "MMMM yyyy")}
                        </div>
                        {units > 0 ? (
                          <div className="flex justify-between">
                            <div className="text-sm mt-10 text-white p-0.5 px-2 rounded-full border border-green-200 bg-green-500 text-end font-bold">
                              paid
                            </div>
                            <div className="text-md mt-10 text-deep-purple-500 text-end font-bold">
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
              <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold mb-4 ">
                  Commercial
                </h3>
                <h3 className="text-md text-gray-4 font-semibold mb-4 ">
                MMMM YYYY
                </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {monthsArray.map((date) => {
                    const monthKey = format(date, "yyyy-MM");
                    const units = commercialReadings[monthKey] || 0;
                    return (
                      <div
                        key={monthKey}
                        className={`border p-4 border-blue-300 text-center rounded ${
                          units ? "bg-gradient-to-tl from-blue-100 to-blue-50 shadow-sm" : "bg-red-50"
                        }`}
                      >
                        <div className="text-blue-200 z-0 absolute text-2xl italic font-semibold">
                          {format(date, "MMMM yyyy")}
                        </div>
                        {units > 0 ? (
                          <div className="flex justify-between">
                          <div className="text-sm mt-10 text-white p-0.5 px-2 rounded-full border border-green-200 bg-green-500 text-end font-bold">
                            paid
                          </div>
                          <div className="text-md mt-10 text-blue-500 text-end font-bold">
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

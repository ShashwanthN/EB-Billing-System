import React from "react";
import Topbar from "../components/Topbar";
import logo from "../assets/logo.png";
import { Carousel } from "@material-tailwind/react";
import { Footer } from "../components/Footer";
import MeterReadingsDisplay from "./MeterReadingDisplay";
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-1">
      
      <div className="shadow-gray transition duration-300 ease-in-out pb-8">
      <header className="bg-gradient-to-tl from-blue-gray-50 to-white shadow">
        {/* <div className="container mx-auto px-4 flex items-center justify-between">
          <img src={logo} alt="logo" className="my-2 w-24" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex justify-end">
              TAMIL NADU GENERATION AND DISTRIBUTION CORPORATION LIMITED
            </h2>
            <p className="mt-2 text-gray-600 flex justify-end">
              Light in every corner.
            </p>
          </div>
        </div> */}
        {/* {generatedBills.length > 0 && (
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
          )} */}
      </header>
      <Carousel
        className="h-[650px]"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className=" left-2/4  flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        <img
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
      <main className="container mx-auto bg-gray-1 mt-6">
        <div className="grid grid-cols-1 transform transition-all duration-100 ease-in-out md:grid-cols-2  lg:grid-cols-3 gap-6 py-4">
          <div className="bg-gray-5 p-6 border border-gray text-gray-3 rounded shadow-md transition duration-300 ease-in-out hover:shadow-xl  hover:border-gray transform hover:bg-gradient-to-tl from-gray-1 to-gray hover:text-white hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">Pay Bill</h3>
            <p className="text-gray-600">
              Easily pay your electricity bill online.
            </p>
            <a href="/DisplayBills" className=" mt-4 hover:text-blue-400 transform transition-all duration-200  ease-linear inline-block">
              Pay Now <span className="text-blue-400">&rarr;</span>
            </a>
          </div>
          <div className="bg-gray-5 p-6 border border-gray text-gray-3 rounded shadow-md transition duration-300 ease-in-out hover:shadow-xl  hover:border-gray transform hover:bg-gradient-to-tl from-gray-1 to-gray hover:text-white hover:scale-105">            <h3 className="text-xl font-semibold mb-2 ">Calculate Bill</h3>
            <p className="text-gray-600">
              Calculate your upcoming bill based on usage.
            </p>
            <a href="/DisplayBills" className=" mt-4 hover:text-blue-400 transform transition-all duration-200  ease-linear inline-block">              Calculate <span className="text-blue-400">&rarr;</span>
            </a>
          </div>
          <div className="bg-gray-5 p-6 border border-gray text-gray-3 rounded shadow-md transition duration-300 ease-in-out hover:shadow-xl  hover:border-gray transform hover:bg-gradient-to-tl from-gray-1 to-gray hover:text-white hover:scale-105">            <h3 className="text-xl font-semibold mb-2">View Readings</h3>
            <p className="text-gray-600">
              View your past bills and payment history.
            </p>
            <a href="/DisplayBills" className=" mt-4 hover:text-blue-400 transform transition-all duration-200  ease-linear inline-block">              View Bills <span className="text-blue-400">&rarr;</span>
            </a>
          </div>
          <div className="bg-gray-5 p-6 border border-gray text-gray-3 rounded shadow-md transition duration-300 ease-in-out hover:shadow-xl  hover:border-gray transform hover:bg-gradient-to-tl from-gray-1 to-gray hover:text-white hover:scale-105">            <h3 className="text-xl font-semibold mb-2">Apply Online</h3>
            <p className="text-gray-600">
              online application for service registration
            </p>
            <a href="/DisplayBills" className=" mt-4 hover:text-blue-400 transform transition-all duration-200  ease-linear inline-block">
              View application <span className="text-blue-400">&rarr;</span>
            </a>
          </div>
          <div className="bg-gray-5 p-6 border border-gray text-gray-3 rounded shadow-md transition duration-300 ease-in-out hover:shadow-xl  hover:border-gray transform hover:bg-gradient-to-tl from-gray-1 to-gray hover:text-white hover:scale-105">            <h3 className="text-xl font-semibold mb-2">Update Info</h3>
            <p className="text-gray-600">Update your mobile number or email</p>
            <a href="/DisplayBills" className=" mt-4 hover:text-blue-400 transform transition-all duration-200  ease-linear inline-block">
              Update Now <span className="text-blue-400">&rarr;</span>
            </a>
          </div>
          <div className="bg-gray-5 p-6 border border-gray text-gray-3 rounded shadow-md transition duration-300 ease-in-out hover:shadow-xl  hover:border-gray transform hover:bg-gradient-to-tl from-gray-1 to-gray hover:text-white hover:scale-105">             <h3 className="text-xl font-semibold mb-2">Mobile App</h3>
            <p className="text-gray-600">Download our mobile app</p>
            <a href="/DisplayBills" className=" mt-4 hover:text-blue-400 transform transition-all duration-200  ease-linear inline-block">
              Download Now <span className="text-blue-400">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
      </div>
      <div className="min-h-screen bg-[#f0f0f0] border border-primary text-white">

      </div>
      <Footer />
    </div>
  );
};

export default Home;

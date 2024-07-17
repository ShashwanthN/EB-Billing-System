import React from "react";
import Topbar from "../components/Topbar";
import logo from "../assets/logo.png";
import { Carousel } from "@material-tailwind/react";
import { Footer } from "../components/Footer";
import MeterReadingsDisplay from "./MeterReadingDisplay";
const Home = () => {
  return (
    <div className="min-h-screen mt-24 bg-gray-100">
      <Topbar />
      <div className="shadow-gray pb-8">
      <header className="bg-gradient-to-tl from-blue-gray-50 to-white shadow">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <img src={logo} alt="logo" className="my-2 w-24" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex justify-end">
              TAMIL NADU GENERATION AND DISTRIBUTION CORPORATION LIMITED
            </h2>
            <p className="mt-2 text-gray-600 flex justify-end">
              Light in every corner.
            </p>
          </div>
        </div>
      </header>
      <Carousel
        className="h-[400px]"
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
      <main className="container mx-auto mt-6 px-4">
        <div className="grid grid-cols-1 transform transition-all duration-100 ease-in-out md:grid-cols-2  lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 border border-gray-3 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-xl  hover:border-secondary transform hover:bg-accent hover:text-white hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">Pay Bill</h3>
            <p className="text-gray-600">
              Easily pay your electricity bill online.
            </p>
            <a href="/DisplayBills" className=" mt-4 inline-block">
              Pay Now &rarr;
            </a>
          </div>
          <div className="bg-white p-6 border border-gray-3 rounded-lg shadow-md transition duration-300 hover:shadow-xl hover:border-secondary ease-in-out transform hover:bg-accent hover:text-white hover:scale-105">
            <h3 className="text-xl font-semibold mb-2 ">Calculate Bill</h3>
            <p className="text-gray-600">
              Calculate your upcoming bill based on usage.
            </p>
            <a href="/CalculateBills" className=" mt-4 inline-block">
              Calculate &rarr;
            </a>
          </div>
          <div className="bg-white p-6 border border-gray-3 rounded-lg  shadow-md transition duration-300 ease-in-out transform hover:shadow-xl hover:border-secondary hover:bg-accent hover:text-white hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">View Readings</h3>
            <p className="text-gray-600">
              View your past bills and payment history.
            </p>
            <a href="/MeterReadingDisplay" className=" mt-4 inline-block">
              View Bills &rarr;
            </a>
          </div>
          <div className="bg-white p-6 border border-gray-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:shadow-xl hover:border-secondary hover:bg-accent hover:text-white hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">Apply Online</h3>
            <p className="text-gray-600">
              online application for service registration
            </p>
            <a
              href="/serviceApplication"
              className=" mt-4 inline-block"
            >
              View application &rarr;
            </a>
          </div>
          <div className="bg-white p-6 border border-gray-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:shadow-xl hover:border-secondary hover:bg-accent hover:text-white hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">Update Info</h3>
            <p className="text-gray-600">Update your mobile number or email</p>
            <a
              href="https://app1.tangedco.org/nsconline/"
              className=" mt-4 inline-block"
            >
              Update Now &rarr;
            </a>
          </div>
          <div className="bg-white p-6 border border-gray-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:shadow-xl hover:border-secondary hover:bg-accent hover:text-white hover:scale-105">
             <h3 className="text-xl font-semibold mb-2">Mobile App</h3>
            <p className="text-gray-600">Download our mobile app</p>
            <a
              href="https://play.google.com/store/apps/details?id=com.tneb.tangedco&hl=en_IN&pli=1"
              className=" mt-4 inline-block"
            >
              Download Now &rarr;
            </a>
          </div>
        </div>
      </main>
      </div>
      <div className="min-h-screen bg-secondary border border-primary text-white">

      </div>
      <Footer />
    </div>
  );
};

export default Home;

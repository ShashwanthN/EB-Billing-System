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
        {/* <header className="bg-gradient-to-tl from-blue-gray-50 to-white shadow">
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
          
        </header> */}
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
        <div>
          
        </div>
        <main className="container mx-auto bg-gray-1 mt-6 ">
          <div className="grid grid-cols-1 transform transition-all duration-700 ease-in-out md:grid-cols-2  lg:grid-cols-3 gap-6 py-4">
            <div className="bg-gray-5 p-6 border border-gray text-gray-3 rounded shadow-md transition duration-700 ease-in-out hover:shadow-xl  hover:border-gray transform hover:bg-gradient-to-tl from-gray-1 to-gray hover:text-white hover:scale-105">
              <h3 className="text-xl font-semibold mb-2">Pay Bill</h3>
              <p className="text-gray-600">
                Easily pay your electricity bill online.
              </p>
              <a
                href="/DisplayBills"
                className=" mt-4 hover:text-blue-400 transform transition-all duration-200  ease-linear inline-block"
              >
                Pay Now <span className="text-blue-400">&rarr;</span>
              </a>
            </div>
            <div className="bg-gray-5 p-6 border border-gray text-gray-3 rounded shadow-md transition duration-700 ease-in-out hover:shadow-xl  hover:border-gray transform hover:bg-gradient-to-tl from-gray-1 to-gray hover:text-white hover:scale-105">
              {" "}
              <h3 className="text-xl font-semibold mb-2 ">Calculate Bill</h3>
              <p className="text-gray-600">
                Calculate your upcoming bill based on usage.
              </p>
              <a
                href="/CalculateBills"
                className=" mt-4 hover:text-blue-400 transform transition-all duration-200  ease-linear inline-block"
              >
                {" "}
                Calculate <span className="text-blue-400">&rarr;</span>
              </a>
            </div>
            <div className="bg-gray-5 p-6 border border-gray text-gray-3 rounded shadow-md transition duration-700 ease-in-out hover:shadow-xl  hover:border-gray transform hover:bg-gradient-to-tl from-gray-1 to-gray hover:text-white hover:scale-105">
              {" "}
              <h3 className="text-xl font-semibold mb-2">View Readings</h3>
              <p className="text-gray-600">
                View your past bills and payment history.
              </p>
              <a
                href="/MeterReadingDisplay"
                className=" mt-4 hover:text-blue-400 transform transition-all duration-200  ease-linear inline-block"
              >
                {" "}
                View Bills <span className="text-blue-400">&rarr;</span>
              </a>
            </div>
            <div className="bg-gray-5 p-6 border border-gray text-gray-3 rounded shadow-md transition duration-700 ease-in-out hover:shadow-xl  hover:border-gray transform hover:bg-gradient-to-tl from-gray-1 to-gray hover:text-white hover:scale-105">
              {" "}
              <h3 className="text-xl font-semibold mb-2">Apply Online</h3>
              <p className="text-gray-600">
                online application for service registration
              </p>
              <a
                href="/serviceApplication"
                className=" mt-4 hover:text-blue-400 transform transition-all duration-200  ease-linear inline-block"
              >
                View application <span className="text-blue-400">&rarr;</span>
              </a>
            </div>
            <div className="bg-gray-5 p-6 border border-gray text-gray-3 rounded shadow-md transition duration-700 ease-in-out hover:shadow-xl  hover:border-gray transform hover:bg-gradient-to-tl from-gray-1 to-gray hover:text-white hover:scale-105">
              {" "}
              <h3 className="text-xl font-semibold mb-2">Update Info</h3>
              <p className="text-gray-600">
                Update your mobile number or email
              </p>
              <a
                href="/DisplayBills"
                className=" mt-4 hover:text-blue-400 transform transition-all duration-200  ease-linear inline-block"
              >
                Update Now <span className="text-blue-400">&rarr;</span>
              </a>
            </div>
            <div className="bg-gray-5 p-6 border border-gray text-gray-3 rounded shadow-md transition duration-700 ease-in-out hover:shadow-xl  hover:border-gray transform hover:bg-gradient-to-tl from-gray-1 to-gray hover:text-white hover:scale-105">
              {" "}
              <h3 className="text-xl font-semibold mb-2">Mobile App</h3>
              <p className="text-gray-600">Download our mobile app</p>
              <a
                href="https://play.google.com/store/apps/details?id=com.tneb.tangedco&hl=en_IN"
                className=" mt-4 hover:text-blue-400 transform transition-all duration-200  ease-linear inline-block"
              >
                Download Now <span className="text-blue-400">&rarr;</span>
              </a>
            </div>
          </div>
        </main>
      </div>
      <div className="px-20">
      <div className="text-gray-4 justify-center w-full flex">
        <div className="w-1/2 flex-1 mr-4 my-20">
          <h3 className="text-7xl pb-10 font-mono  font-bold text-gray-3">
            Lorem ipsum
          </h3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
          malesuada. Nulla facilisi. Donec egestas, neque nec aliquam gravida,
          orci turpis ullamcorper enim, in elementum est erat nec sapien. Nullam
          vitae ligula at elit volutpat convallis. Vivamus consequat massa eget
          metus convallis, in vestibulum felis posuere. Aenean id dui euismod,
          posuere velit in, luctus lorem. Pellentesque et libero eu ligula
          ultricies ullamcorper. Ut laoreet, nisi sit amet vestibulum dapibus,
          arcu orci pharetra justo, at varius lectus sapien nec libero. Ut
          cursus metus sed magna fermentum, vel congue tortor hendrerit.
          Phasellus sit amet consequat lectus. Integer posuere bibendum arcu, ut
          scelerisque massa bibendum vel. Mauris varius ex ac felis porttitor,
          ac vehicula enim tristique. Suspendisse potenti. Aliquam erat
          volutpat. Etiam sed arcu nec leo tincidunt malesuada a nec felis.
          Aliquam malesuada turpis ac tellus pharetra, eget vehicula elit
          sollicitudin.
        </div>

        
      </div>
      <div className="min-h-screen bg-gray-1 pt-10  text-white">
        <section class="">
          <div class="py-4  mx-auto font-sans max-w-screen sm:py-4 ">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
              <div class="col-span-2 sm:col-span-1 md:col-span-2 bg-gray-50 h-auto md:h-full flex flex-col">
                <a
                  href=""
                  class="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow"
                >
                  <img
                    src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                  <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                    Wines
                  </h3>
                </a>
              </div>
              <div class="col-span-2 sm:col-span-1 md:col-span-2 bg-stone-50">
                <a
                  href=""
                  class="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 mb-4"
                >
                  <img
                    src="https://images.unsplash.com/photo-1504675099198-7023dd85f5a3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                  <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                    Gin
                  </h3>
                </a>
                <div class="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
                  <a
                    href=""
                    class="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1571104508999-893933ded431?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                    <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                    <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                      Whiskey
                    </h3>
                  </a>
                  <a
                    href=""
                    class="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1626897505254-e0f811aa9bf7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                      class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                    <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                    <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                      Vodka
                    </h3>
                  </a>
                </div>
              </div>
              <div class="col-span-2 sm:col-span-1 md:col-span-1 bg-sky-50 h-auto md:h-full flex flex-col">
                <a
                  href=""
                  class="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow"
                >
                  <img
                    src="https://images.unsplash.com/photo-1693680501357-a342180f1946?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    class="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  <div class="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                  <h3 class="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                    Brandy
                  </h3>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;

import React from "react";
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Carousel } from "@material-tailwind/react";
import  Footer  from "../components/Footer";

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
                href="/update"
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
      <div className="px-20 border-b border-trueGray-800">
  <div className="text-gray-4 justify-center  w-full flex">
    <div className="w-1/2 flex-1 mr-4  border-t border-gray-2 mt-10">
      <h3 className="text-7xl pb-10 font-mono pt-10 font-bold text-gray-3">
        Lorem ipsum
      </h3>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
      lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
      malesuada. Nulla facilisi. Donec egestas, neque nec aliquam gravida,
      orci turpis ullamcorper enim, in elementum est erat nec sapien.
      Nullam vitae ligula at elit volutpat convallis. Vivamus consequat
      massa eget metus convallis, in vestibulum felis posuere. Aenean id
      dui euismod, posuere velit in, luctus lorem. Pellentesque et libero
      eu ligula ultricies ullamcorper. Ut laoreet, nisi sit amet
      vestibulum dapibus, arcu orci pharetra justo, at varius lectus
      sapien nec libero. Ut cursus metus sed magna fermentum, vel congue
      tortor hendrerit. Phasellus sit amet consequat lectus. Integer
      posuere bibendum arcu, ut scelerisque massa bibendum vel. Mauris
      varius ex ac felis porttitor, ac vehicula enim tristique.
      Suspendisse potenti. Aliquam erat volutpat. Etiam sed arcu nec leo
      tincidunt malesuada a nec felis. Aliquam malesuada turpis ac tellus
      pharetra, eget vehicula elit sollicitudin.
    </div>
  </div>
  <div className="min-h-screen bg-gray-1 pt-10 text-white">
    <section>
      <div className="py-4 mx-auto font-sans max-w-screen sm:py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
          <div className="col-span-2 sm:col-span-1 md:col-span-2 h-auto md:h-full flex flex-col">
            <a
              href=""
              className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow"
            >
              <img
                src="https://www.namogoo.com/wp-content/uploads/2021/04/5-types-of-customers-blog-1200x500-new-1024x427.png"
                alt=""
                className="absolute hover:brightness-100 inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform brightness-50 duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
              <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                336.55 Lakhs
              </h3>
              <p className="z-10 text-lg font-medium text-white absolute top-16 left-0 p-4 xs:text-sm md:text-lg">
                Consumers
              </p>
            </a>
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-2 ">
            <a
              href=""
              className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 mb-4"
            >
              <img
                src="https://images.squarespace-cdn.com/content/v1/5cc9d678797f74514e09078f/55ae519d-8f49-4367-af35-b183485e48b3/top+sub_1000.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out brightness-50 hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
              <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                405,528 Nos
              </h3>
              <p className="z-10 text-lg font-medium text-white absolute top-16 left-0 p-4 xs:text-sm md:text-lg">
                Distribution Transformers
              </p>
            </a>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
              <a
                href=""
                className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
              >
                <img
                  src="https://taraenergy.com/wp-content/uploads/2022/11/history-of-electricity-article-image-of-electric-powerlines.jpeg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform brightness-50 duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                  20,701 MW
                </h3>
                <p className="z-10 text-lg font-medium text-white absolute top-16 left-0 p-4 xs:text-sm md:text-lg">
                  on 30.04.2024 All Time High
                </p>
              </a>
              <a
                href=""
                className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40"
              >
                <img
                  src="https://chintglobal.com/blog/wp-content/uploads/chint-electrical-substation-featured-image.jpg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform brightness-75 duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                  1,949 Nos
                </h3>
                <p className="z-10 text-lg font-medium text-white absolute top-16 left-0 p-4 xs:text-sm md:text-lg">
                  Sub - Stations
                </p>
              </a>
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 md:col-span-1  h-auto md:h-full flex flex-col">
            <a
              href=""
              className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow"
            >
              <img
                src="https://images.unsplash.com/photo-1693680501357-a342180f1946?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform brightness-75 duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
              <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                6,099
              </h3>
              <p className="z-10 text-lg font-medium text-white absolute top-16 left-0 p-4 xs:text-sm md:text-lg">
                idk what to put here so ill just use some text surely no one will figure out right
              </p>
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

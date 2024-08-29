import React from "react";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Carousel } from "@material-tailwind/react";
import Footer from "../components/Footer";
import "./Home.css";

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
          className="lg:h-[650px] md:h-[450px] h-[350px] max-w-full"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="left-2/4 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          <img
          src="https://images3.alphacoders.com/976/976915.jpg"
           
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <img
             src="https://cdn.suwalls.com/wallpapers/photography/transmission-towers-15052-1920x1200.jpg"
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
            alt="image 3"
            className="h-full w-full object-cover"
          />
        </Carousel>

        <main className="container mx-auto bg-gray-1 lg:mt-6 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
            {[
              {
                title: "Pay Bill",
                text: "Easily pay your electricity bill online.",
                link: "/DisplayBills",
                label: "Pay Now",
              },
              {
                title: "Calculate Bill",
                text: "Calculate your upcoming bill based on usage.",
                link: "/CalculateBills",
                label: "Calculate",
              },
              {
                title: "View Readings",
                text: "View your past bills and payment history.",
                link: "/MeterReadingDisplay",
                label: "View Bills",
              },
              {
                title: "Apply Online",
                text: "Online application for service registration.",
                link: "/serviceApplication",
                label: "View application",
              },
              {
                title: "Update Info",
                text: "Update your mobile number or email.",
                link: "/update",
                label: "Update Now",
              },
              {
                title: "Mobile App",
                text: "Download our mobile app.",
                link: "https://play.google.com/store/apps/details?id=com.tneb.tangedco&hl=en_IN",
                label: "Download Now",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-5 p-6 border border-gray text-gray-3 rounded shadow-md transition-all duration-700 ease-in-out hover:shadow-xl hover:border-gray transform hover:bg-gradient-to-tl from-gray-1 to-gray hover:text-white hover:scale-105"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
                <a
                  href={item.link}
                  className="mt-4 hover:text-light-blue-600 transform transition-all duration-200 ease-linear inline-block"
                >
                  {item.label}{" "}
                  <span className="text-light-blue-500">&rarr;</span>
                </a>
              </div>
            ))}
          </div>
        </main>
      </div>

      <div className="px-4 lg:px-20 border-b border-trueGray-800">
        <div className="text-gray-4 justify-center w-full flex">
          <div className="w-full md:w-1/2 flex-1 mr-4 border-t border-gray-2 mt-10">
            <h3 className="text-3xl md:text-7xl pb-10 font-mono pt-10 font-bold text-gray-3">
              Our Progress
            </h3>
            <p className="text-sm md:text-base text-justify">
              TANGEDCO, the Tamil Nadu Generation and Distribution Corporation
              Limited, plays a vital role in powering homes, businesses, and
              industries across Tamil Nadu. With a commitment to sustainable and
              reliable electricity generation, TANGEDCO operates an extensive
              network of power plants, transmission lines, and distribution
              systems. Dedicated to reducing carbon footprints and enhancing
              energy efficiency, TANGEDCO continuously explores innovative
              technologies, such as renewable energy integration and smart grid
              solutions. Our initiatives in solar, wind, and hydroelectric power
              contribute to Tamil Nadu's leadership in clean energy.
            </p>
          </div>
        </div>

        <div className="min-h-screen bg-gray-1 pt-10 text-white">
          <section>
            <div className="py-4 mx-auto font-sans max-w-screen sm:py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
                <div className="col-span-1 md:col-span-2 h-auto md:h-full flex flex-col">
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
                    <h3 className="z-10 text-xl md:text-3xl font-medium text-white absolute top-0 left-0 p-4">
                      336.55 Lakhs
                    </h3>
                    <p className="z-10 text-sm md:text-lg font-medium text-white absolute top-16 left-0 p-4">
                      Consumers
                    </p>
                  </a>
                </div>
                <div className="col-span-1 md:col-span-2">
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
                    <h3 className="z-10 text-xl md:text-3xl font-medium text-white absolute top-0 left-0 p-4">
                      405,528 Nos
                    </h3>
                    <p className="z-10 text-sm md:text-lg font-medium text-white absolute top-16 left-0 p-4">
                      Distribution Transformers
                    </p>
                  </a>
                  <div className="grid gap-4 grid-cols-2">
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
                      <h3 className="z-10 text-xl md:text-3xl font-medium text-white absolute top-0 left-0 p-4">
                        20,701 MW
                      </h3>
                      <p className="z-10 text-sm md:text-lg font-medium text-white absolute top-16 left-0 p-4">
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
                      <h3 className="z-10 text-xl md:text-3xl font-medium text-white absolute top-0 left-0 p-4">
                        1,949 Nos
                      </h3>
                      <p className="z-10 text-sm md:text-lg font-medium text-white absolute top-16 left-0 p-4">
                        Sub - Stations
                      </p>
                    </a>
                  </div>
                </div>
                <div className="col-span-1 md:col-span-1 h-auto md:h-full flex flex-col">
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
                    <h3 className="z-10 text-xl md:text-3xl font-medium text-white absolute top-0 left-0 p-4">
                      6,099
                    </h3>
                    <p className="z-10 text-sm md:text-lg font-medium text-white absolute top-16 left-0 p-4">
                      I don't know what to put here so I'll just use some text
                      surely no one will notice right
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

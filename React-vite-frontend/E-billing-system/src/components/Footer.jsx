import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="pt-10">
      <div className="container text-trueGray-400 mx-auto px-4">
        <div className="flex justify-between items-start">
          <div className="flex min-h-full flex-col justify-between items-center h-full">
            <div className="text-center md:text-left w-full">
              <img
                src={logo}
                alt="API Setu"
                className="mx-auto w-10 md:mx-0 mt-4"
              />
            </div>
            <div className="flex items-center justify-items-end w-full mt-auto">
              <div className="flex space-x-6">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="path_to_facebook_icon.png" alt="Facebook" />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="path_to_twitter_icon.png" alt="Twitter" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="path_to_linkedin_icon.png" alt="LinkedIn" />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="path_to_youtube_icon.png" alt="YouTube" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex space-x-32">
            <div>
              <h4 className="font-semibold mb-4 text-trueGray-300">API Setu</h4>
              <ul>
                <li className="mb-2">
                  <a href="/home" className="text-gray-600 hover:text-gray-800">
                    Home
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="/about-us"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    About Us
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="/directory"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Directory
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/blog" className="text-gray-600 hover:text-gray-800">
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/join-us"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Join Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-trueGray-300 mb-4">Utilities</h4>
              <ul>
                <li className="mb-2">
                  <a
                    href="/api-policy"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    API Policy
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="/data-standards"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Data Standards
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="/developers"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Developers
                  </a>
                </li>
                <li>
                  <a
                    href="/digilocker"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Digilocker
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-trueGray-300">Powered By</h4>
            <p className="text-gray-600">
              Digital India Corporation (DIC)
              <br />
              
              Government of India
            </p>
          </div>
        </div>
        <div className="text-trueGray-300 border-t border-trueGray-600 mt-6 pt-6 flex justify-between pb-2">
          <p className="text-trueGray-300 font-extralight text-xs mb-4">
            Website designed & developed by Shashwanth N
          </p>
          <ul className="space-x-6 flex">
            <li>
              <a
                href="/privacy-policy"
                className="text-trueGray-400 hover:text-trueGray-300"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms-of-use"
                className="text-trueGray-400 hover:text-trueGray-300"
              >
                Terms of Use
              </a>
            </li>
            <li>
              <a
                href="/contact-us"
                className="text-trueGray-400 hover:text-trueGray-300"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

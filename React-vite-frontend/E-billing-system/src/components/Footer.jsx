import React from "react";
import logo from "../assets/logo.png";
import { FaYoutubeSquare, FaLinkedin, FaFacebookSquare, FaInstagramSquare} from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="pt-10">
      <div className="container text-trueGray-400 mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <div className="text-center md:text-left w-full">
              <img
                src={logo}
                alt="EB Billing"
                className="mx-auto w-10 md:mx-0 mt-4"
              />
            </div>
            <div className="flex items-center mt-4 md:mt-6">
              <div className="flex space-x-6">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" hover:text-blue-600"
                >
                  <FaFacebookSquare size={26}/>
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" hover:text-pink-500 "
                >
                  <FaInstagramSquare size={26}/>
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500"
                >
                  <FaLinkedin size={26}/>
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-500"
                >
                  <FaYoutubeSquare size={26}/>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-32 w-full md:w-auto">
            <div className="mb-6 md:mb-0">
              <h4 className="font-semibold mb-4 text-trueGray-300">EB Billing</h4>
              <ul>
                <li className="mb-2">
                  <a href="/dashboard" className="text-gray-600 hover:text-gray-800">
                    Dashboard
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="/billing"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Billing
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="/connections"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Connections
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/support" className="text-gray-600 hover:text-gray-800">
                    Support
                  </a>
                </li>
                <li>
                  <a
                    href="/profile"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Profile
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-trueGray-300 mb-4">Resources</h4>
              <ul>
                <li className="mb-2">
                  <a
                    href="/faq"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    FAQ
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="/guidelines"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Guidelines
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
                    href="/contact"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Contact
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
        <div className="text-trueGray-300 border-t border-trueGray-600 mt-6 pt-6 flex flex-col md:flex-row justify-between pb-2">
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
                href="/contact"
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

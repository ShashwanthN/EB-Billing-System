import React from "react";

const Navbar = () => {
  return (
    <div className="backdrop-blur-3xl backdrop-brightness-50 border-t border-t-transparent shadow-md">
      <div className=" py-1 text-gray-2 text-bl">
        <div className="container mx-auto text-sm flex justify-between broder-b  items-center">
          <a href="#login" className="mx-2 hover:text-lightBlue-500">
            Recruitment
          </a>
          <a href="#register" className="mx-2 hover:text-lightBlue-500">
            Consumer Info
          </a>
          <a href="#register" className="mx-2 hover:text-lightBlue-500">
            Consumer Info
          </a>
          <a href="#register" className="mx-2 hover:text-lightBlue-500">
            Consumer Info
          </a>
          <a href="#register" className="mx-2 hover:text-lightBlue-500">
            Consumer Info
          </a>
          <a href="#register" className="mx-2 hover:text-blue-500">
            Consumer Info
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React from 'react'
import Navbar from './Navbar'
const Topbar = () => {
  return (
    <div>

    <div className='mt-20'>

    </div>
    <div className="top-0 fixed z-50 w-full bg-white  ">
      
      <div className=" border border-gray-3 p-4 text-purple">
        <div className="container mx-auto  flex justify-between items-center">
          <h1 className="text-2xl font-bold">TANGEDCO</h1>
          <div>
            <a href="#login" className="mx-2">Login</a>
            <a href="#register" className="mx-2">Register</a>
            <button className="mx-2 text-bold text-xl">தமிழ்</button>
            
          </div>
        </div>
        
      </div>
      <Navbar />
      </div>
      </div>
  )
}

export default Topbar

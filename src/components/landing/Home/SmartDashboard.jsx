import React from 'react';
import smartDashboardImage from '../../../assets/img/landing/smart-dashboard.png';
const SmartDashboard = () => {
  return (
    <section className="py-16 md:py-24">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
      
      {/* Responsive Image Wrapper */}
      <div className="w-full flex justify-center">
        <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full bg-green-200 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105">
          <img
            src={smartDashboardImage}
            alt="Doctor Bot Chat UI"
            className="w-[80%] max-w-xs sm:max-w-sm md:max-w-md"
          />
        </div>
      </div>
  
      {/* Text Content */}
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-700 mb-6">
          Smart Dashboard
        </h1>
        <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed">
          Effortlessly manage appointments and patient records. Stay organized
          with real-time updates, easy search and smart insights that help you
          streamline your workflow. Whether you're tracking bookings, viewing
          patient history, or monitoring appointment trends, everything you
          need is at your fingertips.
        </p>
      </div>
    </div>
  </section>
  
  );
};

export default SmartDashboard;

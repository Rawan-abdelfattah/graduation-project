import React from 'react';
import smartDashboardImage from '../../../assets/img/landing/smart-dashboard.png';
import bg from '../../../assets/img/landing/shape-bg.png';
import ImageWithLoading from '../../common/ImageWithLoading';

const SmartDashboard = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-12">
        {/* Responsive Image Wrapper */}
        <div
          className="relative w-full max-w-[700px] min-h-[300px] sm:min-h-[400px] lg:min-h-[475px] 
             flex justify-center items-center 
             bg-no-repeat bg-center bg-contain sm:bg-cover"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <ImageWithLoading
            src={smartDashboardImage}
            alt="Doctor Bot Chat UI"
             className=" w-[250px] min-h-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] relative z-10"
          />
        </div>

        {/* Text Content */}
        <div className="max-w-[600px] text-center lg:text-left">
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

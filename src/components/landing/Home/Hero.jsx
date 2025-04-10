import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import bg from '../../../assets/img/landing/hero-img1.png'
import heroImage from '../../../assets/img/landing/hero-img2.png'
const Hero = () => {
  return (
<div
  className="bg-cover bg-center"
  style={{ backgroundImage: `url(${bg})` }}
>
      <Navbar /> 
      <section className="  py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-6">
              Doctor Bot
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Easily book appointments and get instant health guidance with our
              smart mobile app — featuring a built-in symptom checker and
              AI-powered chatbot for fast, reliable support.
            </p>
            <Link
              to="/chatbot"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition duration-200"
            >
              Speak to bot
            </Link>
          </div>
          <img
            src={heroImage}
            alt="Doctor Bot Chat UI"
            className="w-[600px] max-w-xs mx-auto"
          />
        </div>
      </section> 
    </div>
  );
};

export default Hero;

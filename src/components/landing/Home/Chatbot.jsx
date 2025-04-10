import React from 'react';
import chatbot from '../../../assets/img/landing/chatbot.png';
import bg from '../../../assets/img/landing/shape-bg.png';
import { Link } from 'react-router-dom';
const Chatbot = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row justify-between items-center gap-12">
        <div className="max-w-[600px] text-center lg:text-left">
          <Link
            to="/chatbot"
            className="inline-block bg-green-600 text-white hover:bg-green-700 mb-5 font-semibold px-12 py-3 rounded-full transition duration-200"
          >
            Ask the Bot
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
            Smart Chatbot Guidance
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed">
            Not sure which doctor to see? Our AI-powered chatbot is here to
            help. Just describe your symptoms, and it will guide you to the
            right medical specialty—quickly and accurately.
          </p>
        </div>

        <div
          className="relative w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] h-[480px]  lg:max-w-[800px] flex justify-center items-center p-4
             bg-no-repeat bg-center bg-contain sm:bg-cover"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <img
            src={chatbot}
            alt="Doctor Bot Chat UI"
            className="w-[250px] sm:w-[300px] mx-auto relative z-10"
          />
        </div>
      </div>
    </section>
  );
};

export default Chatbot;

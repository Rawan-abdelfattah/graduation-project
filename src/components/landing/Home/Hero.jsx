import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import bg from '../../../assets/img/landing/hero-img1.png';
import heroImage from '../../../assets/img/landing/hero-img2.png';
import FloatingChatButton from './FloatingChatButton';
import ChatBot from './ChatBotModel';
const Hero = () => {
      const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Navbar />
      <section className=" py-5">
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
          
             {!isChatOpen && <FloatingChatButton onClick={() => setIsChatOpen(true)} />}

      {/* Chat Bot Component */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
          </div>
          <img
            src={heroImage}
            alt="Doctor Bot Chat UI"
            className="w-[365px] max-w-[400px] mx-auto"
          />
        </div>
      </section>
    </div>
  );
};

export default Hero;

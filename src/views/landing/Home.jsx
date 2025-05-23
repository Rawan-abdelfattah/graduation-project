import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Book } from 'components/landing/Home/Book';
import Chatbot from 'components/landing/Home/Chatbot';
import Hero from 'components/landing/Home/Hero';
import SmartDashboard from 'components/landing/Home/SmartDashboard';
import Features from 'components/landing/Home/Features';
import Footer from 'components/landing/Footer';

export const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 300,
    });
  }, []);

  return (
    <div className='bg-white'>
      <div>
        <Hero />
      </div>

      <div data-aos="fade-left">
        <SmartDashboard />
      </div>

      <div data-aos="fade-left">
        <Book />
      </div>

      <div data-aos="zoom-in">
        <Chatbot />
      </div>

      <div data-aos="fade-left">
        <Features />
      </div>
      <Footer/>
    </div>
  );
};

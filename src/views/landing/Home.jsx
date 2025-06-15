import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
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
      <Helmet>
        <title>Doctor Bot - Smart Healthcare Solutions</title>
        <meta name="description" content="Welcome to Doctor Bot - Your intelligent healthcare companion. Book appointments, get instant medical guidance, and connect with healthcare professionals." />
      </Helmet>
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

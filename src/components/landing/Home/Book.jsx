import React from 'react';
import book from '../../../assets/img/landing/book.png';
import { Link } from 'react-router-dom';

export const Book = () => {
  return (
    <section className="py-16 bg-[#D8E9DC]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row justify-between items-center gap-12">
        <div className="max-w-[600px] text-center md:text-left">
          <Link
            to="/chatbot"
            className="inline-block bg-white text-green-600 hover:bg-green-700 hover:text-white mb-5 font-semibold px-12 py-3 rounded-full transition duration-200"
          >
            Book an Appointment
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
            Book an appointment in few clicks.
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed">
            Easily book appointments with the right doctor in just a few steps.
            Shows available time slots, and confirms your booking instantly.
            Fast, simple, and hassle-free.
          </p>
        </div>

        <img
          src={book}
          alt="Doctor Bot Chat UI"
          className="w-[250px] sm:w-[300px] mx-auto relative z-10"
        />
      </div>
    </section>
  );
};

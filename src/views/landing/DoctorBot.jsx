import Navbar from 'components/landing/Navbar';
import React from 'react';
import bookImage from '../../assets/img/landing/book.png';
import findImage from '../../assets/img/landing/image 33.png';
import calendarImage from '../../assets/img/landing/image 32.png';
import robotImage from '../../assets/img/landing/f7a08ffce51019b8fb331ac9409719b3-removebg-preview 1.png';
import specialistImage from '../../assets/img/landing/Specialist with Iphone X mask.png';
import chatbotImage from '../../assets/img/landing/chatbot.png';
import Footer from 'components/landing/Footer';

export default function DoctorBot() {
  return (
    <>
      <div>
        <Navbar />
        <section>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            <div>
              <div className='flex items-end gap-x-2'>
                <img src={robotImage} alt="" className='w-14 mb-3' />
                <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-6">
                  Doctor Bot
                </h1>
              </div>
              <p className="text-lg text-black mb-8">
                Easily book appointments and get instant health guidance with
                our smart mobile app — featuring a built-in symptom checker and
                AI-powered chatbot for fast, reliable support
              </p>
            </div>
            <img
              src={bookImage}
              alt="Doctor Bot Chat UI"
              className="w-[250px] max-w-[350px] mx-auto"
            />
          </div>
        </section>
      </div>
      <div className="text-center bg-white py-10">
        <h2 className="text-4xl font-extrabold">How It Works!</h2>
      </div>
      <div className="flex flex-wrap justify-around items-center text-center py-7 pb-16 bg-white">
        <div>
          <img src={findImage} alt="" className="mx-auto mb-4" />
          <h3 className="text-lg font-extrabold mb-2">Find A Doctor</h3>
          <p className="w-80 text-base text-gray-600">
            You can search here for any specialist you need in a specific area.
          </p>
        </div>
        <div>
          <img src={robotImage} alt="" className="mx-auto mb-4" />
          <h3 className="text-lg font-extrabold mb-2">Ask The Bot</h3>
          <p className="w-80 text-base text-gray-600">
            You can use the bot if you don’t know the speciality and it will
            guide you.
          </p>
        </div>
        <div>
          <img src={calendarImage} alt="" className="mx-auto mb-4" />
          <h3 className="text-lg font-extrabold mb-2">Book An Appointment</h3>
          <p className="w-80 text-base text-gray-600">
            You can request an appointment according to the doctor's available
            dates and times.
          </p>
        </div>
      </div>
      <div className="text-center bg-white pt-16">
        <h2 className="text-4xl font-extrabold">
          It Has Many Exciting Features
        </h2>
      </div>
      <div className="flex flex-wrap justify-center items-center bg-white pt-20 gap-y-14">
        <div>
          <img
            src={specialistImage}
            alt=""
            className="w-[200px] max-w-[300px] mx-auto"
          />
        </div>
        <div className=" md:w-[50%] md:pl-36 pl-10">
          <h3 className="text-4xl text-green-700 font-extrabold mb-3">
            Find A Doctor
          </h3>
          <p className="text-lg/8 font-medium">
            Quickly search and discover the right doctor for your needs. Browse
            by specialty, or name, and view detailed profiles including
            qualifications, experience, and availability — making it easy to
            choose the perfect healthcare professional for you.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center bg-white pt-20 gap-x-44 gap-y-14">
        <div className=" md:w-[40%] pl-10">
          <h3 className="text-4xl text-green-700 font-extrabold mb-3">
            Book An Appointment
          </h3>
          <p className="text-lg/8 font-medium">
            Easily schedule a consultation with your preferred doctor at your
            convenience. Browse available dates and times based on the doctor’s
            schedule, select what suits you best, and confirm your appointment —
            all in just a few taps!
          </p>
        </div>
        <div>
          <img src={bookImage} alt="" className="w-[220px] max-w-[310px]" />
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center bg-white pt-20 gap-y-14 pb-36">
        <div>
          <img
            src={chatbotImage}
            alt=""
            className="w-[200px] max-w-[300px] mx-auto"
          />
        </div>
        <div className=" md:w-[50%] md:pl-36 pl-10">
          <h3 className="text-4xl text-green-700 font-extrabold mb-3">
            Ask The Bot
          </h3>
          <p className="text-lg/8 font-medium">
            Not sure which doctor to visit? Describe your symptoms to the
            intelligent bot, and it will guide you to the most suitable medical
            specialist. Get quick, helpful suggestions to ensure you book the
            right appointment for your health concerns.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

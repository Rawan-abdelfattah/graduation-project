import React from 'react';
import phoneImg from 'assets/img/landing/Frame 369.png';
import emailImg from 'assets/img/landing/Frame 370.png';
import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa'; 
import MainLayout from 'layouts/landing/MainLayout';
export default function ContactUs() {
  return (
    <MainLayout>
      <div className="bg-cover bg-center pb-20">
        <div className="py-6">
          <div className=" flex justify-center items-center text-center">
            <div className="mb-5">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                Contact Us
              </h1>
              <p className="text-gray-700">
                Contact us if you have any questions about our company or
                products.
              </p>
              <p className="text-gray-700">
                We will try to provide an answer within a few days.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-white">
        <div className=" lg:grid lg:grid-cols-2 gap-4 py-28 px-28">
          <div className="p-7">
            <h2 className="text-green-700 text-4xl font-extrabold mb-7">
              Leave a message
            </h2>
            <p>
              For help with booking or technical issues, please contact our
              support team. We are dedicated to providing prompt and
              professional assistance.
            </p>
            <div className="flex gap-24 mt-9">
              <div className="phone flex gap-4">
                <img className="w-12" src={phoneImg} alt="phone" />
                <div>
                  <h5 className="text-green-700 font-extrabold">Phone</h5>
                  <p>+02598774525</p>
                </div>
              </div>
              <div className="email flex gap-4">
                <img className="w-12" src={emailImg} alt="email" />
                <div>
                  <h5 className="text-green-700 font-extrabold">Email</h5>
                  <p>doc-bot.com</p>
                </div>
              </div>
            </div>
            <div className="social-media mt-28 flex items-center gap-4">
              <p className="text-green-700 font-extrabold text-2xl mr-10">
                Social Media
              </p>
              <AiFillInstagram className="text-2xl text-green-700" />
              <FaFacebook className="text-xl text-green-700" />
              <FaTwitter className="text-xl text-green-700" />
            </div>
          </div>
          <div className="p-8 py-10 bg-[#E9F2EB] rounded-lg">
            <form>
              <div className="pb-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="w-full">
                  <label htmlFor="name" className="block mb-2 text-green-700 font-extrabold">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="phone" className="block mb-2 text-green-700 font-extrabold">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                    placeholder="Enter your phone"
                    required
                  />
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="mb-2 text-green-700 font-extrabold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow-xs bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                  placeholder="email"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="message"
                  className="mb-2  text-green-700 font-extrabold"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Leave a message..."
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="text-white mb-6 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

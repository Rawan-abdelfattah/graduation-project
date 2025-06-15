import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import bgImg from '../../assets/img/landing/footer-bg.png';
import robot from '../../assets/img/landing/robot.png';
import phone from '../../assets/img/landing/footer-phone.png';
import { Link } from 'react-router-dom';
import ImageWithLoading from '../common/ImageWithLoading';

export default function Footer() {
  const navLinks = [
    { path: '#', label: 'Home' },
    { path: '#', label: 'FAQ' },
    { path: '#', label: 'How it work' },
    { path: '#', label: 'Contact us' },
  ];

  const socialLinks = [
    { icon: <FaInstagram />, path: '#' },
    { icon: <FaFacebookF />, path: '#' },
    { icon: <FaTwitter />, path: '#' },
  ];

  const legalLinks = [
    { path: '/terms-and-conditions', label: 'Terms & Conditions' },
    { path: '/privacy-policy', label: 'Privacy Policy' },
    { path: '#', label: 'Contact Support' },
  ];

  return (
    <footer className="bg-white ">
      <div
        className="text-[20px] font-medium bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="flex flex-col-reverse lg:flex-row justify-around items-center gap-10 pt-[40px] px-4">
          <ImageWithLoading src={phone} className="w-full max-w-[400px]" alt="phone" />

          <div className="max-w-[740px] w-full text-center lg:text-left">
            <h2 className="text-[#3B8F4F] font-bold text-3xl sm:text-4xl lg:text-[40px] leading-snug mb-4">
              Streamline your appointment booking with our AI-powered system and
              smart chatbot
            </h2>

            <div className="w-full max-w-[300px] lg:max-w-[550px] mx-auto lg:mx-0 mt-6 lg:mt-0 bg-transparent rounded-full overflow-hidden flex items-center border border-[#3B8F4F]">
              <input
                type="email"
                placeholder="Enter your email for subscribe"
                className="flex-grow px-4 sm:px-6 py-3 bg-transparent rounded-l-full text-sm text-gray-700 focus:outline-none"
              />
              <button className="bg-[#3B8F4F] text-white px-4 sm:px-6 py-3 rounded-r-full text-sm hover:bg-green-700 transition-all whitespace-nowrap">
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#3B8F4F] text-white px-4 sm:px-8 lg:px-16 py-8">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between items-center lg:items-start space-y-6 lg:space-y-0">
            <div className="flex items-center space-x-3">
              <ImageWithLoading src={robot} className="w-[40px] min-h-[40px]" alt="robot" />
              <h1 className="text-2xl font-bold">Doctor Bot</h1>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-center lg:text-left">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className="hover:underline">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <hr className="my-6 border-white/30" />

          <div className="max-w-7xl mx-auto flex gap-4 flex-col-reverse lg:flex-row justify-between items-center space-y-4 lg:space-y-0 text-center lg:text-left">
            <p>© Copyrights 2025 Doctor bot. All rights reserved.</p>

            <div className="flex gap-4 text-3xl">
              {socialLinks.map((link, index) => (
                <Link key={index} to={link.path} className="hover:text-gray-200">
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
          <hr className="my-6 border-white/30" />

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4 text-center">
            {legalLinks.map((link) => (
              <Link key={link.path} to={link.path} className="hover:underline">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

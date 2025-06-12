import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ImageWithLoading from '../common/ImageWithLoading';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path
      ? 'text-green-700 font-[30px] underline font-[800]'
      : 'text-gray-600 hover:text-green-600';

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/doctor-bot', label: 'Doctor Bot' },
    { path: '/reservation', label: 'Reservation' },
    { path: '/contact-us', label: 'Contact Us' },
    { path: '/sign-in', label: 'Login' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 text-[22px] font-[500] bg-white md:bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link to="/">
            <ImageWithLoading
              src="/logo.png"
              alt="Logo"
              className="w-[80px] mt-4 h-[80px]"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={isActive(item.path)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-green-600 focus:outline-none"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 shadow-lg bg-white">
            <div className="px-4 py-2 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block ${isActive(item.path)}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

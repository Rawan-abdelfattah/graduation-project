import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? 'text-green-700 font-[30px] underline font-[800]'
      : 'text-gray-600 hover:text-green-600';

  return (
    <nav className="sticky top-0 z-50  text-[22px] font-[500]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link to="/">
            {' '}
            <img src="/logo.png" alt="Logo" className="w-[100px] h-[100px]" />
          </Link>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-6">
          <Link to="/" className={isActive('/')}>
            Home
          </Link>
          <Link to="/features" className={isActive('/features')}>
            Features
          </Link>
          <Link to="/how-it-works" className={isActive('/how-it-works')}>
            How it works
          </Link>
          <Link to="/support" className={isActive('/support')}>
            Support
          </Link>
          <Link to="/contact-us" className={isActive('/contact-us')}>
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

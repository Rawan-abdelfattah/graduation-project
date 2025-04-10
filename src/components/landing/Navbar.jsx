import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
<nav className="sticky top-0 z-50  ">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    {/* Logo - Left */}
    <div className="flex-shrink-0">
      <img src="/logo.png" alt="Logo" className="w-[130px] h-[130px]" />
    </div>

    {/* Links - Center */}
    <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-6">
      <Link to="/" className="text-green-700 font-medium hover:underline">Home</Link>
      <Link to="/features" className="text-gray-600 hover:text-green-600">Features</Link>
      <Link to="/how-it-works" className="text-gray-600 hover:text-green-600">How it works</Link>
      <Link to="/support" className="text-gray-600 hover:text-green-600">Support</Link>
    </div>
  </div>
</nav>

  );
};

export default Navbar;

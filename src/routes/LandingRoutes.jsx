import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from 'views/landing/Home';
import { Support } from 'views/landing/Support';
 
export default function LandingLayout() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/support" element={<Support />} />
    </Routes>
  );
}

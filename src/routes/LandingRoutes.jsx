import ContactUs from 'views/landing/ContactUs';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from 'views/landing/Home';
import { PrivacyPolicy } from 'views/landing/PrivacyPolicy';
import { Support } from 'views/landing/Support';
import { TermsAndCondition } from 'views/landing/TermsAndCondition';
import DoctorBot from 'views/landing/DoctorBot';
 
export default function LandingLayout() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/support" element={<Support />} />
      <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/doctor-bot" element={<DoctorBot />} />
    </Routes>
  );
}

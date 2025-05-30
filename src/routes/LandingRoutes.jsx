import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from 'views/landing/Home';
import { PrivacyPolicy } from 'views/landing/PrivacyPolicy';
import { Support } from 'views/landing/Support';
import { TermsAndCondition } from 'views/landing/TermsAndCondition';
 
export default function LandingLayout() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/support" element={<Support />} />
      <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
}

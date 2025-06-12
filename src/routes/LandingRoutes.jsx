import ContactUs from 'views/landing/ContactUs';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from 'views/landing/Home';
import { PrivacyPolicy } from 'views/landing/PrivacyPolicy';
import { TermsAndCondition } from 'views/landing/TermsAndCondition';
import DoctorBot from 'views/landing/DoctorBot';
import Reservation from 'views/landing/Reservation';
import NotFound from 'components/NotFound';
import ReservationSuccess from 'views/landing/ReservationSuccess';
import SignInCentered from 'views/auth/signIn';

export default function LandingLayout() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/doctor-bot" element={<DoctorBot />} />
      <Route path="/reservation" element={<Reservation />} />
      <Route path="/reservation-success" element={<ReservationSuccess />} />
      <Route path="/sign-in" element={<SignInCentered />} />
       <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

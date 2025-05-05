import React from 'react';
import terms from '../../assets/img/landing/terms.png';
import Navbar from 'components/landing/Navbar';
import Footer from 'components/landing/Footer';

const termsData = [
  {
    title: '1. Acceptance of Terms',
    description:
      'By using this app, you confirm that you accept these Terms and Conditions and agree to comply with them. If you do not agree, please do not use the service.',
  },
  {
    title: '2. Services Provided',
    description: `Our app offers:
- AI-powered symptom checking
- Doctor and specialist recommendations
- Appointment booking with healthcare providers
- 24/7 chatbot support for general guidance`,
  },
  {
    title: '3. User Responsibilities',
    description: `You agree to:
- Provide accurate and complete information when using the app
- Use the app only for lawful and intended purposes
- Not misuse the chatbot or booking system (e.g., false symptoms, spam appointments)`,
  },
  {
    title: '4. Medical Disclaimer',
    description:
      'Our chatbot and symptom checker are not a substitute for medical diagnosis. The AI provides general guidance based on input data. For medical emergencies or specific diagnoses, consult a licensed healthcare provider.',
  },
  {
    title: '5. Privacy and Data Security',
    description:
      'Your personal data is handled according to our [Privacy Policy]. We use encryption and other safeguards to protect your information. We do not share your data with third parties without your consent, unless required by law.',
  },
  {
    title: '6. Modifications to the Service',
    description:
      'We reserve the right to update or modify any part of the app or these Terms at any time. Continued use after changes indicates your acceptance of the new terms.',
  },
  {
    title: '7. Limitation of Liability',
    description:
      'We strive to maintain reliable and accurate service, but we make no guarantees regarding the accuracy of AI outputs or uninterrupted access. We are not liable for any direct or indirect damages resulting from use of the app.',
  },
  {
    title: '8. Termination',
    description:
      'We may suspend or terminate your access if you violate these terms or misuse the app.',
  },
  {
    title: '9. Contact Information',
    description:
      'If you have any questions or concerns regarding these Terms and Conditions, please contact us:\n📧 Email: support@doc-bot.com',
  },
];

export const TermsAndCondition = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row justify-between items-center gap-12">
          <div className="max-w-[600px] text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
              Terms and Conditions
            </h1>
            <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed">
              By accessing or using our AI-powered appointment booking system
              and chatbot services, you agree to be bound by the following Terms
              and Conditions. Please read them carefully.
            </p>
          </div>

          <img
            src={terms}
            alt="Doctor Bot Chat UI"
            className="w-[300px] sm:w-[400px] mx-auto relative z-10"
          />
        </div> 
        <div className="max-w-7xl mx-auto px-6 mt-10 space-y-8">
          {termsData.map((term, index) => (
            <div key={index}>
              <h2 className="text-2xl font-bold mb-2">{term.title}</h2>
              <p className="text-gray-700 max-w-5xl whitespace-pre-line">{term.description}</p>
            </div>
          ))}
        </div>

      </section>
      <Footer />
    </div>
  );
};

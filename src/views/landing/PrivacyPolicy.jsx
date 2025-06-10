import React from 'react';
import privacy from '../../assets/img/landing/privacy.png';
import MainLayout from 'layouts/landing/MainLayout';

const privacyPolicyData = [
  {
    title: '1. Information We Collect',
    description: `We may collect the following types of information:
- Personal Information: Name, email, phone number, age, gender.
- Health-related Information: Symptoms entered into the chatbot, doctor preferences, and appointment history.
- Usage Data: Device information, IP address, and interaction data for analytics and app improvement.`,
  },
  {
    title: '2. How We Use Your Information',
    description: `We use your information to:
- Provide and improve our services
- Suggest appropriate medical specialists based on symptoms
- Schedule and manage appointments
- Communicate with you (reminders, updates)
- Ensure app security and monitor usage`,
  },
  {
    title: '3. Data Sharing and Disclosure',
    description: `We do not sell or rent your personal data. We may share data only in the following cases:
- With healthcare providers to confirm appointments
- With trusted service providers (e.g., hosting, analytics) who help operate the app
- If required by law or to protect legal rights`,
  },
  {
    title: '4. Data Security',
    description:
      'We use encryption, secure servers, and regular monitoring to protect your data from unauthorized access, alteration, or loss.',
  },
  {
    title: '5. Your Rights',
    description: `You have the right to:
- Access and review your personal data
- Request corrections to inaccurate information
- Request deletion of your data (subject to legal obligations)`,
  },
  {
    title: '6. Changes to This Policy',
    description:
      'We may update this Privacy Policy from time to time. We will notify you of significant changes through the app or via email.',
  },
  {
    title: '7. Contact Information',
    description:
      'If you have any questions or concerns regarding these Terms and Conditions, please contact us:\n📧 Email: support@doc-bot.com',
  },
];

export const PrivacyPolicy = () => {
  return (
    <MainLayout>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row justify-between items-center gap-12">
          <div className="max-w-[600px] text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
              Privacy Policy{' '}
            </h1>
            <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed">
              Your privacy is important to us. This Privacy Policy explains how
              we collect, use, and protect your personal information when you
              use our mobile app and services.
            </p>
          </div>

          <img
            src={privacy}
            alt="Doctor Bot Chat UI"
            className="w-[300px] sm:w-[400px] mx-auto relative z-10"
          />
        </div>
 
        <div className="max-w-7xl mx-auto px-6 mt-10 space-y-8">
          {privacyPolicyData.map((term, index) => (
            <div key={index}>
              <h2 className="text-2xl font-bold mb-2">{term.title}</h2>
              <p className="text-gray-700 max-w-5xl whitespace-pre-line">
                {term.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

// src/pages/TermsOfService.jsx
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/login" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </Link>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="space-y-6 text-gray-600">
            <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using Pezzi's attendance and payroll management system, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Description of Service</h2>
              <p>Pezzi provides a web-based attendance tracking and payroll management platform for businesses and their employees. The service includes features such as:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Employee attendance tracking</li>
                <li>Payroll processing tools</li>
                <li>Leave management</li>
                <li>Reporting and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. User Accounts</h2>
              <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Use the service for any illegal purposes</li>
                <li>Share account credentials with unauthorized users</li>
                <li>Attempt to bypass security measures</li>
                <li>Interfere with the proper functioning of the service</li>
                <li>Submit false or misleading information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Data Accuracy</h2>
              <p>You are responsible for ensuring the accuracy of information you provide through our service. Pezzi is not liable for any issues arising from inaccurate data entry.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Intellectual Property</h2>
              <p>The Pezzi platform, including its design, features, and content, is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, or reverse engineer any part of our service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Limitation of Liability</h2>
              <p>Pezzi shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Modifications to Service</h2>
              <p>We reserve the right to modify or discontinue the service at any time, with or without notice. We shall not be liable to you or any third party for any modification or discontinuance.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Governing Law</h2>
              <p>These Terms shall be governed by the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Contact Information</h2>
              <p>For questions about these Terms, please contact us at:</p>
              <p className="mt-2">
                Email: legal@pezzi.com<br />
                Address: [Your Company Address]
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
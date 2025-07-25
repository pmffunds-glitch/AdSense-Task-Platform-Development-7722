import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> December 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect information you provide directly to us, such as when you create an account, 
                complete tasks, or contact us for support.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Personal information (name, email address)</li>
                <li>Task completion data and performance metrics</li>
                <li>Payment and payout information</li>
                <li>Device and usage information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide and maintain our services</li>
                <li>Process task completions and calculate earnings</li>
                <li>Send you technical notices and support messages</li>
                <li>Monitor and analyze platform usage and performance</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. AdSense and Revenue Sharing</h2>
              <p className="text-gray-700 mb-4">
                Our platform uses Google AdSense to generate revenue that is shared with our users. 
                By using our platform:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>You consent to the display of advertisements on pages you visit</li>
                <li>Google may collect data about your ad interactions as per their privacy policy</li>
                <li>We track page views and ad impressions for revenue calculation purposes</li>
                <li>Revenue sharing is calculated transparently based on your activity</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal requirements</li>
                <li>With service providers who assist in operating our platform</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-700 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Access and update your personal information</li>
                <li>Delete your account and associated data</li>
                <li>Opt-out of certain communications</li>
                <li>Request information about how your data is processed</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to enhance your experience, analyze usage, 
                and support our advertising partners. You can control cookie settings through your browser.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this privacy policy from time to time. We will notify you of any 
                significant changes by posting the new policy on this page and updating the 
                "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about this privacy policy or our practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@taskearn.com<br />
                  <strong>Address:</strong> TaskEarn Privacy Team<br />
                  123 Revenue Street, Suite 100<br />
                  San Francisco, CA 94105
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
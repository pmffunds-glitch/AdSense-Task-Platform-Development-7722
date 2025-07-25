import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> December 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using TaskEarn ("the Platform"), you accept and agree to be bound by 
                these Terms of Service. If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Platform Description</h2>
              <p className="text-gray-700 mb-4">
                TaskEarn is a revenue-sharing platform where users complete simple tasks and earn money 
                through our AdSense-integrated system. Revenue is generated from advertisements and 
                shared transparently with active users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">As a user of our platform, you agree to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide accurate and truthful information</li>
                <li>Complete tasks honestly and according to instructions</li>
                <li>Not engage in fraudulent or deceptive activities</li>
                <li>Not attempt to manipulate the revenue-sharing system</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not use automated tools or bots to complete tasks</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Revenue Sharing and Payments</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">4.1 Revenue Generation</h3>
                  <p className="text-gray-700">
                    Revenue is generated through Google AdSense advertisements displayed on our platform. 
                    All ad revenue is managed through our centralized AdSense account.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">4.2 Revenue Sharing</h3>
                  <p className="text-gray-700">
                    Users earn money based on task completion and ad engagement. The revenue sharing 
                    algorithm considers factors including tasks completed, points earned, and platform engagement.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">4.3 Payout Terms</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Minimum payout threshold: $10.00</li>
                    <li>Payouts are processed monthly</li>
                    <li>Payment methods: PayPal, bank transfer</li>
                    <li>Users are responsible for applicable taxes</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. AdSense Compliance</h2>
              <p className="text-gray-700 mb-4">
                All users must comply with Google AdSense policies:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>No clicking on ads for the purpose of generating revenue</li>
                <li>No encouraging others to click on advertisements</li>
                <li>No fraudulent activity related to ad impressions or clicks</li>
                <li>Compliance with Google's publisher policies</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Violation of AdSense policies may result in immediate account suspension and forfeiture of earnings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Task Completion Rules</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Tasks must be completed personally by the account holder</li>
                <li>Each task can only be completed once per user</li>
                <li>Tasks must be completed accurately and completely</li>
                <li>Proof of completion may be required for certain tasks</li>
                <li>We reserve the right to verify task completion</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Account Suspension and Termination</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to suspend or terminate accounts for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Violation of these terms of service</li>
                <li>Fraudulent or deceptive activity</li>
                <li>Violation of AdSense policies</li>
                <li>Abuse of the platform or other users</li>
                <li>Inactivity for extended periods</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content, features, and functionality of the platform are owned by TaskEarn and 
                are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Disclaimers and Limitations</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">9.1 Platform Availability</h3>
                  <p className="text-gray-700">
                    We do not guarantee continuous, uninterrupted access to the platform. 
                    Maintenance, updates, or technical issues may cause temporary unavailability.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">9.2 Revenue Disclaimer</h3>
                  <p className="text-gray-700">
                    Earnings are dependent on ad revenue performance and user activity. 
                    We do not guarantee specific earning amounts or revenue levels.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. Users will be notified 
                of significant changes, and continued use of the platform constitutes acceptance 
                of the updated terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
              <p className="text-gray-700">
                For questions about these terms or our platform, contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@taskearn.com<br />
                  <strong>Address:</strong> TaskEarn Legal Department<br />
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

export default TermsOfService;
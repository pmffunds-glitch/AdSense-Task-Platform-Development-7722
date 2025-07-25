import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import AdUnit from '../components/ads/AdUnit';
import * as FiIcons from 'react-icons/fi';

const { FiDollarSign, FiTarget, FiUsers, FiTrendingUp, FiCheckCircle, FiArrowRight } = FiIcons;

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: FiDollarSign,
      title: 'Earn Real Money',
      description: 'Complete simple tasks and earn money through our revenue-sharing program powered by AdSense.'
    },
    {
      icon: FiTarget,
      title: 'Simple Tasks',
      description: 'Copy URLs, visit pages, and complete straightforward activities that take just minutes.'
    },
    {
      icon: FiUsers,
      title: 'Community Driven',
      description: 'Join thousands of users earning money together in our transparent revenue-sharing ecosystem.'
    },
    {
      icon: FiTrendingUp,
      title: 'Track Progress',
      description: 'Monitor your earnings, completed tasks, and revenue share with detailed analytics.'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '10,000+' },
    { label: 'Tasks Completed', value: '500K+' },
    { label: 'Revenue Shared', value: '$50,000+' },
    { label: 'Average Earnings', value: '$25/month' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Earn Money with
                <span className="text-primary-600 block">Simple Tasks</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join our community-driven platform where you earn real money by completing 
                simple copy-paste tasks. Revenue is generated through AdSense and shared 
                transparently with our users.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Go to Dashboard</span>
                    <SafeIcon icon={FiArrowRight} />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Get Started</span>
                      <SafeIcon icon={FiArrowRight} />
                    </Link>
                    <Link
                      to="/login"
                      className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-colors"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Revenue Dashboard</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Earnings</span>
                    <span className="text-2xl font-bold text-green-600">$1,247.83</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tasks Completed</span>
                    <span className="text-lg font-semibold">1,543</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Revenue Share</span>
                    <span className="text-lg font-semibold text-primary-600">12.4%</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiCheckCircle} className="text-green-600" />
                    <span className="text-green-800 font-medium">Payout Ready: $247.83</span>
                  </div>
                </div>
              </div>
              
              {/* Ad Unit */}
              <div className="mt-6">
                <AdUnit 
                  adSlot="1234567890"
                  className="w-full h-24"
                  style={{ minHeight: '100px' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TaskEarn?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines simplicity with transparency, ensuring fair 
              revenue distribution through AdSense integration.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <SafeIcon icon={feature.icon} className="text-2xl text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Earning?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already earning money through our 
              transparent revenue-sharing program.
            </p>
            {!user && (
              <Link
                to="/register"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
              >
                <span>Create Free Account</span>
                <SafeIcon icon={FiArrowRight} />
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
import React from 'react';
import { Link } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiDollarSign, FiMail, FiTwitter, FiFacebook, FiInstagram } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiDollarSign} className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold">TaskEarn</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Earn money by completing simple tasks. Our platform connects users with monetized activities 
              through our AdSense-integrated task system.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <SafeIcon icon={FiTwitter} className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <SafeIcon icon={FiFacebook} className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <SafeIcon icon={FiInstagram} className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tasks" className="text-gray-300 hover:text-white transition-colors">
                  Browse Tasks
                </Link>
              </li>
              <li>
                <Link to="/earnings" className="text-gray-300 hover:text-white transition-colors">
                  My Earnings
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 TaskEarn. All rights reserved. | 
            <span className="text-sm ml-1">
              Revenue generated through Google AdSense is shared with our community members.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
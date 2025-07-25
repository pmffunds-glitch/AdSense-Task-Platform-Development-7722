import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiUser, FiLogOut, FiDollarSign, FiTarget, FiSettings } = FiIcons;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = user ? [
    { path: '/dashboard', label: 'Dashboard', icon: FiTarget },
    { path: '/tasks', label: 'Tasks', icon: FiTarget },
    { path: '/earnings', label: 'Earnings', icon: FiDollarSign },
    { path: '/profile', label: 'Profile', icon: FiUser },
  ] : [
    { path: '/login', label: 'Login', icon: FiUser },
    { path: '/register', label: 'Sign Up', icon: FiUser },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiDollarSign} className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold text-gray-900">TaskEarn</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <SafeIcon icon={link.icon} className="text-sm" />
                <span>{link.label}</span>
              </Link>
            ))}
            
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <SafeIcon icon={FiLogOut} className="text-sm" />
                <span>Logout</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2"
            >
              <SafeIcon icon={isOpen ? FiX : FiMenu} className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <SafeIcon icon={link.icon} className="text-lg" />
                <span>{link.label}</span>
              </Link>
            ))}
            
            {user && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <SafeIcon icon={FiLogOut} className="text-lg" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
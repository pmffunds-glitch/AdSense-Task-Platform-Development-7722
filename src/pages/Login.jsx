import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AdUnit from '../components/ads/AdUnit';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiLock, FiEye, FiEyeOff } = FiIcons;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoginError('');
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (email, password) => {
    setValue('email', email);
    setValue('password', password);
    // Submit the form programmatically
    handleSubmit(onSubmit)();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900">Sign in to TaskEarn</h2>
          <p className="mt-2 text-gray-600">
            Welcome back! Start earning money with simple tasks.
          </p>
        </motion.div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
        >
          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {loginError}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SafeIcon icon={FiMail} className="text-gray-400" />
                </div>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SafeIcon icon={FiLock} className="text-gray-400" />
                </div>
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  type={showPassword ? 'text' : 'password'}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <SafeIcon
                    icon={showPassword ? FiEyeOff : FiEye}
                    className="text-gray-400 hover:text-gray-600"
                  />
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <LoadingSpinner size="sm" /> : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">New to TaskEarn?</span>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/register"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Create new account
              </Link>
            </div>
          </div>

          {/* Demo Accounts */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-800 mb-2">Demo Accounts:</h4>
            <div className="grid grid-cols-1 gap-2">
              <button 
                onClick={() => handleDemoLogin('admin@taskearn.com', 'admin123')}
                className="py-2 px-3 bg-blue-50 hover:bg-blue-100 rounded-md border border-blue-200 text-sm text-blue-700 transition-colors"
              >
                Login as Admin
              </button>
              <button 
                onClick={() => handleDemoLogin('mod@taskearn.com', 'mod123')}
                className="py-2 px-3 bg-purple-50 hover:bg-purple-100 rounded-md border border-purple-200 text-sm text-purple-700 transition-colors"
              >
                Login as Moderator
              </button>
              <button 
                onClick={() => handleDemoLogin('demo@taskearn.com', 'demo123')}
                className="py-2 px-3 bg-green-50 hover:bg-green-100 rounded-md border border-green-200 text-sm text-green-700 transition-colors"
              >
                Login as User
              </button>
            </div>
          </div>
        </motion.div>

        {/* Ad Unit */}
        <div className="mt-6">
          <AdUnit adSlot="2345678901" className="w-full" style={{ minHeight: '100px' }} />
        </div>
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useTask } from '../contexts/TaskContext';
import { useRevenue } from '../contexts/RevenueContext';
import SafeIcon from '../common/SafeIcon';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AdUnit from '../components/ads/AdUnit';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiMail, FiCalendar, FiEdit, FiSave, FiX, FiSettings, FiShield } = FiIcons;

const Profile = () => {
  const { user, logout } = useAuth();
  const { userTasks } = useTask();
  const { earnings } = useRevenue();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || ''
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Here you would update the user profile
      // await authService.updateProfile(data);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const profileStats = [
    {
      label: 'Member Since',
      value: user?.joinedAt ? format(new Date(user.joinedAt), 'MMM dd, yyyy') : 'Unknown',
      icon: FiCalendar
    },
    {
      label: 'Tasks Completed',
      value: userTasks.length,
      icon: FiUser
    },
    {
      label: 'Total Earnings',
      value: `$${earnings?.totalEarnings?.toFixed(2) || '0.00'}`,
      icon: FiUser
    },
    {
      label: 'Account Status',
      value: 'Active',
      icon: FiShield
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account information and preferences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg shadow"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Personal Information
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                    >
                      <SafeIcon icon={FiEdit} />
                      <span>Edit</span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleCancel}
                        className="flex items-center space-x-1 text-gray-600 hover:text-gray-700"
                      >
                        <SafeIcon icon={FiX} />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SafeIcon icon={FiUser} className="text-gray-400" />
                        </div>
                        <input
                          {...register('name', {
                            required: 'Name is required',
                            minLength: {
                              value: 2,
                              message: 'Name must be at least 2 characters'
                            }
                          })}
                          type="text"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
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
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="flex items-center space-x-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {isLoading ? <LoadingSpinner size="sm" /> : <SafeIcon icon={FiSave} />}
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiUser} className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Full Name</p>
                        <p className="font-medium text-gray-900">{user?.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiMail} className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Email Address</p>
                        <p className="font-medium text-gray-900">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Account Statistics */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Account Statistics
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profileStats.map((stat, index) => (
                    <div key={stat.label} className="flex items-center space-x-3">
                      <div className="bg-primary-100 p-2 rounded-lg">
                        <SafeIcon icon={stat.icon} className="text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="font-medium text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Security Settings */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-lg shadow"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Security & Privacy
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiShield} className="text-gray-400" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Change Password</p>
                      <p className="text-sm text-gray-600">Update your account password</p>
                    </div>
                  </div>
                  <SafeIcon icon={FiEdit} className="text-gray-400" />
                </button>

                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiSettings} className="text-gray-400" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Privacy Settings</p>
                      <p className="text-sm text-gray-600">Manage your privacy preferences</p>
                    </div>
                  </div>
                  <SafeIcon icon={FiEdit} className="text-gray-400" />
                </button>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={logout}
                    className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Profile Avatar */}
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{user?.name}</h3>
              <p className="text-gray-600">{user?.email}</p>
              <div className="mt-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active Member
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Rank</span>
                  <span className="font-medium text-primary-600">
                    {userTasks.length < 5 ? 'Beginner' : 
                     userTasks.length < 20 ? 'Intermediate' : 'Expert'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-medium text-green-600">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Points</span>
                  <span className="font-medium">{earnings?.totalPoints || 0}</span>
                </div>
              </div>
            </div>

            {/* Ad Unit */}
            <AdUnit 
              adSlot="8901234567"
              className="w-full"
              style={{ minHeight: '250px' }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
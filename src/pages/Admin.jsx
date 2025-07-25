import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useTask } from '../contexts/TaskContext';
import { useRevenue } from '../contexts/RevenueContext';
import { useUser } from '../contexts/UserContext';
import SafeIcon from '../common/SafeIcon';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import UserManagement from '../components/admin/UserManagement';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiEdit, FiTrash, FiUsers, FiDollarSign, FiTarget, FiTrendingUp } = FiIcons;

const Admin = () => {
  const { tasks, createTask, loading } = useTask();
  const { revenueStats } = useRevenue();
  const { userStats } = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await createTask({
        ...data,
        points: parseInt(data.points),
        instructions: data.instructions.split('\n').filter(i => i.trim())
      });
      toast.success('Task created successfully!');
      reset();
      setIsCreating(false);
    } catch (error) {
      toast.error('Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const adminStats = [
    {
      title: 'Total Users',
      value: userStats?.totalUsers || '0',
      icon: FiUsers,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Revenue',
      value: `$${revenueStats?.totalRevenue?.toFixed(2) || '0.00'}`,
      icon: FiDollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Active Tasks',
      value: tasks.length,
      icon: FiTarget,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Page Views',
      value: revenueStats?.totalPageViews?.toLocaleString() || '0',
      icon: FiTrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'users', label: 'User Management' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'revenue', label: 'Revenue' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage users, tasks, and monitor revenue performance.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <SafeIcon icon={stat.icon} className={`text-xl ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Platform Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">
                          New user registration: john@example.com
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">
                          Task completed: Copy Product URL
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">
                          Payout processed: $25.00
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      System Status
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">AdSense Status</span>
                        <span className="text-sm font-medium text-green-600">Active</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Server Status</span>
                        <span className="text-sm font-medium text-green-600">Online</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Database</span>
                        <span className="text-sm font-medium text-green-600">Connected</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <UserManagement />
              </motion.div>
            )}

            {activeTab === 'tasks' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Task Management
                  </h2>
                  <button
                    onClick={() => setIsCreating(true)}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                  >
                    <SafeIcon icon={FiPlus} />
                    <span>Create Task</span>
                  </button>
                </div>

                {isCreating && (
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Create New Task
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Task Title
                          </label>
                          <input
                            {...register('title', { required: 'Title is required' })}
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                          {errors.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Task Type
                          </label>
                          <select
                            {...register('type', { required: 'Type is required' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          >
                            <option value="">Select type</option>
                            <option value="copy_paste">Copy & Paste</option>
                            <option value="visit_review">Visit & Review</option>
                            <option value="social_share">Social Share</option>
                          </select>
                          {errors.type && (
                            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          {...register('description', { required: 'Description is required' })}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                        {errors.description && (
                          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Points
                          </label>
                          <input
                            {...register('points', {
                              required: 'Points is required',
                              min: { value: 1, message: 'Points must be at least 1' }
                            })}
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                          {errors.points && (
                            <p className="mt-1 text-sm text-red-600">{errors.points.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Estimated Time
                          </label>
                          <input
                            {...register('estimatedTime', { required: 'Time is required' })}
                            type="text"
                            placeholder="e.g., 5 minutes"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                          {errors.estimatedTime && (
                            <p className="mt-1 text-sm text-red-600">{errors.estimatedTime.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Target URL
                          </label>
                          <input
                            {...register('targetUrl', { required: 'URL is required' })}
                            type="url"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          />
                          {errors.targetUrl && (
                            <p className="mt-1 text-sm text-red-600">{errors.targetUrl.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Instructions (one per line)
                        </label>
                        <textarea
                          {...register('instructions', { required: 'Instructions are required' })}
                          rows={4}
                          placeholder="Step 1: Do this&#10;Step 2: Do that&#10;Step 3: Complete"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                        {errors.instructions && (
                          <p className="mt-1 text-sm text-red-600">{errors.instructions.message}</p>
                        )}
                      </div>

                      <div className="flex items-center space-x-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                        >
                          {isSubmitting ? <LoadingSpinner size="sm" /> : 'Create Task'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsCreating(false)}
                          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Tasks List */}
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{task.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-green-600">+{task.points} points</span>
                            <span className="text-sm text-gray-500">{task.estimatedTime}</span>
                            <span className="text-sm text-blue-600">{task.type}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-700">
                            <SafeIcon icon={FiEdit} />
                          </button>
                          <button className="text-red-600 hover:text-red-700">
                            <SafeIcon icon={FiTrash} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'revenue' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Revenue Analytics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Revenue Summary
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Revenue</span>
                        <span className="font-medium">
                          ${revenueStats?.totalRevenue?.toFixed(2) || '0.00'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Page Views</span>
                        <span className="font-medium">
                          {revenueStats?.totalPageViews?.toLocaleString() || '0'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average RPM</span>
                        <span className="font-medium">
                          ${revenueStats?.averageRPM?.toFixed(2) || '0.00'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      AdSense Performance
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ad Clicks</span>
                        <span className="font-medium">
                          {revenueStats?.totalAdClicks || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">CTR</span>
                        <span className="font-medium">
                          {revenueStats?.totalPageViews > 0
                            ? ((revenueStats.totalAdClicks / revenueStats.totalPageViews) * 100).toFixed(2)
                            : '0.00'}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status</span>
                        <span className="font-medium text-green-600">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
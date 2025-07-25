import React from 'react';
import { motion } from 'framer-motion';
import { useRevenue } from '../contexts/RevenueContext';
import { useAuth } from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AdUnit from '../components/ads/AdUnit';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import * as FiIcons from 'react-icons/fi';

const { FiDollarSign, FiTrendingUp, FiTarget, FiEye, FiDownload, FiCreditCard } = FiIcons;

const Earnings = () => {
  const { earnings, revenueStats, loading } = useRevenue();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Earnings',
      value: `$${earnings?.totalEarnings?.toFixed(2) || '0.00'}`,
      icon: FiDollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+12.5%'
    },
    {
      title: 'Task Earnings',
      value: `$${earnings?.taskEarnings?.toFixed(2) || '0.00'}`,
      icon: FiTarget,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+8.3%'
    },
    {
      title: 'Ad Revenue',
      value: `$${earnings?.adRevenue?.toFixed(2) || '0.00'}`,
      icon: FiEye,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+15.7%'
    },
    {
      title: 'Pending Payout',
      value: `$${earnings?.pendingPayout?.toFixed(2) || '0.00'}`,
      icon: FiCreditCard,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: earnings?.pendingPayout > 0 ? 'Ready!' : 'Pending'
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Earnings Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Track your earnings from tasks and ad revenue sharing.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.change.includes('+') ? 'text-green-600' : 
                    stat.change === 'Ready!' ? 'text-orange-600' : 'text-gray-500'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <SafeIcon icon={stat.icon} className={`text-xl ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Earnings Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Earnings Over Time
                </h2>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={earnings?.earningsHistory || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value.toFixed(2)}`, 'Earnings']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="earnings" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Activity Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-lg shadow"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Daily Activity
                </h2>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={earnings?.earningsHistory || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="tasks" fill="#10b981" name="Tasks Completed" />
                    <Bar dataKey="adViews" fill="#8b5cf6" name="Ad Views" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Payout Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-lg shadow"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Payout Information
                </h2>
              </div>
              <div className="p-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiCreditCard} className="text-2xl text-blue-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900">
                        Payout Threshold: ${earnings?.payoutThreshold || 10}
                      </h3>
                      <p className="text-blue-700">
                        {earnings?.pendingPayout > 0 
                          ? `You have $${earnings.pendingPayout.toFixed(2)} ready for payout!`
                          : `Earn $${(earnings?.payoutThreshold - (earnings?.totalEarnings || 0)).toFixed(2)} more to reach payout threshold.`
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {earnings?.pendingPayout > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Request Payout</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                        PayPal Payout
                      </button>
                      <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                        Bank Transfer
                      </button>
                    </div>
                  </div>
                )}
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
            {/* Revenue Share Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Revenue Share
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Platform Revenue</span>
                  <span className="font-medium">
                    ${revenueStats?.totalRevenue?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Your Share</span>
                  <span className="font-medium text-primary-600">
                    {revenueStats?.userSharePercentage || '0.00'}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Page Views</span>
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

            {/* Performance Metrics */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Performance Metrics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tasks Completed</span>
                  <span className="font-medium">{earnings?.tasksCompleted || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Points</span>
                  <span className="font-medium">{earnings?.totalPoints || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ad Views</span>
                  <span className="font-medium">{earnings?.adViewsCount || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. per Task</span>
                  <span className="font-medium text-green-600">
                    ${earnings?.tasksCompleted > 0 ? (earnings.taskEarnings / earnings.tasksCompleted).toFixed(2) : '0.00'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  <SafeIcon icon={FiDownload} />
                  <span>Download Report</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <SafeIcon icon={FiTrendingUp} />
                  <span>View Analytics</span>
                </button>
              </div>
            </div>

            {/* Ad Unit */}
            <AdUnit 
              adSlot="7890123456"
              className="w-full"
              style={{ minHeight: '250px' }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
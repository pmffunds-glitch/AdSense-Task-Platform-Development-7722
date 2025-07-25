import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTask } from '../contexts/TaskContext';
import { useRevenue } from '../contexts/RevenueContext';
import SafeIcon from '../common/SafeIcon';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AdUnit from '../components/ads/AdUnit';
import * as FiIcons from 'react-icons/fi';

const { FiDollarSign, FiTarget, FiTrendingUp, FiUsers, FiArrowRight, FiCalendar } = FiIcons;

const Dashboard = () => {
  const { user } = useAuth();
  const { tasks, userTasks, loading: tasksLoading } = useTask();
  const { earnings, loading: earningsLoading } = useRevenue();

  if (tasksLoading || earningsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  const availableTasks = tasks.filter(task => 
    !userTasks.some(userTask => userTask.taskId === task.id)
  );

  const stats = [
    {
      title: 'Total Earnings',
      value: `$${earnings?.totalEarnings?.toFixed(2) || '0.00'}`,
      icon: FiDollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Tasks Completed',
      value: userTasks.length,
      icon: FiTarget,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Available Tasks',
      value: availableTasks.length,
      icon: FiTrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Total Points',
      value: earnings?.totalPoints || 0,
      icon: FiUsers,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const recentTasks = userTasks.slice(-3).reverse();

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
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's your earnings overview and available tasks.
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Tasks */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Available Tasks
                  </h2>
                  <Link
                    to="/tasks"
                    className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
                  >
                    <span>View all</span>
                    <SafeIcon icon={FiArrowRight} className="text-sm" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {availableTasks.length > 0 ? (
                  <div className="space-y-4">
                    {availableTasks.slice(0, 3).map((task) => (
                      <div
                        key={task.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{task.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {task.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm text-green-600 font-medium">
                                +{task.points} points
                              </span>
                              <span className="text-sm text-gray-500">
                                {task.estimatedTime}
                              </span>
                            </div>
                          </div>
                          <Link
                            to={`/tasks/${task.id}`}
                            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                          >
                            Start
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <SafeIcon icon={FiTarget} className="text-4xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No available tasks at the moment.</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Check back later for new opportunities!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Earnings Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Earnings Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Task Earnings</span>
                  <span className="font-medium">
                    ${earnings?.taskEarnings?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ad Revenue</span>
                  <span className="font-medium">
                    ${earnings?.adRevenue?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-green-600">
                    ${earnings?.totalEarnings?.toFixed(2) || '0.00'}
                  </span>
                </div>
              </div>
              <Link
                to="/earnings"
                className="block w-full mt-4 bg-primary-600 text-white text-center py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                View Details
              </Link>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>
              {recentTasks.length > 0 ? (
                <div className="space-y-3">
                  {recentTasks.map((task) => {
                    const taskInfo = tasks.find(t => t.id === task.taskId);
                    return (
                      <div key={task.id} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {taskInfo?.title || 'Task'}
                          </p>
                          <p className="text-xs text-gray-500">
                            +{task.points} points
                          </p>
                        </div>
                        <SafeIcon icon={FiCalendar} className="text-gray-400 text-sm" />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-600 text-sm">No recent activity</p>
              )}
            </div>

            {/* Ad Unit */}
            <AdUnit 
              adSlot="4567890123"
              className="w-full"
              style={{ minHeight: '250px' }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
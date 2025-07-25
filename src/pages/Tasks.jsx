import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTask } from '../contexts/TaskContext';
import SafeIcon from '../common/SafeIcon';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AdUnit from '../components/ads/AdUnit';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiFilter, FiTarget, FiClock, FiDollarSign, FiCheck } = FiIcons;

const Tasks = () => {
  const { tasks, userTasks, loading } = useTask();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  const completedTaskIds = userTasks.map(task => task.taskId);
  
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'available' && !completedTaskIds.includes(task.id)) ||
                         (filterType === 'completed' && completedTaskIds.includes(task.id));

    return matchesSearch && matchesFilter;
  });

  const getTaskStatus = (taskId) => {
    return completedTaskIds.includes(taskId) ? 'completed' : 'available';
  };

  const taskTypes = [
    { value: 'all', label: 'All Tasks' },
    { value: 'available', label: 'Available' },
    { value: 'completed', label: 'Completed' }
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
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-2">
            Complete simple tasks to earn money and points.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 bg-white rounded-lg shadow p-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SafeIcon icon={FiSearch} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiFilter} className="text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                {taskTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tasks List */}
          <div className="lg:col-span-3">
            {filteredTasks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTasks.map((task, index) => {
                  const status = getTaskStatus(task.id);
                  
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={`bg-white rounded-lg shadow hover:shadow-lg transition-shadow ${
                        status === 'completed' ? 'opacity-75' : ''
                      }`}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {task.title}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {task.description}
                            </p>
                          </div>
                          {status === 'completed' && (
                            <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                              <SafeIcon icon={FiCheck} className="text-xs" />
                              <span>Completed</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center space-x-1 text-green-600">
                            <SafeIcon icon={FiDollarSign} className="text-sm" />
                            <span className="text-sm font-medium">+{task.points} points</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <SafeIcon icon={FiClock} className="text-sm" />
                            <span className="text-sm">{task.estimatedTime}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            task.type === 'copy_paste' ? 'bg-blue-100 text-blue-800' :
                            task.type === 'visit_review' ? 'bg-purple-100 text-purple-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {task.type.replace('_', ' ').toUpperCase()}
                          </span>
                          
                          {status === 'available' ? (
                            <Link
                              to={`/tasks/${task.id}`}
                              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                            >
                              Start Task
                            </Link>
                          ) : (
                            <span className="text-green-600 text-sm font-medium">
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-lg shadow p-12 text-center"
              >
                <SafeIcon icon={FiTarget} className="text-6xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No tasks found
                </h3>
                <p className="text-gray-600">
                  {searchTerm || filterType !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Check back later for new tasks!'
                  }
                </p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Task Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Task Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Tasks</span>
                  <span className="font-medium">{tasks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-medium text-green-600">{userTasks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available</span>
                  <span className="font-medium text-blue-600">
                    {tasks.length - userTasks.length}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold text-gray-900">Completion Rate</span>
                  <span className="font-bold text-primary-600">
                    {tasks.length > 0 ? Math.round((userTasks.length / tasks.length) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>

            {/* Task Tips */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Task Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Read instructions carefully before starting</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Complete tasks in order of highest points first</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Take screenshots as proof when required</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Check back daily for new tasks</span>
                </li>
              </ul>
            </div>

            {/* Ad Unit */}
            <AdUnit 
              adSlot="5678901234"
              className="w-full"
              style={{ minHeight: '250px' }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
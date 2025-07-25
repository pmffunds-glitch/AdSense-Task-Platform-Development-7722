import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTask } from '../contexts/TaskContext';
import { useForm } from 'react-hook-form';
import SafeIcon from '../common/SafeIcon';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import AdUnit from '../components/ads/AdUnit';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiCheck, FiClock, FiDollarSign, FiExternalLink, FiUpload, FiCopy } = FiIcons;

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, userTasks, completeTask } = useTask();
  const [task, setTask] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    const foundTask = tasks.find(t => t.id === id);
    setTask(foundTask);
    
    const userTask = userTasks.find(ut => ut.taskId === id);
    setIsCompleted(!!userTask);
  }, [id, tasks, userTasks]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await completeTask(id, data);
      toast.success('Task completed successfully!');
      setIsCompleted(true);
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      toast.error(error.message || 'Failed to complete task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const openExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiCheck} className="text-3xl text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Task Completed!
            </h1>
            <p className="text-gray-600 mb-6">
              You have successfully completed "{task.title}" and earned {task.points} points.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  const renderTaskForm = () => {
    switch (task.type) {
      case 'copy_paste':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target URL to Copy
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={task.targetUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard(task.targetUrl)}
                  className="bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  <SafeIcon icon={FiCopy} />
                </button>
                <button
                  type="button"
                  onClick={() => openExternalLink(task.targetUrl)}
                  className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <SafeIcon icon={FiExternalLink} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paste the URL here to confirm
              </label>
              <input
                {...register('submittedUrl', {
                  required: 'Please paste the URL',
                  validate: value => value === task.targetUrl || 'URL does not match'
                })}
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Paste the copied URL here"
              />
              {errors.submittedUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.submittedUrl.message}</p>
              )}
            </div>
          </div>
        );

      case 'visit_review':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visit this page and spend at least 2 minutes
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={task.targetUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() => openExternalLink(task.targetUrl)}
                  className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <SafeIcon icon={FiExternalLink} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Write a brief review (minimum 50 words)
              </label>
              <textarea
                {...register('review', {
                  required: 'Please write a review',
                  minLength: {
                    value: 50,
                    message: 'Review must be at least 50 characters'
                  }
                })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Share your thoughts about the page content..."
              />
              {errors.review && (
                <p className="mt-1 text-sm text-red-600">{errors.review.message}</p>
              )}
            </div>
          </div>
        );

      case 'social_share':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content to Share
              </label>
              <div className="p-4 bg-gray-50 rounded-md border">
                <p className="text-sm text-gray-700">
                  Check out TaskEarn - Earn money with simple tasks! Join thousands of users 
                  earning through our revenue-sharing platform. #TaskEarn #EarnMoney
                </p>
                <button
                  type="button"
                  onClick={() => copyToClipboard("Check out TaskEarn - Earn money with simple tasks! Join thousands of users earning through our revenue-sharing platform. #TaskEarn #EarnMoney")}
                  className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Copy Content
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload screenshot of your post
              </label>
              <input
                {...register('screenshot', {
                  required: 'Please upload a screenshot'
                })}
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
              {errors.screenshot && (
                <p className="mt-1 text-sm text-red-600">{errors.screenshot.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Social Media Platform
              </label>
              <select
                {...register('platform', {
                  required: 'Please select a platform'
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select platform</option>
                <option value="twitter">Twitter</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
              </select>
              {errors.platform && (
                <p className="mt-1 text-sm text-red-600">{errors.platform.message}</p>
              )}
            </div>
          </div>
        );

      default:
        return <div>Unknown task type</div>;
    }
  };

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
          <button
            onClick={() => navigate('/tasks')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <SafeIcon icon={FiArrowLeft} />
            <span>Back to Tasks</span>
          </button>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {task.title}
                </h1>
                <p className="text-gray-600 mb-4">
                  {task.description}
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-green-600">
                    <SafeIcon icon={FiDollarSign} />
                    <span className="font-medium">+{task.points} points</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <SafeIcon icon={FiClock} />
                    <span>{task.estimatedTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow">
              {/* Instructions */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Instructions
                </h2>
                <ol className="space-y-2">
                  {task.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Task Form */}
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Complete Task
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {renderTaskForm()}
                  
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-2">
                          <LoadingSpinner size="sm" />
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        'Complete Task'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Task Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Task Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium capitalize">
                    {task.type.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Points</span>
                  <span className="font-medium text-green-600">+{task.points}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Time</span>
                  <span className="font-medium">{task.estimatedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Earnings</span>
                  <span className="font-medium text-green-600">
                    ${(task.points * 0.01).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-4">
                Important Notes
              </h3>
              <ul className="space-y-2 text-sm text-yellow-700">
                <li>• Follow all instructions carefully</li>
                <li>• Provide accurate information</li>
                <li>• Tasks can only be completed once</li>
                <li>• Points are awarded after verification</li>
              </ul>
            </div>

            {/* Ad Unit */}
            <AdUnit 
              adSlot="6789012345"
              className="w-full"
              style={{ minHeight: '250px' }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import SafeIcon from '../../common/SafeIcon';
import LoadingSpinner from '../ui/LoadingSpinner';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiUser, FiMail, FiCalendar, FiDollarSign, FiTarget, FiShield, FiCheck } = FiIcons;

const UserModal = ({ user, isOpen, onClose, onRoleChange, onStatusChange }) => {
  const [selectedRole, setSelectedRole] = useState(user.role);
  const [selectedStatus, setSelectedStatus] = useState(user.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      if (selectedRole !== user.role) {
        await onRoleChange(user.id, selectedRole);
      }
      if (selectedStatus !== user.status) {
        await onStatusChange(user.id, selectedStatus);
      }
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getRoleDescription = (role) => {
    switch (role) {
      case 'admin':
        return 'Full access to all platform features including user management, task creation, and revenue analytics.';
      case 'moderator':
        return 'Can manage tasks, review user submissions, and moderate content. Limited admin access.';
      case 'user':
        return 'Standard user access to complete tasks and earn money through the platform.';
      default:
        return '';
    }
  };

  const getStatusDescription = (status) => {
    switch (status) {
      case 'active':
        return 'User can access all platform features and complete tasks normally.';
      case 'suspended':
        return 'User access is temporarily restricted due to policy violations.';
      case 'inactive':
        return 'User account is deactivated and cannot access the platform.';
      default:
        return '';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              {/* Header */}
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <SafeIcon icon={FiX} className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-4 py-4 sm:px-6">
                {/* User Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCalendar} className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-600">Member Since</p>
                        <p className="font-medium text-gray-900">
                          {format(new Date(user.joinedAt), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiDollarSign} className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-600">Total Earnings</p>
                        <p className="font-medium text-gray-900">
                          ${user.totalEarnings?.toFixed(2) || '0.00'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiTarget} className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-600">Tasks Completed</p>
                        <p className="font-medium text-gray-900">{user.tasksCompleted || 0}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiUser} className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-600">Last Login</p>
                        <p className="font-medium text-gray-900">
                          {user.lastLoginAt 
                            ? format(new Date(user.lastLoginAt), 'MMM dd, HH:mm')
                            : 'Never'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Role Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Role
                  </label>
                  <div className="space-y-2">
                    {['user', 'moderator', 'admin'].map((role) => (
                      <label key={role} className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="role"
                          value={role}
                          checked={selectedRole === role}
                          onChange={(e) => setSelectedRole(e.target.value)}
                          className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900 capitalize">{role}</span>
                            {role === 'admin' && <SafeIcon icon={FiShield} className="text-red-500" />}
                            {role === 'moderator' && <SafeIcon icon={FiShield} className="text-blue-500" />}
                          </div>
                          <p className="text-sm text-gray-600">{getRoleDescription(role)}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Status Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Status
                  </label>
                  <div className="space-y-2">
                    {['active', 'suspended', 'inactive'].map((status) => (
                      <label key={status} className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="status"
                          value={status}
                          checked={selectedStatus === status}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <div className="flex-1">
                          <span className="font-medium text-gray-900 capitalize">{status}</span>
                          <p className="text-sm text-gray-600">{getStatusDescription(status)}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSave}
                  disabled={isUpdating || (selectedRole === user.role && selectedStatus === user.status)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdating ? (
                    <div className="flex items-center space-x-2">
                      <LoadingSpinner size="sm" />
                      <span>Updating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCheck} />
                      <span>Save Changes</span>
                    </div>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UserModal;
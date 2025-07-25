import React, { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchUsers = async () => {
    if (!user || user.role !== 'admin') return;
    
    setLoading(true);
    try {
      const usersData = await userService.getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    if (!user || user.role !== 'admin') return;
    
    try {
      const stats = await userService.getUserStats();
      setUserStats(stats);
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      await userService.updateUserRole(userId, newRole);
      await fetchUsers();
      toast.success('User role updated successfully');
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
      throw error;
    }
  };

  const updateUserStatus = async (userId, status) => {
    try {
      await userService.updateUserStatus(userId, status);
      await fetchUsers();
      toast.success(`User ${status} successfully`);
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Failed to update user status');
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      await userService.deleteUser(userId);
      await fetchUsers();
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
      throw error;
    }
  };

  const searchUsers = async (searchTerm, filters = {}) => {
    try {
      const results = await userService.searchUsers(searchTerm, filters);
      return results;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchUsers();
      fetchUserStats();
    }
  }, [user]);

  const value = {
    users,
    userStats,
    loading,
    fetchUsers,
    fetchUserStats,
    updateUserRole,
    updateUserStatus,
    deleteUser,
    searchUsers
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
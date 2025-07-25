import React, { createContext, useContext, useState, useEffect } from 'react';
import { taskService } from '../services/taskService';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchTasks = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const tasksData = await taskService.getTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserTasks = async () => {
    if (!user) return;
    
    try {
      const userTasksData = await taskService.getUserTasks(user.id);
      setUserTasks(userTasksData);
    } catch (error) {
      console.error('Error fetching user tasks:', error);
    }
  };

  const completeTask = async (taskId, taskData) => {
    try {
      const result = await taskService.completeTask(taskId, user.id, taskData);
      await fetchUserTasks();
      return result;
    } catch (error) {
      console.error('Error completing task:', error);
      throw error;
    }
  };

  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      await fetchTasks();
      return newTask;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
      fetchUserTasks();
    }
  }, [user]);

  const value = {
    tasks,
    userTasks,
    loading,
    fetchTasks,
    fetchUserTasks,
    completeTask,
    createTask
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
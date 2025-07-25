import React, { createContext, useContext, useState, useEffect } from 'react';
import { revenueService } from '../services/revenueService';
import { useAuth } from './AuthContext';

const RevenueContext = createContext();

export const useRevenue = () => {
  const context = useContext(RevenueContext);
  if (!context) {
    throw new Error('useRevenue must be used within a RevenueProvider');
  }
  return context;
};

export const RevenueProvider = ({ children }) => {
  const [earnings, setEarnings] = useState(null);
  const [revenueStats, setRevenueStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchEarnings = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const earningsData = await revenueService.getUserEarnings(user.id);
      setEarnings(earningsData);
    } catch (error) {
      console.error('Error fetching earnings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRevenueStats = async () => {
    if (!user) return;
    
    try {
      const statsData = await revenueService.getRevenueStats(user.id);
      setRevenueStats(statsData);
    } catch (error) {
      console.error('Error fetching revenue stats:', error);
    }
  };

  const trackAdView = async (adUnitId, pageUrl) => {
    if (!user) return;
    
    try {
      await revenueService.trackAdView(user.id, adUnitId, pageUrl);
    } catch (error) {
      console.error('Error tracking ad view:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchEarnings();
      fetchRevenueStats();
    }
  }, [user]);

  const value = {
    earnings,
    revenueStats,
    loading,
    fetchEarnings,
    fetchRevenueStats,
    trackAdView
  };

  return (
    <RevenueContext.Provider value={value}>
      {children}
    </RevenueContext.Provider>
  );
};
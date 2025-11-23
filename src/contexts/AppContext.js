import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchDashboardData, fetchTransactions } from '../services/api';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'User',
    phone: '+91-XXXXXXXXXX',
    language: 'en',
    joined: '2024-01-15'
  });

  const [dashboardData, setDashboardData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [dashData, transData] = await Promise.all([
        fetchDashboardData(),
        fetchTransactions()
      ]);
      setDashboardData(dashData);
      setTransactions(transData);
      setError(null);
    } catch (err) {
      setError('Failed to load data');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await loadInitialData();
  };

  const value = {
    user,
    setUser,
    dashboardData,
    transactions,
    loading,
    error,
    refreshData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

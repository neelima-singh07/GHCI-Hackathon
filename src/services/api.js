import axios from 'axios';

// Configure your backend API URL here
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Dashboard API
export const fetchDashboardData = async () => {
  try {
    const response = await api.get('/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    // Return mock data for development
    return getMockDashboardData();
  }
};

// Transactions API
export const fetchTransactions = async (filters = {}) => {
  try {
    const response = await api.get('/transactions', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return getMockTransactions();
  }
};

export const createTransaction = async (transactionData) => {
  try {
    const response = await api.post('/transactions', transactionData);
    return response.data;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

export const updateTransaction = async (id, transactionData) => {
  try {
    const response = await api.put(`/transactions/${id}`, transactionData);
    return response.data;
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

export const deleteTransaction = async (id) => {
  try {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};

// Analytics API
export const fetchAnalytics = async (timeRange = 'month') => {
  try {
    const response = await api.get('/analytics', { params: { timeRange } });
    return response.data;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return getMockAnalytics();
  }
};

export const fetchAnomalies = async () => {
  try {
    const response = await api.get('/analytics/anomalies');
    return response.data;
  } catch (error) {
    console.error('Error fetching anomalies:', error);
    return [];
  }
};

// User Profile API
export const fetchUserProfile = async () => {
  try {
    const response = await api.get('/user/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.put('/user/profile', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// WhatsApp Integration API
export const getWhatsAppStatus = async () => {
  try {
    const response = await api.get('/whatsapp/status');
    return response.data;
  } catch (error) {
    console.error('Error fetching WhatsApp status:', error);
    return { connected: false };
  }
};

export const disconnectWhatsApp = async () => {
  try {
    const response = await api.post('/whatsapp/disconnect');
    return response.data;
  } catch (error) {
    console.error('Error disconnecting WhatsApp:', error);
    throw error;
  }
};

// Mock Data Functions (for development without backend)
const getMockDashboardData = () => ({
  stats: {
    monthlySpending: 12450,
    previousMonth: 15200,
    transactionCount: 47,
    averageTransaction: 265,
    savingsRate: 18
  },
  healthScore: 75,
  streak: 12,
  badges: [
    { id: 'first-week', name: 'First Week', description: 'Tracked for 7 days', earned: true },
    { id: 'spending-master', name: 'Spending Master', description: '50+ transactions', earned: true },
    { id: 'streak-champion', name: 'Streak Champion', description: '10 day streak', earned: true }
  ],
  spendingTrend: [
    { date: '2024-01-01', amount: 1200 },
    { date: '2024-01-05', amount: 1800 },
    { date: '2024-01-10', amount: 1500 },
    { date: '2024-01-15', amount: 2200 },
    { date: '2024-01-20', amount: 1900 },
    { date: '2024-01-25', amount: 2400 },
    { date: '2024-01-30', amount: 2100 }
  ],
  categoryBreakdown: [
    { category: 'Food & Dining', amount: 4200, color: '#ef4444' },
    { category: 'Transportation', amount: 2800, color: '#f59e0b' },
    { category: 'Shopping', amount: 3100, color: '#8b5cf6' },
    { category: 'Entertainment', amount: 1500, color: '#06b6d4' },
    { category: 'Bills & Utilities', amount: 2200, color: '#10b981' },
    { category: 'Others', amount: 1650, color: '#6b7280' }
  ],
  recentTransactions: []
});

const getMockTransactions = () => [];

const getMockAnalytics = () => ({
  categoryComparison: [],
  weeklyBreakdown: [],
  topMerchants: [],
  anomalies: []
});

export default api;

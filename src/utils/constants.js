export const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Groceries',
  'Health & Fitness',
  'Education',
  'Travel',
  'Others'
];

export const INPUT_TYPES = {
  TEXT: 'text',
  AUDIO: 'audio',
  IMAGE: 'image'
};

export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed'
};

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'hinglish', name: 'Hinglish' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'mr', name: 'Marathi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'kn', name: 'Kannada' },
  { code: 'ml', name: 'Malayalam' }
];

export const TIME_RANGES = [
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'quarter', label: 'This Quarter' },
  { value: 'year', label: 'This Year' },
  { value: 'custom', label: 'Custom Range' }
];

export const HEALTH_SCORE_LEVELS = {
  EXCELLENT: { min: 80, max: 100, label: 'Excellent', color: 'success' },
  GOOD: { min: 60, max: 79, label: 'Good', color: 'warning' },
  FAIR: { min: 40, max: 59, label: 'Fair', color: 'warning' },
  POOR: { min: 0, max: 39, label: 'Needs Attention', color: 'danger' }
};

export const ANOMALY_TYPES = {
  SPENDING_SPIKE: 'spending-spike',
  DUPLICATE: 'duplicate',
  UNUSUAL_MERCHANT: 'unusual-merchant',
  BUDGET_WARNING: 'budget-warning',
  FREQUENCY_CHANGE: 'frequency-change'
};

export const SEVERITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

export const BADGE_TYPES = [
  {
    id: 'first-week',
    name: 'First Week',
    description: 'Tracked expenses for 7 days',
    icon: 'Star'
  },
  {
    id: 'spending-master',
    name: 'Spending Master',
    description: 'Logged 50+ transactions',
    icon: 'Trophy'
  },
  {
    id: 'streak-champion',
    name: 'Streak Champion',
    description: 'Maintained 30 day streak',
    icon: 'Flame'
  },
  {
    id: 'budget-keeper',
    name: 'Budget Keeper',
    description: 'Stayed under budget for 3 months',
    icon: 'Target'
  },
  {
    id: 'financial-guru',
    name: 'Financial Guru',
    description: 'Achieved health score 90+',
    icon: 'Crown'
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'First transaction logged in morning',
    icon: 'Sunrise'
  },
  {
    id: 'savvy-saver',
    name: 'Savvy Saver',
    description: 'Saved 20% of income',
    icon: 'PiggyBank'
  }
];

export const CHART_COLORS = [
  '#ef4444', // red
  '#f59e0b', // orange
  '#8b5cf6', // purple
  '#06b6d4', // cyan
  '#10b981', // green
  '#84cc16', // lime
  '#f97316', // orange-500
  '#ec4899', // pink
  '#6366f1', // indigo
  '#14b8a6'  // teal
];

export const API_ENDPOINTS = {
  DASHBOARD: '/dashboard',
  TRANSACTIONS: '/transactions',
  ANALYTICS: '/analytics',
  USER: '/user',
  WHATSAPP: '/whatsapp',
  NOTIFICATIONS: '/notifications'
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  PREFERENCES: 'userPreferences',
  THEME: 'theme'
};

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 20,
  sortBy: 'date',
  sortOrder: 'desc'
};

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

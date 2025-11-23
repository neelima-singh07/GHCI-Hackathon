/**
 * Format currency in Indian Rupees
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'relative')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'short') => {
  const dateObj = new Date(date);
  
  if (format === 'relative') {
    return getRelativeTime(dateObj);
  }
  
  if (format === 'long') {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Get relative time string (e.g., "2 hours ago")
 * @param {Date} date - Date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)} week${Math.floor(diffDay / 7) > 1 ? 's' : ''} ago`;
  if (diffDay < 365) return `${Math.floor(diffDay / 30)} month${Math.floor(diffDay / 30) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDay / 365)} year${Math.floor(diffDay / 365) > 1 ? 's' : ''} ago`;
};

/**
 * Get category color classes
 * @param {string} category - Category name
 * @returns {string} Tailwind color classes
 */
export const getCategoryColor = (category) => {
  const colorMap = {
    'Food & Dining': 'bg-red-100 text-red-600',
    'Transportation': 'bg-orange-100 text-orange-600',
    'Shopping': 'bg-purple-100 text-purple-600',
    'Entertainment': 'bg-cyan-100 text-cyan-600',
    'Bills & Utilities': 'bg-green-100 text-green-600',
    'Groceries': 'bg-lime-100 text-lime-600',
    'Health & Fitness': 'bg-emerald-100 text-emerald-600',
    'Others': 'bg-gray-100 text-gray-600'
  };
  
  return colorMap[category] || 'bg-gray-100 text-gray-600';
};

/**
 * Calculate percentage change
 * @param {number} current - Current value
 * @param {number} previous - Previous value
 * @returns {number} Percentage change
 */
export const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Group array by key
 * @param {Array} array - Array to group
 * @param {string} key - Key to group by
 * @returns {Object} Grouped object
 */
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
};

/**
 * Sort array by key
 * @param {Array} array - Array to sort
 * @param {string} key - Key to sort by
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted array
 */
export const sortBy = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (order === 'asc') {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Indian format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Is valid phone
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Generate random ID
 * @returns {string} Random ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} Is empty
 */
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

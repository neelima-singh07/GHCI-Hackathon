import React, { useState } from 'react';
import { Bell, Search, User, RefreshCw } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import toast from 'react-hot-toast';

const Header = () => {
  const { refreshData, user } = useApp();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshData();
      toast.success('Data refreshed successfully!');
    } catch (error) {
      toast.error('Failed to refresh data');
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <header className="fixed top-0 right-0 left-64 bg-white border-b border-gray-200 z-10">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search transactions, merchants..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 ml-6">
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh data"
          >
            <RefreshCw className={`w-5 h-5 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">Connected to WhatsApp</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

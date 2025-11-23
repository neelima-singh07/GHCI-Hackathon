import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Flame, 
  Target,
  ArrowUpRight,
  Calendar
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import SpendingChart from '../components/dashboard/SpendingChart';
import CategoryPieChart from '../components/dashboard/CategoryPieChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import HealthScoreCard from '../components/dashboard/HealthScoreCard';
import StreakCard from '../components/dashboard/StreakCard';
import BadgesCard from '../components/dashboard/BadgesCard';

const Dashboard = () => {
  const { dashboardData, loading } = useApp();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const stats = dashboardData?.stats || {
    monthlySpending: 12450,
    previousMonth: 15200,
    transactionCount: 47,
    averageTransaction: 265,
    savingsRate: 18
  };

  const percentageChange = ((stats.monthlySpending - stats.previousMonth) / stats.previousMonth * 100).toFixed(1);
  const isPositive = percentageChange < 0; // Negative spending change is positive

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your spending and financial health</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Current Month: {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Monthly Spending */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Monthly Spending</p>
              <p className="text-2xl font-bold text-gray-900">₹{stats.monthlySpending.toLocaleString()}</p>
            </div>
            <div className={`p-3 rounded-lg ${isPositive ? 'bg-success-100' : 'bg-danger-100'}`}>
              {isPositive ? (
                <TrendingDown className="w-6 h-6 text-success-600" />
              ) : (
                <TrendingUp className="w-6 h-6 text-danger-600" />
              )}
            </div>
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <span className={`text-sm font-medium ${isPositive ? 'text-success-600' : 'text-danger-600'}`}>
              {Math.abs(percentageChange)}%
            </span>
            <span className="text-sm text-gray-600">vs last month</span>
          </div>
        </div>

        {/* Total Transactions */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{stats.transactionCount}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <ArrowUpRight className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-sm text-gray-600">This month</span>
          </div>
        </div>

        {/* Average Transaction */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg. Transaction</p>
              <p className="text-2xl font-bold text-gray-900">₹{stats.averageTransaction}</p>
            </div>
            <div className="p-3 bg-warning-100 rounded-lg">
              <Target className="w-6 h-6 text-warning-600" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-sm text-gray-600">Per transaction</span>
          </div>
        </div>

        {/* Savings Rate */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Savings Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats.savingsRate}%</p>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <Award className="w-6 h-6 text-success-600" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-sm text-gray-600">Of total income</span>
          </div>
        </div>
      </div>

      {/* Health Score, Streak, and Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <HealthScoreCard score={dashboardData?.healthScore || 75} />
        <StreakCard streak={dashboardData?.streak || 12} />
        <BadgesCard badges={dashboardData?.badges || []} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingChart data={dashboardData?.spendingTrend || []} />
        <CategoryPieChart data={dashboardData?.categoryBreakdown || []} />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions transactions={dashboardData?.recentTransactions || []} />
    </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  PieChart,
  BarChart3,
  Target
} from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Mock anomalies data
  const anomalies = [
    {
      id: 1,
      type: 'spending-spike',
      title: 'Unusual Spending Detected',
      description: 'Your shopping expenses increased by 150% this week',
      severity: 'high',
      date: '2024-01-18',
      amount: 5600
    },
    {
      id: 2,
      type: 'duplicate',
      title: 'Potential Duplicate Transaction',
      description: 'Similar transaction detected: Swiggy ₹450',
      severity: 'medium',
      date: '2024-01-20',
      amount: 450
    },
    {
      id: 3,
      type: 'budget-warning',
      title: 'Budget Limit Approaching',
      description: 'You\'ve used 85% of your food budget this month',
      severity: 'medium',
      date: '2024-01-19',
      amount: 4250
    }
  ];

  // Category spending data
  const categoryData = {
    labels: ['Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 'Bills', 'Others'],
    datasets: [
      {
        label: 'This Month',
        data: [4200, 2800, 3100, 1500, 2200, 1650],
        backgroundColor: 'rgba(14, 165, 233, 0.8)',
      },
      {
        label: 'Last Month',
        data: [3800, 2500, 4100, 1800, 2100, 1400],
        backgroundColor: 'rgba(156, 163, 175, 0.5)',
      }
    ]
  };

  const categoryOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ₹${context.parsed.y.toLocaleString()}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹${value}`
        }
      }
    }
  };

  // Spending by time
  const timeData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Weekly Spending',
        data: [3200, 4100, 3800, 4350],
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
      }
    ]
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-danger-50 border-danger-200 text-danger-700';
      case 'medium':
        return 'bg-warning-50 border-warning-200 text-warning-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getSeverityIcon = (severity) => {
    const baseClass = "w-5 h-5";
    switch (severity) {
      case 'high':
        return <AlertTriangle className={`${baseClass} text-danger-600`} />;
      case 'medium':
        return <AlertTriangle className={`${baseClass} text-warning-600`} />;
      default:
        return <AlertTriangle className={`${baseClass} text-gray-600`} />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">AI-powered insights into your spending patterns</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field text-sm"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-blue-50 to-primary-50 border border-primary-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-primary-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Spending Trend</p>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">+8.5%</p>
          <p className="text-sm text-gray-600">Compared to last month</p>
        </div>

        <div className="card bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <PieChart className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Top Category</p>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">Food & Dining</p>
          <p className="text-sm text-gray-600">27% of total spending</p>
        </div>

        <div className="card bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Target className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Budget Status</p>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">72%</p>
          <p className="text-sm text-gray-600">Used of monthly budget</p>
        </div>
      </div>

      {/* Anomaly Alerts */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Anomaly Detection</h3>
            <p className="text-sm text-gray-600">AI-detected unusual patterns in your spending</p>
          </div>
          <AlertTriangle className="w-6 h-6 text-warning-600" />
        </div>

        <div className="space-y-3">
          {anomalies.map((anomaly) => (
            <div
              key={anomaly.id}
              className={`p-4 rounded-lg border-2 ${getSeverityColor(anomaly.severity)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="mt-1">
                    {getSeverityIcon(anomaly.severity)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{anomaly.title}</h4>
                    <p className="text-sm mb-2">{anomaly.description}</p>
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(anomaly.date).toLocaleDateString()}</span>
                      </div>
                      <span className="font-semibold">₹{anomaly.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <button className="btn-secondary text-xs ml-4">
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Comparison */}
        <div className="card">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Category Comparison</h3>
            <p className="text-sm text-gray-600">This month vs last month</p>
          </div>
          <div className="h-80">
            <Bar data={categoryData} options={categoryOptions} />
          </div>
        </div>

        {/* Weekly Breakdown */}
        <div className="card">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Weekly Breakdown</h3>
            <p className="text-sm text-gray-600">Spending by week</p>
          </div>
          <div className="h-80">
            <Bar data={timeData} options={categoryOptions} />
          </div>
        </div>
      </div>

      {/* Merchant Analysis */}
      <div className="card">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Top Merchants</h3>
          <p className="text-sm text-gray-600">Your most frequent spending destinations</p>
        </div>
        <div className="space-y-3">
          {[
            { name: 'Swiggy', amount: 2400, transactions: 12, category: 'Food & Dining' },
            { name: 'Amazon', amount: 3100, transactions: 8, category: 'Shopping' },
            { name: 'Uber', amount: 2100, transactions: 15, category: 'Transportation' },
            { name: 'BookMyShow', amount: 850, transactions: 3, category: 'Entertainment' },
            { name: 'Big Bazaar', amount: 1650, transactions: 5, category: 'Groceries' }
          ].map((merchant, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                  <span className="font-semibold text-lg">{merchant.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{merchant.name}</p>
                  <p className="text-sm text-gray-600">{merchant.transactions} transactions</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">₹{merchant.amount.toLocaleString()}</p>
                <p className="text-xs text-gray-600">{merchant.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;

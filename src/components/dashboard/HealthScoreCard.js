import React from 'react';
import { Activity, TrendingUp } from 'lucide-react';

const HealthScoreCard = ({ score }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success-600';
    if (score >= 60) return 'text-warning-600';
    return 'text-danger-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'from-success-500 to-success-600';
    if (score >= 60) return 'from-warning-500 to-warning-600';
    return 'from-danger-500 to-danger-600';
  };

  const getScoreText = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Attention';
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Financial Health</h3>
          <p className="text-sm text-gray-600">AI-powered assessment</p>
        </div>
        <Activity className="w-6 h-6 text-gray-400" />
      </div>
      
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(score / 100) * 352} 352`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444'} />
                <stop offset="100%" stopColor={score >= 80 ? '#059669' : score >= 60 ? '#d97706' : '#dc2626'} />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</p>
              <p className="text-xs text-gray-500">/ 100</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className={`text-lg font-semibold ${getScoreColor(score)}`}>{getScoreText(score)}</p>
        <p className="text-sm text-gray-600 mt-1">Keep tracking to improve</p>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">This Month</span>
          <div className="flex items-center space-x-1 text-success-600">
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">+5 points</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthScoreCard;

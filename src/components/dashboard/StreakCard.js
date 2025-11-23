import React from 'react';
import { Flame, Calendar } from 'lucide-react';

const StreakCard = ({ streak }) => {
  const milestones = [7, 15, 30, 60, 100];
  const nextMilestone = milestones.find(m => m > streak) || 100;
  const progress = (streak / nextMilestone) * 100;

  return (
    <div className="card bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Current Streak</h3>
          <p className="text-sm text-gray-600">Keep it going!</p>
        </div>
        <div className="p-3 bg-orange-100 rounded-lg">
          <Flame className="w-6 h-6 text-orange-600" />
        </div>
      </div>

      <div className="flex items-baseline space-x-2 mb-4">
        <span className="text-5xl font-bold text-orange-600">{streak}</span>
        <span className="text-xl text-gray-600">days</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Progress to {nextMilestone} days</span>
          <span className="font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-orange-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Started tracking on</span>
          </div>
          <span className="font-medium text-gray-900">
            {new Date(Date.now() - streak * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StreakCard;

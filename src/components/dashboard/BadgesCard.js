import React from 'react';
import { Award, Star, Trophy, Target, Zap, Crown } from 'lucide-react';

const BadgesCard = ({ badges }) => {
  const badgeIcons = {
    'first-week': { icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    'spending-master': { icon: Trophy, color: 'text-purple-600', bg: 'bg-purple-100' },
    'streak-champion': { icon: Zap, color: 'text-orange-600', bg: 'bg-orange-100' },
    'budget-keeper': { icon: Target, color: 'text-green-600', bg: 'bg-green-100' },
    'financial-guru': { icon: Crown, color: 'text-blue-600', bg: 'bg-blue-100' }
  };

  const defaultBadges = badges.length > 0 ? badges : [
    { id: 'first-week', name: 'First Week', description: 'Tracked for 7 days', earned: true },
    { id: 'spending-master', name: 'Spending Master', description: '50+ transactions', earned: true },
    { id: 'streak-champion', name: 'Streak Champion', description: '10 day streak', earned: true },
    { id: 'budget-keeper', name: 'Budget Keeper', description: 'Stayed under budget', earned: false },
    { id: 'financial-guru', name: 'Financial Guru', description: 'Health score 90+', earned: false }
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
          <p className="text-sm text-gray-600">
            {defaultBadges.filter(b => b.earned).length} / {defaultBadges.length} unlocked
          </p>
        </div>
        <Award className="w-6 h-6 text-gray-400" />
      </div>

      <div className="space-y-3">
        {defaultBadges.slice(0, 3).map((badge) => {
          const BadgeIcon = badgeIcons[badge.id]?.icon || Star;
          const iconColor = badgeIcons[badge.id]?.color || 'text-gray-600';
          const iconBg = badgeIcons[badge.id]?.bg || 'bg-gray-100';

          return (
            <div
              key={badge.id}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                badge.earned
                  ? 'bg-gradient-to-r from-primary-50 to-purple-50 border border-primary-100'
                  : 'bg-gray-50 opacity-50'
              }`}
            >
              <div className={`p-2 ${iconBg} rounded-lg ${!badge.earned && 'grayscale'}`}>
                <BadgeIcon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${badge.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                  {badge.name}
                </p>
                <p className="text-xs text-gray-600">{badge.description}</p>
              </div>
              {badge.earned && (
                <div className="text-primary-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button className="mt-4 w-full btn-secondary text-sm">
        View All Achievements
      </button>
    </div>
  );
};

export default BadgesCard;

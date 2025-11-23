import React from 'react';
import { ArrowRight, MessageSquare, Mic, Image } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecentTransactions = ({ transactions }) => {
  const mockTransactions = transactions.length > 0 ? transactions : [
    {
      id: 1,
      amount: 450,
      merchant: 'Swiggy',
      category: 'Food & Dining',
      time: '2 hours ago',
      inputType: 'text',
      categoryColor: 'bg-red-100 text-red-600'
    },
    {
      id: 2,
      amount: 1200,
      merchant: 'Uber',
      category: 'Transportation',
      time: '5 hours ago',
      inputType: 'audio',
      categoryColor: 'bg-orange-100 text-orange-600'
    },
    {
      id: 3,
      amount: 2500,
      merchant: 'Amazon',
      category: 'Shopping',
      time: 'Yesterday',
      inputType: 'image',
      categoryColor: 'bg-purple-100 text-purple-600'
    },
    {
      id: 4,
      amount: 180,
      merchant: 'Cafe Coffee Day',
      category: 'Food & Dining',
      time: 'Yesterday',
      inputType: 'text',
      categoryColor: 'bg-red-100 text-red-600'
    },
    {
      id: 5,
      amount: 3200,
      merchant: 'Electricity Bill',
      category: 'Bills & Utilities',
      time: '2 days ago',
      inputType: 'image',
      categoryColor: 'bg-green-100 text-green-600'
    }
  ];

  const getInputIcon = (type) => {
    switch (type) {
      case 'audio':
        return <Mic className="w-4 h-4" />;
      case 'image':
        return <Image className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <p className="text-sm text-gray-600">Latest activity from WhatsApp</p>
        </div>
        <Link
          to="/transactions"
          className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {mockTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                <span className="text-lg">{transaction.merchant.charAt(0)}</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-semibold text-gray-900">{transaction.merchant}</p>
                  <div className="text-gray-400" title={`Input type: ${transaction.inputType}`}>
                    {getInputIcon(transaction.inputType)}
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`badge ${transaction.categoryColor} text-xs`}>
                    {transaction.category}
                  </span>
                  <span className="text-xs text-gray-500">{transaction.time}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">₹{transaction.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;

import React, { useState } from 'react';
import { Search, Filter, Download, MessageSquare, Mic, Image, ChevronDown } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Transactions = () => {
  const { transactions, loading } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedInputType, setSelectedInputType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const mockTransactions = transactions.length > 0 ? transactions : [
    {
      id: 1,
      amount: 450,
      merchant: 'Swiggy',
      category: 'Food & Dining',
      date: '2024-01-20T14:30:00',
      inputType: 'text',
      description: 'Lunch order',
      categoryColor: 'bg-red-100 text-red-600'
    },
    {
      id: 2,
      amount: 1200,
      merchant: 'Uber',
      category: 'Transportation',
      date: '2024-01-20T09:15:00',
      inputType: 'audio',
      description: 'Cab to office',
      categoryColor: 'bg-orange-100 text-orange-600'
    },
    {
      id: 3,
      amount: 2500,
      merchant: 'Amazon',
      category: 'Shopping',
      date: '2024-01-19T18:45:00',
      inputType: 'image',
      description: 'Electronics purchase',
      categoryColor: 'bg-purple-100 text-purple-600'
    },
    {
      id: 4,
      amount: 180,
      merchant: 'Cafe Coffee Day',
      category: 'Food & Dining',
      date: '2024-01-19T16:20:00',
      inputType: 'text',
      description: 'Evening coffee',
      categoryColor: 'bg-red-100 text-red-600'
    },
    {
      id: 5,
      amount: 3200,
      merchant: 'Electricity Bill',
      category: 'Bills & Utilities',
      date: '2024-01-18T10:00:00',
      inputType: 'image',
      description: 'Monthly electricity bill',
      categoryColor: 'bg-green-100 text-green-600'
    },
    {
      id: 6,
      amount: 850,
      merchant: 'BookMyShow',
      category: 'Entertainment',
      date: '2024-01-17T20:30:00',
      inputType: 'text',
      description: 'Movie tickets',
      categoryColor: 'bg-cyan-100 text-cyan-600'
    },
    {
      id: 7,
      amount: 650,
      merchant: 'Big Bazaar',
      category: 'Groceries',
      date: '2024-01-17T11:00:00',
      inputType: 'image',
      description: 'Weekly groceries',
      categoryColor: 'bg-lime-100 text-lime-600'
    },
    {
      id: 8,
      amount: 1500,
      merchant: 'Gym Membership',
      category: 'Health & Fitness',
      date: '2024-01-16T08:00:00',
      inputType: 'text',
      description: 'Monthly gym fee',
      categoryColor: 'bg-emerald-100 text-emerald-600'
    }
  ];

  const categories = ['all', 'Food & Dining', 'Transportation', 'Shopping', 'Bills & Utilities', 'Entertainment', 'Groceries', 'Health & Fitness'];
  const inputTypes = ['all', 'text', 'audio', 'image'];

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

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory;
    const matchesInputType = selectedInputType === 'all' || transaction.inputType === selectedInputType;
    return matchesSearch && matchesCategory && matchesInputType;
  });

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-1">All your financial activities tracked via WhatsApp</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Export</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-900">{filteredTransactions.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Total Amount</p>
          <p className="text-2xl font-bold text-gray-900">₹{totalAmount.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Average Transaction</p>
          <p className="text-2xl font-bold text-gray-900">
            ₹{filteredTransactions.length > 0 ? Math.round(totalAmount / filteredTransactions.length) : 0}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by merchant or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center space-x-2"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Input Type</label>
              <select
                value={selectedInputType}
                onChange={(e) => setSelectedInputType(e.target.value)}
                className="input-field"
              >
                {inputTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Input Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Transactions List */}
      <div className="card">
        <div className="space-y-3">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                    <span className="text-xl font-semibold">{transaction.merchant.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-semibold text-gray-900">{transaction.merchant}</p>
                      <div className="text-gray-400" title={`Via ${transaction.inputType}`}>
                        {getInputIcon(transaction.inputType)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{transaction.description}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`badge ${transaction.categoryColor} text-xs`}>
                        {transaction.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(transaction.date).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">₹{transaction.amount}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No transactions found matching your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;

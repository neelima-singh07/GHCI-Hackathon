import React, { useState } from 'react';
import {
  MessageSquare,
  Mic,
  Image,
  Check,
  X,
  Smartphone,
  QrCode,
  RefreshCw,
  Send,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Edit2,
  Trash2,
  Calendar,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';

const WhatsApp = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('+91-XXXXXXXXXX');
  const [showQR, setShowQR] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Mock WhatsApp message history
  const messageHistory = [
    {
      id: 1,
      type: 'text',
      input: 'Spent 550 on Zomato',
      timestamp: '2024-01-20T14:30:00',
      processed: true,
      transaction: {
        amount: 550,
        merchant: 'Zomato',
        category: 'Food & Dining',
        confidence: 'high'
      },
      response: {
        message: 'Added ₹550 Zomato order 🍔\nScore impact: Medium\nGreat job tracking your spending consistently!',
        scoreImpact: 'medium',
        buttons: ['✅ Correct', '✏️ Edit', '❌ Delete']
      },
      status: 'confirmed'
    },
    {
      id: 2,
      type: 'audio',
      input: '🎤 Voice message (12s)',
      transcription: 'I paid twelve hundred rupees for Uber cab',
      timestamp: '2024-01-20T09:15:00',
      processed: true,
      transaction: {
        amount: 1200,
        merchant: 'Uber',
        category: 'Transportation',
        confidence: 'high'
      },
      response: {
        message: 'Got it! ₹1,200 for Uber ride 🚗\nScore impact: Low\nYou\'re doing great! Keep it up! 💪',
        scoreImpact: 'low',
        buttons: ['✅ Correct', '✏️ Edit', '❌ Delete']
      },
      status: 'confirmed'
    },
    {
      id: 3,
      type: 'image',
      input: '📸 Receipt image',
      timestamp: '2024-01-19T18:45:00',
      processed: true,
      ocrData: {
        merchant: 'Amazon',
        amount: 2500,
        date: '19/01/2024',
        items: ['Electronics']
      },
      transaction: {
        amount: 2500,
        merchant: 'Amazon',
        category: 'Shopping',
        confidence: 'medium'
      },
      response: {
        message: 'Added ₹2,500 Amazon purchase 📦\nScore impact: High\nConsider reviewing your shopping budget 💡',
        scoreImpact: 'high',
        buttons: ['✅ Correct', '✏️ Edit', '❌ Delete']
      },
      status: 'confirmed'
    },
    {
      id: 4,
      type: 'text',
      input: 'Electricity bill 3200',
      timestamp: '2024-01-18T10:00:00',
      processed: true,
      transaction: {
        amount: 3200,
        merchant: 'Electricity Bill',
        category: 'Bills & Utilities',
        confidence: 'high'
      },
      response: {
        message: 'Logged ₹3,200 electricity bill ⚡\nScore impact: Medium\nRegular bill payment - well done! ✨',
        scoreImpact: 'medium',
        buttons: ['✅ Correct', '✏️ Edit', '❌ Delete']
      },
      status: 'confirmed'
    },
    {
      id: 5,
      type: 'audio',
      input: '🎤 Voice message (8s)',
      transcription: 'Coffee at CCD one hundred eighty',
      timestamp: '2024-01-19T16:20:00',
      processed: true,
      transaction: {
        amount: 180,
        merchant: 'Cafe Coffee Day',
        category: 'Food & Dining',
        confidence: 'high'
      },
      response: {
        message: 'Added ₹180 CCD coffee ☕\nScore impact: Low\nSmall treats are okay! Enjoy! 😊',
        scoreImpact: 'low',
        buttons: ['✅ Correct', '✏️ Edit', '❌ Delete']
      },
      status: 'confirmed'
    },
    {
      id: 6,
      type: 'image',
      input: '📸 Bill screenshot',
      timestamp: '2024-01-17T20:30:00',
      processed: true,
      ocrData: {
        merchant: 'BookMyShow',
        amount: 850,
        date: '17/01/2024',
        items: ['Movie tickets x2']
      },
      transaction: {
        amount: 850,
        merchant: 'BookMyShow',
        category: 'Entertainment',
        confidence: 'high'
      },
      response: {
        message: 'Added ₹850 movie tickets 🎬\nScore impact: Medium\nEntertainment budget looking good! 🍿',
        scoreImpact: 'medium',
        buttons: ['✅ Correct', '✏️ Edit', '❌ Delete']
      },
      status: 'confirmed'
    }
  ];

  const getInputIcon = (type) => {
    switch (type) {
      case 'audio':
        return <Mic className="w-5 h-5" />;
      case 'image':
        return <Image className="w-5 h-5" />;
      default:
        return <MessageSquare className="w-5 h-5" />;
    }
  };

  const getInputColor = (type) => {
    switch (type) {
      case 'audio':
        return 'bg-purple-100 text-purple-600';
      case 'image':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  };

  const getScoreImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'text-danger-600';
      case 'medium':
        return 'text-warning-600';
      case 'low':
        return 'text-success-600';
      default:
        return 'text-gray-600';
    }
  };

  const getConfidenceColor = (confidence) => {
    switch (confidence) {
      case 'high':
        return 'bg-success-100 text-success-700';
      case 'medium':
        return 'bg-warning-100 text-warning-700';
      case 'low':
        return 'bg-danger-100 text-danger-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleConnect = () => {
    setShowQR(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast.success('WhatsApp disconnected successfully');
  };

  const handleAction = (messageId, action) => {
    toast.success(`${action} action performed on transaction`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">WhatsApp Integration</h1>
        <p className="text-gray-600 mt-1">Manage your WhatsApp connection and message history</p>
      </div>

      {/* Connection Status Card */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Connection Status</h3>
            <p className="text-sm text-gray-600">WhatsApp Business API Integration</p>
          </div>
          <Smartphone className="w-8 h-8 text-gray-400" />
        </div>

        {isConnected ? (
          <div className="bg-success-50 border-2 border-success-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-lg font-bold text-success-900">Connected</p>
                    <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></span>
                  </div>
                  <p className="text-sm text-success-700">{phoneNumber}</p>
                  <p className="text-xs text-success-600 mt-1">All systems active • Real-time sync enabled</p>
                </div>
              </div>
              <button onClick={handleDisconnect} className="btn-secondary text-sm">
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">Not Connected</p>
                  <p className="text-sm text-gray-600">Connect your WhatsApp to start tracking</p>
                </div>
              </div>
              <button onClick={handleConnect} className="btn-primary">
                Connect WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <div className="text-center">
            <QrCode className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Scan QR Code</h3>
            <p className="text-gray-600 mb-4">Open WhatsApp on your phone and scan this code</p>
            <div className="w-64 h-64 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center border-4 border-green-200">
              <div className="text-center text-gray-500">
                <QrCode className="w-32 h-32 mx-auto mb-2" />
                <p className="text-sm">QR Code will appear here</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <button onClick={() => setShowQR(false)} className="btn-secondary">
                Cancel
              </button>
              <button 
                onClick={() => {
                  setIsConnected(true);
                  setShowQR(false);
                  toast.success('WhatsApp connected successfully!');
                }}
                className="btn-primary"
              >
                <Check className="w-5 h-5 mr-2" />
                Connected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      {isConnected && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card bg-gradient-to-br from-blue-50 to-primary-50">
            <div className="flex items-center space-x-3 mb-2">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              <p className="text-sm font-medium text-gray-700">Text Messages</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {messageHistory.filter(m => m.type === 'text').length}
            </p>
          </div>

          <div className="card bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="flex items-center space-x-3 mb-2">
              <Mic className="w-6 h-6 text-purple-600" />
              <p className="text-sm font-medium text-gray-700">Voice Messages</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {messageHistory.filter(m => m.type === 'audio').length}
            </p>
          </div>

          <div className="card bg-gradient-to-br from-orange-50 to-yellow-50">
            <div className="flex items-center space-x-3 mb-2">
              <Image className="w-6 h-6 text-orange-600" />
              <p className="text-sm font-medium text-gray-700">Images/Receipts</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {messageHistory.filter(m => m.type === 'image').length}
            </p>
          </div>

          <div className="card bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="flex items-center space-x-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <p className="text-sm font-medium text-gray-700">Processed</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {messageHistory.filter(m => m.processed).length}
            </p>
          </div>
        </div>
      )}

      {/* Message History */}
      {isConnected && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Message History</h3>
              <p className="text-sm text-gray-600">All transactions received via WhatsApp</p>
            </div>
            <button className="btn-secondary flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>

          <div className="space-y-4">
            {messageHistory.map((message) => (
              <div
                key={message.id}
                className="border-2 border-gray-200 rounded-lg p-5 hover:border-primary-300 transition-all"
              >
                {/* Message Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-3 rounded-lg ${getInputColor(message.type)}`}>
                      {getInputIcon(message.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`badge ${getInputColor(message.type)}`}>
                          {message.type.toUpperCase()}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getConfidenceColor(message.transaction.confidence)}`}>
                          {message.transaction.confidence} confidence
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 mb-1">{message.input}</p>
                      {message.transcription && (
                        <p className="text-xs text-gray-600 italic">"{message.transcription}"</p>
                      )}
                      {message.ocrData && (
                        <div className="text-xs text-gray-600 mt-1">
                          <p>Extracted: {message.ocrData.merchant} • ₹{message.ocrData.amount}</p>
                        </div>
                      )}
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(message.timestamp).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {message.processed && (
                    <CheckCircle className="w-6 h-6 text-success-600" />
                  )}
                </div>

                {/* Transaction Details */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-xs font-medium text-gray-600 mb-2">EXTRACTED TRANSACTION</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <p className="text-xs text-gray-600">Amount</p>
                      <p className="text-lg font-bold text-gray-900">₹{message.transaction.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Merchant</p>
                      <p className="text-sm font-semibold text-gray-900">{message.transaction.merchant}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Category</p>
                      <p className="text-sm font-semibold text-gray-900">{message.transaction.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Score Impact</p>
                      <p className={`text-sm font-semibold capitalize ${getScoreImpactColor(message.response.scoreImpact)}`}>
                        {message.response.scoreImpact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI Response */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4 mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-green-900 mb-1">FIBA RESPONSE</p>
                      <p className="text-sm text-gray-900 whitespace-pre-line">{message.response.message}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleAction(message.id, 'Confirm')}
                    className="flex items-center space-x-2 px-4 py-2 bg-success-100 text-success-700 rounded-lg hover:bg-success-200 transition-colors text-sm font-medium"
                  >
                    <Check className="w-4 h-4" />
                    <span>Correct</span>
                  </button>
                  <button
                    onClick={() => handleAction(message.id, 'Edit')}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors text-sm font-medium"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleAction(message.id, 'Delete')}
                    className="flex items-center space-x-2 px-4 py-2 bg-danger-100 text-danger-700 rounded-lg hover:bg-danger-200 transition-colors text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Commands */}
      {isConnected && (
        <div className="card">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Quick Commands</h3>
            <p className="text-sm text-gray-600">Send these commands via WhatsApp</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3 mb-2">
                <Send className="w-5 h-5 text-primary-600" />
                <code className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm font-medium">balance</code>
              </div>
              <p className="text-sm text-gray-600">Check current month spending summary</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3 mb-2">
                <Send className="w-5 h-5 text-primary-600" />
                <code className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm font-medium">report</code>
              </div>
              <p className="text-sm text-gray-600">Get weekly spending report with insights</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3 mb-2">
                <Send className="w-5 h-5 text-primary-600" />
                <code className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm font-medium">categories</code>
              </div>
              <p className="text-sm text-gray-600">View category-wise breakdown</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3 mb-2">
                <Send className="w-5 h-5 text-primary-600" />
                <code className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm font-medium">help</code>
              </div>
              <p className="text-sm text-gray-600">View all available commands</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default WhatsApp;

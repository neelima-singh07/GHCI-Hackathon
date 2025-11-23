import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  Calendar,
  Globe,
  MessageSquare,
  Bell,
  Shield,
  Smartphone,
  Settings,
  Check
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, setUser } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: 'user@example.com',
    phone: user.phone,
    language: user.language,
    notifications: {
      transactionAlerts: true,
      weeklyReports: true,
      anomalyAlerts: true,
      budgetWarnings: true
    },
    privacy: {
      dataSharing: false,
      analytics: true
    }
  });

  const handleSave = () => {
    setUser({ ...user, name: formData.name, language: formData.language });
    setEditMode(false);
    toast.success('Profile updated successfully!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
    { id: 'privacy', label: 'Privacy', icon: Shield }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile & Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Account Info */}
          <div className="card mt-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{user.phone}</p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(user.joined).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  <p className="text-sm text-gray-600">Update your personal details</p>
                </div>
                {!editMode ? (
                  <button onClick={() => setEditMode(true)} className="btn-primary">
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button onClick={() => setEditMode(false)} className="btn-secondary">
                      Cancel
                    </button>
                    <button onClick={handleSave} className="btn-primary">
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Full Name</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!editMode}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>Email Address</span>
                    </div>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!editMode}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>Phone Number</span>
                    </div>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    disabled
                    className="input-field bg-gray-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Connected via WhatsApp</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4" />
                      <span>Preferred Language</span>
                    </div>
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    disabled={!editMode}
                    className="input-field"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="hinglish">Hinglish</option>
                    <option value="ta">Tamil</option>
                    <option value="te">Telugu</option>
                    <option value="mr">Marathi</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                <p className="text-sm text-gray-600">Choose what updates you want to receive</p>
              </div>

              <div className="space-y-4">
                {Object.entries({
                  transactionAlerts: 'Transaction Alerts',
                  weeklyReports: 'Weekly Reports',
                  anomalyAlerts: 'Anomaly Alerts',
                  budgetWarnings: 'Budget Warnings'
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{label}</p>
                      <p className="text-sm text-gray-600">
                        {key === 'transactionAlerts' && 'Get notified for every transaction'}
                        {key === 'weeklyReports' && 'Receive weekly spending summaries'}
                        {key === 'anomalyAlerts' && 'Alerts for unusual spending patterns'}
                        {key === 'budgetWarnings' && 'Warnings when approaching budget limits'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.notifications[key]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            notifications: {
                              ...formData.notifications,
                              [key]: e.target.checked
                            }
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'whatsapp' && (
            <div className="card">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">WhatsApp Integration</h3>
                <p className="text-sm text-gray-600">Manage your WhatsApp connection</p>
              </div>

              <div className="bg-success-50 border border-success-200 rounded-lg p-6 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-success-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-semibold text-success-900">Connected</p>
                      <Check className="w-5 h-5 text-success-600" />
                    </div>
                    <p className="text-sm text-success-700">{user.phone}</p>
                  </div>
                  <button className="btn-secondary text-sm">Disconnect</button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Supported Input Types</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <MessageSquare className="w-8 h-8 text-primary-600 mb-2" />
                    <p className="font-medium text-gray-900">Text Messages</p>
                    <p className="text-sm text-gray-600 mt-1">Send transaction details via text</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Settings className="w-8 h-8 text-purple-600 mb-2" />
                    <p className="font-medium text-gray-900">Voice Messages</p>
                    <p className="text-sm text-gray-600 mt-1">Record and send audio messages</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Settings className="w-8 h-8 text-orange-600 mb-2" />
                    <p className="font-medium text-gray-900">Screenshots</p>
                    <p className="text-sm text-gray-600 mt-1">Share payment receipts & bills</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Commands</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <code className="px-2 py-1 bg-gray-100 rounded text-primary-600">balance</code>
                    <span className="text-gray-600">- Check current month spending</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <code className="px-2 py-1 bg-gray-100 rounded text-primary-600">report</code>
                    <span className="text-gray-600">- Get weekly spending report</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <code className="px-2 py-1 bg-gray-100 rounded text-primary-600">help</code>
                    <span className="text-gray-600">- View all available commands</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="card">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Privacy & Security</h3>
                <p className="text-sm text-gray-600">Control your data and privacy settings</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Data Sharing</p>
                    <p className="text-sm text-gray-600">Share anonymized data for product improvements</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.privacy.dataSharing}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          privacy: {
                            ...formData.privacy,
                            dataSharing: e.target.checked
                          }
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Usage Analytics</p>
                    <p className="text-sm text-gray-600">Help us improve by sharing usage patterns</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.privacy.analytics}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          privacy: {
                            ...formData.privacy,
                            analytics: e.target.checked
                          }
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Data Management</h4>
                <div className="space-y-3">
                  <button className="w-full btn-secondary text-left">
                    Download My Data
                  </button>
                  <button className="w-full btn-secondary text-left text-danger-600">
                    Delete My Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

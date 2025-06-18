'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Send, Download, Lock, Eye, EyeOff } from 'lucide-react';

interface Subscriber {
  email: string;
  timestamp: string;
}

// Get admin password from environment or use default
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lovelanguage2024';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  // Check if user is authenticated on mount (session storage)
  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_authenticated');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
      fetchSubscribers();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setLoginError('');
      fetchSubscribers();
    } else {
      setLoginError('Invalid password');
      setTimeout(() => setLoginError(''), 3000);
    }
  };

  const fetchSubscribers = () => {
    setLoading(true);
    try {
      // Get subscribers from localStorage for static hosting
      const storedSubscribers = JSON.parse(localStorage.getItem('love-language-subscribers') || '[]');
      setSubscribers(storedSubscribers);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportEmails = () => {
    if (subscribers.length === 0) return;
    
    const csvContent = 'Email,Subscribed Date\n' + 
      subscribers.map(sub => `${sub.email},${new Date(sub.timestamp).toLocaleDateString()}`).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `love-language-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sendLaunchNotification = async () => {
    setSending(true);
    setMessage('');
    
    try {
      // Simulate sending emails (in production, integrate with email service)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMessage(`🚀 ${subscribers.length} email addresses ready for launch notification!`);
      
      // In production, you would copy these emails to your email service:
      // - Mailchimp
      // - ConvertKit  
      // - SendGrid
      // - Or any email marketing platform
      
    } catch {
      setMessage('Failed to prepare notifications');
    } finally {
      setSending(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setSubscribers([]);
    sessionStorage.removeItem('admin_authenticated');
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-pink-100 w-full max-w-md"
        >
          <div className="text-center mb-6">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Lock className="text-pink-500 w-12 h-12" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Love Language Admin</h1>
            <p className="text-gray-600">Enter password to access admin panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white/80 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-medium"
            >
              Access Admin Panel
            </motion.button>
          </form>

          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg text-center text-sm"
            >
              ⚠️ {loginError}
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard (authenticated)
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 flex items-center justify-center">
        <div className="text-pink-600">Loading subscribers...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 relative"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Love Language Admin</h1>
          <p className="text-gray-600">Manage your beauty brand subscribers</p>
          
          <button
            onClick={logout}
            className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 text-sm underline"
          >
            Logout
          </button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-pink-100"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="text-pink-500 w-6 h-6" />
              <h3 className="font-semibold text-gray-800">Total Subscribers</h3>
            </div>
            <p className="text-3xl font-bold text-pink-600">{subscribers.length}</p>
            <p className="text-sm text-gray-500 mt-1">
              {subscribers.length === 0 ? 'No subscribers yet' : 
               subscribers.length === 1 ? '1 person waiting' : 
               `${subscribers.length} people waiting`}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={exportEmails}
              disabled={subscribers.length === 0}
              className="w-full bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-3 mb-2">
                <Download className="text-purple-500 w-6 h-6" />
                <h3 className="font-semibold text-gray-800">Export Emails</h3>
              </div>
              <p className="text-sm text-gray-600">Download as CSV file</p>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={sendLaunchNotification}
              disabled={sending || subscribers.length === 0}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl p-4 md:p-6 shadow-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-3 mb-2">
                {sending ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-6 h-6" />
                )}
                <h3 className="font-semibold">Prepare Launch Alert</h3>
              </div>
              <p className="text-sm opacity-90">
                {sending ? 'Preparing...' : 'Export for email service'}
              </p>
            </button>
          </motion.div>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-center"
          >
            {message}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-pink-100"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Mail className="text-pink-500 w-5 h-5" />
            Subscribers ({subscribers.length})
          </h2>
          
          {subscribers.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No subscribers yet</p>
              <p className="text-gray-400 text-sm">People who sign up will appear here</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {subscribers.map((subscriber, index) => (
                <motion.div
                  key={`${subscriber.email}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-lg gap-2"
                >
                  <span className="text-gray-800 font-medium">{subscriber.email}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(subscriber.timestamp).toLocaleDateString()} at {new Date(subscriber.timestamp).toLocaleTimeString()}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Static Hosting Notes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200"
        >
          <h3 className="font-semibold text-blue-800 mb-2">💡 Static Hosting Info:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Subscribers stored in browser localStorage</li>
            <li>• Export emails to CSV for your email service</li>
            <li>• Works perfectly on static hosts like Hostinger</li>
            <li>• No server required - pure client-side</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
} 
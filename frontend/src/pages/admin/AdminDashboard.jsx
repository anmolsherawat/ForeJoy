import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Users,
  Trophy,
  Heart,
  TrendingUp,
  Calendar,
  Settings,
  DollarSign,
  CheckCircle,
  XCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const location = useLocation();
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [analyticsRes, usersRes] = await Promise.all([
        axios.get('/api/admin/analytics'),
        axios.get('/api/admin/users'),
      ]);

      setAnalytics(analyticsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    { path: '/admin', label: 'Overview', icon: TrendingUp },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/draws', label: 'Draws', icon: Trophy },
    { path: '/admin/charities', label: 'Charities', icon: Heart },
    { path: '/admin/winnings', label: 'Winnings', icon: DollarSign },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ethereal-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ethereal-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100">Admin Dashboard</h1>
          <p className="text-gray-400 mt-1">Manage your platform</p>
        </div>

        <div className="flex space-x-1 glass-strong p-1 rounded-lg mb-8 overflow-x-auto border border-gray-700/30">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white glow-gray'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <Routes>
          <Route path="/" element={
            <div>
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {[
                  { label: 'Total Users', value: analytics?.totalUsers || 0, icon: Users },
                  { label: 'Active Subs', value: analytics?.activeSubscriptions || 0, icon: CheckCircle },
                  { label: 'Total Revenue', value: `$${(analytics?.totalRevenue || 0).toFixed(2)}`, icon: DollarSign },
                  { label: 'Total Winners', value: analytics?.totalWinners || 0, icon: Trophy },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-strong rounded-xl p-6 border border-gray-700/30 hover:border-gray-500/40 transition-all hover:glow-gray"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-100 mt-1">{stat.value}</p>
                      </div>
                      <div className="bg-gradient-to-br from-gray-500/20 to-gray-600/10 border border-gray-500/30 w-12 h-12 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-gray-300" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="glass-strong rounded-xl p-6 border border-gray-700/30">
                <h2 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-gray-400" />
                  Recent Users
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700/30">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Email</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Charity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/30">
                      {users.slice(0, 5).map((user) => (
                        <tr key={user.id} className="hover:bg-gray-800/30 transition-colors">
                          <td className="py-4 px-4">
                            <span className="font-medium text-gray-100">
                              {user.first_name} {user.last_name}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-400">{user.email}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.subscription?.status === 'active' 
                                ? 'bg-gray-700/50 text-gray-300' 
                                : 'bg-gray-800/50 text-gray-500'
                            }`}>
                              {user.subscription?.status === 'active' ? 'Subscribed' : 'Inactive'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-400">
                            {user.charity?.name || 'Not set'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;

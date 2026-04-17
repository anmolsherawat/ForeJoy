import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Trophy,
  Calendar,
  CreditCard,
  Heart,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, fetchUser } = useAuth();
  const [scores, setScores] = useState([]);
  const [winnings, setWinnings] = useState([]);
  const [latestDraw, setLatestDraw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddScore, setShowAddScore] = useState(false);
  const [newScore, setNewScore] = useState({ score: '', date: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [scoresRes, winningsRes, drawRes] = await Promise.all([
        axios.get('/api/scores'),
        axios.get('/api/winnings/my-winnings'),
        axios.get('/api/draws/latest'),
      ]);

      setScores(scoresRes.data);
      setWinnings(winningsRes.data);
      setLatestDraw(drawRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddScore = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/scores', newScore);
      setShowAddScore(false);
      setNewScore({ score: '', date: '' });
      fetchData();
    } catch (error) {
      console.error('Error adding score:', error);
    }
  };

  const handleDeleteScore = async (id) => {
    if (window.confirm('Are you sure you want to delete this score?')) {
      try {
        await axios.delete(`/api/scores/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting score:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ethereal-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  const isSubscribed = user?.subscription?.status === 'active';

  return (
    <div className="min-h-screen ethereal-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-100 mb-2">
            Welcome back, {user?.first_name}!
          </h1>
          <p className="text-gray-400">
            Manage your scores, track your winnings, and make a difference
          </p>
        </motion.div>

        {!isSubscribed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 glass-strong rounded-2xl p-8 border border-gray-700/30"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold text-gray-100 mb-2">Get in the game!</h2>
                <p className="text-gray-400">
                  Subscribe now to track scores, enter draws, and support your favorite charity
                </p>
              </div>
              <Link
                to="/pricing"
                className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold rounded-lg hover:from-gray-700 hover:to-gray-800 transition-colors glow-gray"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Current Scores',
              value: scores.length,
              icon: Trophy
            },
            {
              label: 'Total Winnings',
              value: `$${winnings.reduce((sum, w) => sum + parseFloat(w.amount), 0).toFixed(2)}`,
              icon: CreditCard
            },
            {
              label: 'Subscription',
              value: isSubscribed ? 'Active' : 'Inactive',
              icon: CheckCircle
            },
            {
              label: 'Charity %',
              value: `${user?.charity_percentage || 10}%`,
              icon: Heart
            }
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

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-strong rounded-xl p-6 border border-gray-700/30">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-100 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-gray-400" />
                Your Scores
              </h2>
              {isSubscribed && (
                <button
                  onClick={() => setShowAddScore(!showAddScore)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-colors glow-gray text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Score
                </button>
              )}
            </div>

            {showAddScore && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-6 p-4 glass rounded-lg"
                onSubmit={handleAddScore}
              >
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Score (1-45)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="45"
                      required
                      value={newScore.score}
                      onChange={(e) => setNewScore({ ...newScore, score: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={newScore.date}
                      onChange={(e) => setNewScore({ ...newScore, date: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 glow-gray"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddScore(false)}
                    className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700/70"
                  >
                    Cancel
                  </button>
                </div>
              </motion.form>
            )}

            <div className="space-y-3">
              {scores.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No scores yet. Add your first score!</p>
                </div>
              ) : (
                scores.map((score, index) => (
                  <motion.div
                    key={score.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 glass rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center glow-gray">
                        <span className="text-white font-bold text-lg">{score.score}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-100">
                          {new Date(score.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        {index === 0 && (
                          <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded-full">
                            Latest
                          </span>
                        )}
                      </div>
                    </div>
                    {isSubscribed && (
                      <button
                        onClick={() => handleDeleteScore(score.id)}
                        className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </div>

          <div className="glass-strong rounded-xl p-6 border border-gray-700/30">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-100 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-gray-400" />
                Your Winnings
              </h2>
            </div>

            <div className="space-y-3">
              {winnings.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No winnings yet. Keep playing!</p>
                </div>
              ) : (
                winnings.map((winning, index) => (
                  <motion.div
                    key={winning.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 glass rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-100">
                        {winning.match_type.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className="text-lg font-bold text-gray-300">
                        ${parseFloat(winning.amount).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>
                        {new Date(winning.draw_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        {latestDraw && latestDraw.status === 'published' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 glass-strong rounded-xl p-6 border border-gray-700/30"
          >
            <h2 className="text-xl font-bold text-gray-100 flex items-center mb-6">
              <Calendar className="w-5 h-5 mr-2 text-gray-400" />
              Latest Draw Results
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">
                  {new Date(latestDraw.draw_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-300">Winning Numbers:</span>
                  <div className="flex space-x-2">
                    {latestDraw.winning_numbers.map((num, index) => (
                      <span
                        key={index}
                        className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 text-white rounded-full flex items-center justify-center font-bold glow-gray"
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

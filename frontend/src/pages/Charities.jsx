import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Search, Globe, ExternalLink } from 'lucide-react';
import axios from 'axios';

const Charities = () => {
  const [charities, setCharities] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCharities();
  }, [search]);

  const fetchCharities = async () => {
    try {
      setLoading(true);
      const params = search ? { search } : {};
      const response = await axios.get('/api/charities', { params });
      setCharities(response.data);
    } catch (error) {
      console.error('Error fetching charities:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen ethereal-bg py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-500/20 to-gray-600/10 border border-gray-500/30 rounded-2xl mb-6">
            <Heart className="w-8 h-8 text-gray-300" />
          </div>
          <h1 className="text-4xl font-bold text-gray-100 mb-4">
            Choose Your Charity
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover amazing organizations making a difference. Your support matters.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-xl mx-auto mb-12"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search charities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 rounded-xl"
            />
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {charities.map((charity, index) => (
              <motion.div
                key={charity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-strong rounded-2xl overflow-hidden border border-gray-700/30 hover:border-gray-500/40 transition-all hover:glow-gray"
              >
                <div className="h-48 bg-gradient-to-br from-gray-700/50 to-gray-800/30 flex items-center justify-center">
                  {charity.image_url ? (
                    <img
                      src={charity.image_url}
                      alt={charity.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Heart className="w-16 h-16 text-gray-500 opacity-50" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-3">
                    {charity.name}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {charity.description || 'This organization is making a positive impact in our community.'}
                  </p>
                  {charity.website && (
                    <a
                      href={charity.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-300 font-medium hover:text-gray-200"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Visit Website
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && charities.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-100 mb-2">
              No charities found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Charities;

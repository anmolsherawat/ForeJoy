import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, CreditCard, Zap, Trophy, Heart } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Pricing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);

  const plans = [
    {
      name: 'Monthly',
      price: 10,
      period: '/month',
      features: [
        'Track your last 5 scores',
        'Monthly draw entries',
        'Support your favorite charity',
        'Access to all features',
        'Cancel anytime'
      ],
      planType: 'monthly',
      popular: false
    },
    {
      name: 'Yearly',
      price: 99,
      period: '/year',
      features: [
        'Everything in Monthly',
        'Save 17% ($21 off)',
        'Priority support',
        'Early draw notifications',
        'Exclusive member perks'
      ],
      planType: 'yearly',
      popular: true
    }
  ];

  const handleSubscribe = async (planType) => {
    if (!user) {
      navigate('/register');
      return;
    }

    setLoading(planType);
    try {
      const response = await axios.post('/api/subscriptions/create-checkout-session', { planType });
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen ethereal-bg py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-100 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that works best for you. All plans support your chosen charity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative glass-strong rounded-2xl overflow-hidden border border-gray-700/30 hover:border-gray-500/40 transition-all ${
                plan.popular ? 'hover:glow-gray' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-100 mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-5xl font-bold text-gray-100">${plan.price}</span>
                  <span className="ml-1 text-gray-500">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="flex-shrink-0 w-5 h-5 text-gray-400 mt-0.5" />
                      <span className="ml-3 text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.planType)}
                  disabled={loading === plan.planType}
                  className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 glow-gray'
                      : 'glass text-gray-100 hover:bg-gray-800/50'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading === plan.planType ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mx-auto"></div>
                  ) : (
                    user ? 'Subscribe Now' : 'Get Started'
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="glass-strong rounded-2xl p-8 text-center border border-gray-700/30">
            <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-100 mb-2">
              Your Impact Matters
            </h3>
            <p className="text-gray-400 mb-6">
              At least 10% of every subscription goes directly to the charity of your choice.
              You can increase this percentage at any time in your dashboard.
            </p>
            <Link
              to="/charities"
              className="inline-flex items-center text-gray-300 font-medium hover:text-gray-200"
            >
              Browse Charities
              <Zap className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Heart, Zap, ArrowRight } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Trophy,
      title: 'Hero’s Journey',
      description: 'Track your performance with a rolling 5-score system'
    },
    {
      icon: Heart,
      title: 'Impact Meter',
      description: 'Visualize your real-time charitable contributions'
    },
    {
      icon: Zap,
      title: 'Monthly Rewards',
      description: 'Participate in algorithm-driven prize pools'
    }
  ];

  return (
    <div className="min-h-screen ethereal-bg">
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent">
              Win for a Cause
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              A sophisticated platform combining performance tracking with charitable giving. 
              Your journey, your impact, beautifully visualized.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl glow-gray pulse-gray hover:from-gray-700 hover:to-gray-800 transition-all"
              >
                Begin Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold glass rounded-xl border border-gray-600/30 text-gray-200 hover:border-gray-500/50 transition-all"
              >
                Discover More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16 text-gray-100"
          >
            The Experience
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-strong rounded-2xl p-8 border border-gray-700/30 hover:border-gray-500/40 transition-all hover:glow-gray"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br from-gray-500/20 to-gray-600/10 border border-gray-500/30">
                  <feature.icon className="w-7 h-7 text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-12 border border-gray-700/30"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Join a community that values both achievement and altruism.
              Every step you take creates ripples of change.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-12 py-5 text-xl font-semibold bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl glow-gray pulse-gray hover:from-gray-700 hover:to-gray-800 transition-all"
            >
              Start Now
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

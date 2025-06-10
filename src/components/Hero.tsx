import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Globe, Code2 } from 'lucide-react';
import ApplicationModal from './ApplicationModal';

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'language' | 'coding' | 'office-club'>('language');

  const openModal = (type: 'language' | 'coding' | 'office-club') => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 floating-animation">
        <div className="w-16 h-16 bg-blue-500/20 rounded-full glow-blue"></div>
      </div>
      <div className="absolute top-40 right-20 floating-animation" style={{ animationDelay: '2s' }}>
        <div className="w-12 h-12 bg-purple-500/20 rounded-full glow-blue"></div>
      </div>
      <div className="absolute bottom-40 left-20 floating-animation" style={{ animationDelay: '4s' }}>
        <div className="w-20 h-20 bg-cyan-500/20 rounded-full glow-blue"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 text-blue-400"
          >
            <Sparkles size={16} />
            <span className="text-sm font-medium">Welcome to the Future of Learning</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-white leading-tight"
          >
            <span className="text-glow">Rising</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Academy
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Master languages, conquer code, and connect with like-minded learners in our exclusive Monday club sessions at{' '}
            <span className="text-blue-400 font-semibold">The Office</span>
          </motion.p>

          {/* Feature Icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center space-x-8 md:space-x-12 py-8"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center glow-blue card-3d">
                <Globe className="text-white" size={24} />
              </div>
              <span className="text-gray-400 text-sm">Languages</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center glow-blue card-3d">
                <Code2 className="text-white" size={24} />
              </div>
              <span className="text-gray-400 text-sm">Coding</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center glow-blue card-3d">
                <Sparkles className="text-white" size={24} />
              </div>
              <span className="text-gray-400 text-sm">The Office</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={() => openModal('language')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 glow-blue-intense hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Learning Today</span>
              <ArrowRight size={20} />
            </motion.button>
            <motion.button
              onClick={() => openModal('office-club')}
              className="border border-blue-500/50 text-blue-400 px-8 py-4 rounded-xl font-semibold hover:bg-blue-500/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join The Office Club
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-blue-400/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-blue-400 rounded-full mt-2"
          ></motion.div>
        </div>
      </motion.div>

      <ApplicationModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
      />
    </section>
  );
};

export default Hero;
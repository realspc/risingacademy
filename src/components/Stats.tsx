import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Code, Award } from 'lucide-react';
import { settingsService, SiteSettings } from '../services/settingsService';
import { useTranslation } from '../hooks/useTranslation';

const Stats = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await settingsService.getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const stats = [
    {
      icon: Users,
      number: `${settings?.stats.students || 500}+`,
      label: t('stats.students'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: BookOpen,
      number: settings?.stats.languages || 12,
      label: t('stats.languages'),
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Code,
      number: `${settings?.stats.programmingLanguages || 25}+`,
      label: t('stats.programming'),
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: Award,
      number: `${settings?.stats.successRate || 95}%`,
      label: t('stats.success'),
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section id="stats" className="py-20 bg-gradient-to-b from-dark-bg to-dark-card relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('stats.title').split(' ')[0]} <span className="text-glow text-blue-400">{t('stats.title').split(' ')[1]}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('stats.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative">
                {/* Icon Container */}
                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center glow-blue group-hover:glow-blue-intense transition-all duration-300 card-3d`}>
                  <stat.icon className="text-white" size={32} />
                </div>

                {/* Number */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold text-white mb-2 text-glow"
                >
                  {stat.number}
                </motion.div>

                {/* Label */}
                <div className="text-gray-400 font-medium">{stat.label}</div>

                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Join Our Growing Community</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Be part of a vibrant learning ecosystem where students from around the world come together 
              to master new skills, share knowledge, and build the future together.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Code2, Users, BookOpen, Laptop, Coffee } from 'lucide-react';
import ApplicationModal from './ApplicationModal';
import { useTranslation } from '../hooks/useTranslation';

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'language' | 'coding' | 'office-club'>('language');
  const { t } = useTranslation();

  const openModal = (type: 'language' | 'coding' | 'office-club') => {
    setModalType(type);
    setModalOpen(true);
  };

  const services = [
    {
      icon: Globe,
      title: t('services.language.title'),
      description: t('services.language.description'),
      features: ['Native Speakers', 'Interactive Lessons', 'Cultural Immersion', 'Certification'],
      color: 'from-blue-500 to-blue-600',
      delay: 0.1,
      type: 'language' as const
    },
    {
      icon: Code2,
      title: t('services.coding.title'),
      description: t('services.coding.description'),
      features: ['Full-Stack Development', 'Modern Frameworks', 'Real Projects', 'Job Placement'],
      color: 'from-purple-500 to-purple-600',
      delay: 0.2,
      type: 'coding' as const
    },
    {
      icon: Users,
      title: t('services.office.title'),
      description: t('services.office.description'),
      features: ['Weekly Meetups', 'Peer Learning', 'Industry Experts', 'Project Collaboration'],
      color: 'from-cyan-500 to-cyan-600',
      delay: 0.3,
      type: 'office-club' as const
    }
  ];

  return (
    <section id="services" className="py-20 bg-dark-bg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('services.title').split(' ')[0]} <span className="text-glow text-blue-400">{t('services.title').split(' ')[1] || ''}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: service.delay }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="gradient-border h-full">
                <div className="gradient-border-content p-6 md:p-8 h-full card-3d group-hover:glow-blue-intense transition-all duration-300">
                  {/* Icon */}
                  <div className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 glow-blue floating-animation mx-auto md:mx-0`}>
                    <service.icon className="text-white" size={24} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 text-center md:text-left">{service.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed text-center md:text-left">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-400 justify-center md:justify-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 glow-blue flex-shrink-0"></div>
                        <span className="text-sm md:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.button
                    onClick={() => openModal(service.type)}
                    className={`w-full bg-gradient-to-r ${service.color} text-white py-3 rounded-lg font-semibold glow-blue hover:glow-blue-intense transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('services.applyNow')}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* The Office Special Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-6 md:p-8 lg:p-12 border border-blue-500/30 glow-blue">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-6 justify-center md:justify-start">
                  <Coffee className="text-blue-400" size={28} />
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{t('nav.office')} - Every Monday</h3>
                </div>
                <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed text-center md:text-left">
                  Join our exclusive weekly club where learners, developers, and language enthusiasts come together 
                  to share knowledge, work on projects, and build lasting connections.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center space-x-2 justify-center md:justify-start">
                    <BookOpen className="text-blue-400" size={20} />
                    <span className="text-gray-300 text-sm md:text-base">Study Groups</span>
                  </div>
                  <div className="flex items-center space-x-2 justify-center md:justify-start">
                    <Laptop className="text-blue-400" size={20} />
                    <span className="text-gray-300 text-sm md:text-base">Coding Sessions</span>
                  </div>
                  <div className="flex items-center space-x-2 justify-center md:justify-start">
                    <Users className="text-blue-400" size={20} />
                    <span className="text-gray-300 text-sm md:text-base">Networking</span>
                  </div>
                  <div className="flex items-center space-x-2 justify-center md:justify-start">
                    <Coffee className="text-blue-400" size={20} />
                    <span className="text-gray-300 text-sm md:text-base">Coffee & Chat</span>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <motion.button
                    onClick={() => openModal('office-club')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold glow-blue-intense hover:scale-105 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reserve Your Spot
                  </motion.button>
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-48 md:h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center glow-blue floating-animation">
                  <div className="text-center">
                    <div className="text-4xl md:text-6xl font-bold text-blue-400 mb-2">MON</div>
                    <div className="text-gray-300 text-sm md:text-base">Weekly Sessions</div>
                    <div className="text-blue-400 font-semibold text-sm md:text-base">6:00 PM - 9:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <ApplicationModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
      />
    </section>
  );
};

export default Services;
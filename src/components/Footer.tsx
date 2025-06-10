import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';
import { settingsService, SiteSettings } from '../services/settingsService';

const Footer = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const data = await settingsService.getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error loading settings:', error);
      // Settings service now handles fallbacks, so this shouldn't happen
      // But we'll keep this for any unexpected errors
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const quickLinks = [
    { name: 'Languages', href: 'services' },
    { name: 'Coding', href: 'services' },
    { name: 'The Office', href: 'services' },
    { name: 'About', href: 'stats' },
    { name: 'Contact', href: 'contact' },
  ];

  // Show loading state briefly, then show content with settings (or defaults)
  if (isLoading) {
    return (
      <footer id="contact\" className="bg-dark-card border-t border-dark-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer id="contact" className="bg-dark-card border-t border-dark-border relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid opacity-10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center glow-blue">
                <span className="text-white font-bold">R</span>
              </div>
              <span className="text-white font-bold text-2xl text-glow">Rising Academy</span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
              Empowering learners worldwide with cutting-edge language and coding education. 
              Join our community and rise to new heights.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="text-blue-400" size={18} />
                <span>hello@risingacademy.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="text-blue-400" size={18} />
                <span>{settings?.contact.phone || '☎️:0670710505 /0667909055'}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="text-blue-400" size={18} />
                <span>{settings?.contact.location || 'ولاية باتنة طريق بسكرة، رود العرايس بناية بن بلاط'}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* The Office Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-bold text-lg mb-6">The Office Club</h3>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 glow-blue">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {settings?.officeClub.day || 'MONDAY'}
                </div>
                <div className="text-gray-300 text-sm mb-2">Weekly Sessions</div>
                <div className="text-blue-400 font-semibold">
                  {settings?.officeClub.time || '6:00 PM - 9:00 PM'}
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              {settings?.officeClub.description || 'Join us every Monday for collaborative learning, networking, and skill sharing.'}
            </p>
          </motion.div>
        </div>

        {/* Social Links & Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-dark-border pt-8 mt-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Links */}
            <div className="flex space-x-6 mb-4 md:mb-0">
              <motion.a
                href={settings?.contact.facebook || 'https://www.facebook.com/risingacademydz/'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-bg border border-dark-border rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400 transition-all duration-300 glow-blue"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a
                href={settings?.contact.instagram || 'https://www.instagram.com/rising_academy_/?hl=en'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-bg border border-dark-border rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400 transition-all duration-300 glow-blue"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-dark-bg border border-dark-border rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400 transition-all duration-300 glow-blue"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-dark-bg border border-dark-border rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400 transition-all duration-300 glow-blue"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </motion.a>
            </div>

            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2024 Rising Academy. All rights reserved.
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, BookOpen, Code, Users, Shield, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';
import { useTranslation } from '../hooks/useTranslation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  const isAdminPage = location.pathname.includes('/admin');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: t('nav.languages'), icon: BookOpen, href: 'services' },
    { name: t('nav.coding'), icon: Code, href: 'services' },
    { name: t('nav.office'), icon: Users, href: 'services' },
    { name: t('nav.about'), href: 'stats' },
    { name: t('nav.contact'), href: 'contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-dark-bg/90 backdrop-blur-lg border-b border-dark-border glow-blue' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center glow-blue">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-white font-bold text-xl text-glow">{t('brand.name')}</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Back to Home button for admin pages */}
            {isAdminPage && (
              <Link to="/">
                <motion.button
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft size={16} />
                  <span>{t('nav.backToHome')}</span>
                </motion.button>
              </Link>
            )}

            {/* Regular navigation items (only show on home page) */}
            {!isAdminPage && navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon && <item.icon size={16} />}
                <span>{item.name}</span>
              </motion.button>
            ))}

            {/* Admin link (only show on home page) */}
            {!isAdminPage && (
              <Link to="/admin">
                <motion.button
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield size={16} />
                  <span>{t('nav.admin')}</span>
                </motion.button>
              </Link>
            )}
            
            {/* Language Toggle */}
            <LanguageToggle />
            
            {/* Join Now button (only show on home page) */}
            {!isAdminPage && (
              <motion.button
                onClick={() => scrollToSection('services')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg glow-blue hover:glow-blue-intense transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('nav.joinNow')}
              </motion.button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageToggle />
            <button
              className="text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-dark-card rounded-lg mt-2 p-4 border border-dark-border glow-blue"
          >
            {/* Back to Home button for admin pages (mobile) */}
            {isAdminPage && (
              <Link to="/" className="block text-gray-300 hover:text-blue-400 py-2 transition-colors duration-200">
                <div className="flex items-center space-x-2">
                  <ArrowLeft size={16} />
                  <span>{t('nav.backToHome')}</span>
                </div>
              </Link>
            )}

            {/* Regular navigation items (only show on home page) */}
            {!isAdminPage && navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block text-gray-300 hover:text-blue-400 py-2 transition-colors duration-200 w-full text-left"
              >
                {item.name}
              </button>
            ))}

            {/* Admin link (only show on home page) */}
            {!isAdminPage && (
              <Link to="/admin" className="block text-gray-300 hover:text-blue-400 py-2 transition-colors duration-200">
                {t('nav.admin')}
              </Link>
            )}
            
            {/* Join Now button (only show on home page) */}
            {!isAdminPage && (
              <button 
                onClick={() => scrollToSection('services')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg mt-4 glow-blue"
              >
                {t('nav.joinNow')}
              </button>
            )}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
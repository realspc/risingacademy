import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, BookOpen, Code, Users, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    { name: 'Languages', icon: BookOpen, href: 'services' },
    { name: 'Coding', icon: Code, href: 'services' },
    { name: 'The Office', icon: Users, href: 'services' },
    { name: 'About', href: 'stats' },
    { name: 'Contact', href: 'contact' },
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
              <span className="text-white font-bold text-xl text-glow">Rising Academy</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
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
            <Link to="/admin">
              <motion.button
                className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center space-x-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Shield size={16} />
                <span>Admin</span>
              </motion.button>
            </Link>
            <motion.button
              onClick={() => scrollToSection('services')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg glow-blue hover:glow-blue-intense transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Now
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-dark-card rounded-lg mt-2 p-4 border border-dark-border glow-blue"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block text-gray-300 hover:text-blue-400 py-2 transition-colors duration-200 w-full text-left"
              >
                {item.name}
              </button>
            ))}
            <Link to="/admin" className="block text-gray-300 hover:text-blue-400 py-2 transition-colors duration-200">
              Admin
            </Link>
            <button 
              onClick={() => scrollToSection('services')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg mt-4 glow-blue"
            >
              Join Now
            </button>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Globe, 
  Code, 
  Coffee, 
  CheckCircle, 
  XCircle, 
  Clock,
  LogOut,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  Settings,
  Edit,
  RefreshCw,
  Plus,
  Minus
} from 'lucide-react';
import { applicationService } from '../services/applicationService';
import { authService } from '../services/authService';
import { settingsService, SiteSettings, ServiceCategory } from '../services/settingsService';
import { Application } from '../types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import Header from '../components/Header';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [editingSettings, setEditingSettings] = useState<SiteSettings | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    loadApplications();
    loadSettings();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, selectedType, selectedStatus, searchTerm]);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const data = await applicationService.getAllApplications();
      setApplications(data);
    } catch (error) {
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const refreshApplications = async () => {
    try {
      setRefreshing(true);
      const data = await applicationService.getAllApplications();
      setApplications(data);
      toast.success('Applications refreshed successfully');
    } catch (error) {
      toast.error('Failed to refresh applications');
    } finally {
      setRefreshing(false);
    }
  };

  const loadSettings = async () => {
    try {
      const data = await settingsService.getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const filterApplications = () => {
    let filtered = applications;

    if (selectedType !== 'all') {
      filtered = filtered.filter(app => app.type === selectedType);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(app => app.status === selectedStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredApplications(filtered);
  };

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await applicationService.updateApplicationStatus(id, status);
      await loadApplications();
      toast.success(`Application ${status} successfully`);
    } catch (error) {
      toast.error(`Failed to ${status} application`);
    }
  };

  const deleteApplication = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await applicationService.deleteApplication(id);
        await loadApplications();
        toast.success('Application deleted successfully');
      } catch (error) {
        toast.error('Failed to delete application');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await authService.signOut();
      navigate('/admin');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const handleSettingsUpdate = async (updatedSettings: SiteSettings) => {
    try {
      await settingsService.updateSettings(updatedSettings);
      await loadSettings();
      setShowSettings(false);
      setEditingSettings(null);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  const addServiceCategory = () => {
    if (!editingSettings) return;
    
    const newCategory: ServiceCategory = {
      id: `category-${Date.now()}`,
      name: 'New Category',
      description: 'Description for new category',
      icon: 'Star',
      color: 'from-gray-500 to-gray-600',
      subcategories: []
    };

    setEditingSettings({
      ...editingSettings,
      services: {
        ...editingSettings.services,
        categories: [...editingSettings.services.categories, newCategory]
      }
    });
  };

  const removeServiceCategory = (categoryId: string) => {
    if (!editingSettings) return;
    
    setEditingSettings({
      ...editingSettings,
      services: {
        ...editingSettings.services,
        categories: editingSettings.services.categories.filter(cat => cat.id !== categoryId)
      }
    });
  };

  const updateServiceCategory = (categoryId: string, updates: Partial<ServiceCategory>) => {
    if (!editingSettings) return;
    
    setEditingSettings({
      ...editingSettings,
      services: {
        ...editingSettings.services,
        categories: editingSettings.services.categories.map(cat => 
          cat.id === categoryId ? { ...cat, ...updates } : cat
        )
      }
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'language': return Globe;
      case 'coding': return Code;
      case 'office-club': return Coffee;
      default: return Users;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'rejected': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'language': return 'from-blue-500 to-blue-600';
      case 'coding': return 'from-purple-500 to-purple-600';
      case 'office-club': return 'from-cyan-500 to-cyan-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
    language: applications.filter(app => app.type === 'language').length,
    coding: applications.filter(app => app.type === 'coding').length,
    officeClub: applications.filter(app => app.type === 'office-club').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Header />
        <div className="flex items-center justify-center pt-20">
          <div className="text-white text-xl">{t('common.loading')}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      {/* Admin Header */}
      <div className="bg-dark-card border-b border-dark-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center glow-blue">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <h1 className="text-white font-bold text-xl">{t('admin.dashboard')}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshApplications}
                disabled={refreshing}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors disabled:opacity-50"
              >
                <RefreshCw size={20} className={refreshing ? 'animate-spin' : ''} />
                <span>{t('admin.refresh')}</span>
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <Settings size={20} />
                <span>{t('admin.settings')}</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <LogOut size={20} />
                <span>{t('admin.logout')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-card border border-dark-border rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-gray-400 text-sm">{t('admin.total')}</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-dark-card border border-dark-border rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
            <div className="text-gray-400 text-sm">{t('admin.pending')}</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-dark-card border border-dark-border rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-bold text-green-400">{stats.approved}</div>
            <div className="text-gray-400 text-sm">{t('admin.approved')}</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-dark-card border border-dark-border rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-bold text-red-400">{stats.rejected}</div>
            <div className="text-gray-400 text-sm">{t('admin.rejected')}</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-dark-card border border-dark-border rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-bold text-blue-400">{stats.language}</div>
            <div className="text-gray-400 text-sm">{t('admin.languages')}</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-dark-card border border-dark-border rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-bold text-purple-400">{stats.coding}</div>
            <div className="text-gray-400 text-sm">{t('admin.coding')}</div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-dark-card border border-dark-border rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-bold text-cyan-400">{stats.officeClub}</div>
            <div className="text-gray-400 text-sm">{t('admin.office')}</div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-dark-card border border-dark-border rounded-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-dark-bg border border-dark-border rounded-lg pl-10 pr-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="language">Language Learning</option>
              <option value="coding">Coding Bootcamp</option>
              <option value="office-club">Office Club</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </motion.div>

        {/* Applications Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-dark-card border border-dark-border rounded-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-bg border-b border-dark-border">
                <tr>
                  <th className="text-left p-4 text-gray-300 font-medium">Applicant</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Type</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Date</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((application) => {
                  const TypeIcon = getTypeIcon(application.type);
                  return (
                    <tr key={application.id} className="border-b border-dark-border hover:bg-dark-bg/50 transition-colors">
                      <td className="p-4">
                        <div>
                          <div className="text-white font-medium">
                            {application.firstName} {application.lastName}
                          </div>
                          <div className="text-gray-400 text-sm">{application.email}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <div className={`w-8 h-8 bg-gradient-to-br ${getTypeColor(application.type)} rounded-lg flex items-center justify-center`}>
                            <TypeIcon className="text-white" size={16} />
                          </div>
                          <span className="text-gray-300 capitalize">
                            {application.type.replace('-', ' ')}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-4 text-gray-300">
                        {application.createdAt.toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedApplication(application)}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          {application.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateStatus(application.id!, 'approved')}
                                className="text-green-400 hover:text-green-300 transition-colors"
                                title="Approve"
                              >
                                <CheckCircle size={16} />
                              </button>
                              <button
                                onClick={() => updateStatus(application.id!, 'rejected')}
                                className="text-red-400 hover:text-red-300 transition-colors"
                                title="Reject"
                              >
                                <XCircle size={16} />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => deleteApplication(application.id!)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredApplications.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No applications found matching your criteria.
            </div>
          )}
        </motion.div>
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-dark-card border border-dark-border rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedApplication.firstName} {selectedApplication.lastName}
                </h2>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedApplication.status)}`}>
                    {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                  </span>
                  <span className="text-gray-400">
                    Applied on {selectedApplication.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <div className="text-white">{selectedApplication.email}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                  <div className="text-white">{selectedApplication.phone}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Age</label>
                  <div className="text-white">{selectedApplication.age}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Type</label>
                  <div className="text-white capitalize">{selectedApplication.type.replace('-', ' ')}</div>
                </div>
              </div>

              {selectedApplication.preferredLanguages && selectedApplication.preferredLanguages.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Preferred Languages</label>
                  <div className="text-white">{selectedApplication.preferredLanguages.join(', ')}</div>
                </div>
              )}

              {selectedApplication.programmingExperience && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Programming Experience</label>
                  <div className="text-white capitalize">{selectedApplication.programmingExperience}</div>
                </div>
              )}

              {selectedApplication.availability && selectedApplication.availability.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Availability</label>
                  <div className="text-white">{selectedApplication.availability.join(', ')}</div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Motivation</label>
                <div className="text-white bg-dark-bg border border-dark-border rounded-lg p-4">
                  {selectedApplication.motivation}
                </div>
              </div>

              {selectedApplication.status === 'pending' && (
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => {
                      updateStatus(selectedApplication.id!, 'approved');
                      setSelectedApplication(null);
                    }}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300"
                  >
                    {t('common.approve')} Application
                  </button>
                  <button
                    onClick={() => {
                      updateStatus(selectedApplication.id!, 'rejected');
                      setSelectedApplication(null);
                    }}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300"
                  >
                    {t('common.reject')} Application
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && settings && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-dark-card border border-dark-border rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-white">Site Settings</h2>
              <button
                onClick={() => {
                  setShowSettings(false);
                  setEditingSettings(null);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XCircle size={24} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (editingSettings) {
                handleSettingsUpdate(editingSettings);
              }
            }}>
              {/* Contact Information */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Facebook URL</label>
                    <input
                      type="url"
                      value={editingSettings?.contact.facebook || settings.contact.facebook}
                      onChange={(e) => setEditingSettings(prev => ({
                        ...(prev || settings),
                        contact: { ...(prev || settings).contact, facebook: e.target.value }
                      }))}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Instagram URL</label>
                    <input
                      type="url"
                      value={editingSettings?.contact.instagram || settings.contact.instagram}
                      onChange={(e) => setEditingSettings(prev => ({
                        ...(prev || settings),
                        contact: { ...(prev || settings).contact, instagram: e.target.value }
                      }))}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                    <input
                      type="text"
                      value={editingSettings?.contact.phone || settings.contact.phone}
                      onChange={(e) => setEditingSettings(prev => ({
                        ...(prev || settings),
                        contact: { ...(prev || settings).contact, phone: e.target.value }
                      }))}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                    <input
                      type="text"
                      value={editingSettings?.contact.location || settings.contact.location}
                      onChange={(e) => setEditingSettings(prev => ({
                        ...(prev || settings),
                        contact: { ...(prev || settings).contact, location: e.target.value }
                      }))}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Statistics</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Number of Students</label>
                    <input
                      type="number"
                      value={editingSettings?.stats.students || settings.stats.students}
                      onChange={(e) => setEditingSettings(prev => ({
                        ...(prev || settings),
                        stats: { ...(prev || settings).stats, students: parseInt(e.target.value) }
                      }))}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Languages Taught</label>
                    <input
                      type="number"
                      value={editingSettings?.stats.languages || settings.stats.languages}
                      onChange={(e) => setEditingSettings(prev => ({
                        ...(prev || settings),
                        stats: { ...(prev || settings).stats, languages: parseInt(e.target.value) }
                      }))}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Programming Languages</label>
                    <input
                      type="number"
                      value={editingSettings?.stats.programmingLanguages || settings.stats.programmingLanguages}
                      onChange={(e) => setEditingSettings(prev => ({
                        ...(prev || settings),
                        stats: { ...(prev || settings).stats, programmingLanguages: parseInt(e.target.value) }
                      }))}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Success Rate (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editingSettings?.stats.successRate || settings.stats.successRate}
                      onChange={(e) => setEditingSettings(prev => ({
                        ...(prev || settings),
                        stats: { ...(prev || settings).stats, successRate: parseInt(e.target.value) }
                      }))}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Office Club Settings */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Office Club Settings</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Day</label>
                    <input
                      type="text"
                      value={editingSettings?.officeClub.day || settings.officeClub.day}
                      onChange={(e) => setEditingSettings(prev => ({
                        ...(prev || settings),
                        officeClub: { ...(prev || settings).officeClub, day: e.target.value }
                      }))}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Time</label>
                    <input
                      type="text"
                      value={editingSettings?.officeClub.time || settings.officeClub.time}
                      onChange={(e) => setEditingSettings(prev => ({
                        ...(prev || settings),
                        officeClub: { ...(prev || settings).officeClub, time: e.target.value }
                      }))}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                    <textarea
                      rows={3}
                      value={editingSettings?.officeClub.description || settings.officeClub.description}
                      onChange={(e) => setEditingSettings(prev => ({
                        ...(prev || settings),
                        officeClub: { ...(prev || settings).officeClub, description: e.target.value }
                      }))}
                      className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Service Categories */}
              {editingSettings && (
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Service Categories</h3>
                    <button
                      type="button"
                      onClick={addServiceCategory}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus size={16} />
                      <span>Add Category</span>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {editingSettings.services.categories.map((category, index) => (
                      <div key={category.id} className="bg-dark-bg border border-dark-border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-lg font-semibold text-white">Category {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeServiceCategory(category.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                            <input
                              type="text"
                              value={category.name}
                              onChange={(e) => updateServiceCategory(category.id, { name: e.target.value })}
                              className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Icon</label>
                            <input
                              type="text"
                              value={category.icon}
                              onChange={(e) => updateServiceCategory(category.id, { icon: e.target.value })}
                              className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                              placeholder="e.g., Globe, Code2, Palette"
                            />
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                          <textarea
                            rows={2}
                            value={category.description}
                            onChange={(e) => updateServiceCategory(category.id, { description: e.target.value })}
                            className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none resize-none"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Subcategories (comma-separated)</label>
                          <input
                            type="text"
                            value={category.subcategories?.join(', ') || ''}
                            onChange={(e) => updateServiceCategory(category.id, { 
                              subcategories: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
                            })}
                            className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
                            placeholder="e.g., Web Development, Mobile Apps, AI"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowSettings(false);
                    setEditingSettings(null);
                  }}
                  className="flex-1 border border-dark-border text-gray-300 py-3 rounded-lg hover:bg-dark-bg transition-colors"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingSettings(settings)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                >
                  {t('common.edit')} Settings
                </button>
                {editingSettings && (
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300"
                  >
                    {t('common.save')} Changes
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
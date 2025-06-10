import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { X, User, Mail, Phone, Calendar, MessageSquare, Globe, Code, Users } from 'lucide-react';
import { applicationService } from '../services/applicationService';
import toast from 'react-hot-toast';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'language' | 'coding' | 'office-club';
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  experience?: string;
  motivation: string;
  preferredLanguages?: string[];
  programmingExperience?: string;
  availability: string[];
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose, type }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const getModalConfig = () => {
    switch (type) {
      case 'language':
        return {
          title: 'Apply for Language Learning',
          icon: Globe,
          color: 'from-blue-500 to-blue-600',
          description: 'Join our immersive language learning program'
        };
      case 'coding':
        return {
          title: 'Apply for Coding Bootcamp',
          icon: Code,
          color: 'from-purple-500 to-purple-600',
          description: 'Start your programming journey with us'
        };
      case 'office-club':
        return {
          title: 'Join The Office Club',
          icon: Users,
          color: 'from-cyan-500 to-cyan-600',
          description: 'Be part of our Monday learning community'
        };
      default:
        return {
          title: 'Apply Now',
          icon: User,
          color: 'from-blue-500 to-blue-600',
          description: 'Join Rising Academy'
        };
    }
  };

  const config = getModalConfig();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await applicationService.createApplication({
        type,
        ...data,
        availability: data.availability || []
      });
      
      toast.success('Application submitted successfully!');
      reset();
      onClose();
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const availabilityOptions = [
    'Monday Evening', 'Tuesday Evening', 'Wednesday Evening', 
    'Thursday Evening', 'Friday Evening', 'Saturday', 'Sunday'
  ];

  const languageOptions = [
    'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
    'Japanese', 'Korean', 'Mandarin', 'Arabic', 'Russian'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-dark-card border border-dark-border rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto glow-blue"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${config.color} rounded-xl flex items-center justify-center glow-blue`}>
                  <config.icon className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{config.title}</h2>
                  <p className="text-gray-400">{config.description}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <User size={16} className="inline mr-2" />
                    First Name
                  </label>
                  <input
                    {...register('firstName', { required: 'First name is required' })}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    {...register('lastName', { required: 'Last name is required' })}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail size={16} className="inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Phone size={16} className="inline mr-2" />
                    Phone
                  </label>
                  <input
                    {...register('phone', { required: 'Phone number is required' })}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Calendar size={16} className="inline mr-2" />
                  Age
                </label>
                <input
                  type="number"
                  {...register('age', { 
                    required: 'Age is required',
                    min: { value: 16, message: 'Must be at least 16 years old' },
                    max: { value: 100, message: 'Invalid age' }
                  })}
                  className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none transition-colors"
                  placeholder="Enter your age"
                />
                {errors.age && (
                  <p className="text-red-400 text-sm mt-1">{errors.age.message}</p>
                )}
              </div>

              {/* Type-specific fields */}
              {type === 'language' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preferred Languages (select multiple)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {languageOptions.map((lang) => (
                      <label key={lang} className="flex items-center space-x-2 text-gray-300">
                        <input
                          type="checkbox"
                          value={lang}
                          {...register('preferredLanguages')}
                          className="rounded border-dark-border bg-dark-bg text-blue-400 focus:ring-blue-400"
                        />
                        <span>{lang}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {type === 'coding' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Programming Experience
                  </label>
                  <select
                    {...register('programmingExperience')}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none transition-colors"
                  >
                    <option value="">Select your level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Availability (select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availabilityOptions.map((time) => (
                    <label key={time} className="flex items-center space-x-2 text-gray-300">
                      <input
                        type="checkbox"
                        value={time}
                        {...register('availability')}
                        className="rounded border-dark-border bg-dark-bg text-blue-400 focus:ring-blue-400"
                      />
                      <span>{time}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <MessageSquare size={16} className="inline mr-2" />
                  Why do you want to join?
                </label>
                <textarea
                  {...register('motivation', { required: 'Please tell us your motivation' })}
                  rows={4}
                  className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your goals and motivation..."
                />
                {errors.motivation && (
                  <p className="text-red-400 text-sm mt-1">{errors.motivation.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 border border-dark-border text-gray-300 py-3 rounded-lg hover:bg-dark-bg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 bg-gradient-to-r ${config.color} text-white py-3 rounded-lg font-semibold glow-blue hover:glow-blue-intense transition-all duration-300 disabled:opacity-50`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ApplicationModal;


import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../hooks/useAuth';
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Shield,
  Bell,
  Globe,
  Clock,
  Key,
  Camera,
  Save,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  LogOut,
  Settings,
  Building2,
  BadgeCheck,
  CalendarDays
} from 'lucide-react';

const UserProfileModal = ({ isOpen, onClose, onLogout }) => {
  const { darkMode } = useTheme();
  const { user, updateUser, changePassword, updatePreferences, uploadAvatar, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  // Form states
  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    department: user?.department || '',
    position: user?.position || ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferencesForm, setPreferencesForm] = useState({
    notifications: user?.preferences?.notifications !== false, // default to true
    language: user?.preferences?.language || 'en',
    timezone: user?.preferences?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata'
  });

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      setProfileForm({
        fullName: user?.fullName || '',
        username: user?.username || '',
        email: user?.email || '',
        phone: user?.phone || '',
        location: user?.location || '',
        department: user?.department || '',
        position: user?.position || ''
      });
      
      setPreferencesForm({
        notifications: user?.preferences?.notifications !== false,
        language: user?.preferences?.language || 'en',
        timezone: user?.preferences?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata'
      });
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'activity', label: 'Activity', icon: Clock }
  ];

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const result = await updateUser(profileForm);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to update profile' });
    }
    
    setLoading(false);
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match!' });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters!' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    const result = await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to change password' });
    }
    
    setLoading(false);
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handlePreferencesUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const result = await updatePreferences(preferencesForm);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Preferences updated successfully!' });
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to update preferences' });
    }
    
    setLoading(false);
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // const handleAvatarUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   if (file.size > 5 * 1024 * 1024) {
  //     setMessage({ type: 'error', text: 'File size must be less than 5MB' });
  //     return;
  //   }

  //   setLoading(true);
  //   const result = await uploadAvatar(file);


  const handleAvatarUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    setMessage({ type: 'error', text: 'File size must be less than 5MB' });
    return;
  }

  const formData = new FormData();
  formData.append("avatar", file);   // important

  setLoading(true);

  const result = await uploadAvatar(formData);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Avatar updated successfully!' });
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to upload avatar' });
    }
    
    setLoading(false);
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleLogout = async () => {
    await logout();
    if (onLogout) onLogout();
    onClose();
  };

  // Get user initials
  const getUserInitials = () => {
    if (user.fullName) {
      return user.fullName
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user.username?.slice(0, 2).toUpperCase() || 'U';
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`
          relative w-full max-w-4xl rounded-xl shadow-2xl
          ${darkMode ? 'bg-gray-800' : 'bg-white'}
        `}>
          {/* Header */}
          <div className={`
            flex items-center justify-between p-6 border-b
            ${darkMode ? 'border-gray-700' : 'border-gray-200'}
          `}>
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Profile Settings
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Message */}
          {message.text && (
            <div className={`
              mx-6 mt-4 p-3 rounded-lg flex items-center gap-2
              ${message.type === 'success' 
                ? darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-50 text-green-700'
                : darkMode ? 'bg-red-900/50 text-red-300' : 'bg-red-50 text-red-700'
              }
            `}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span className="text-sm">{message.text}</span>
            </div>
          )}

          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className={`
              md:w-64 p-6 border-r
              ${darkMode ? 'border-gray-700' : 'border-gray-200'}
            `}>
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative group">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.fullName || user.username}
                      className="w-24 h-24 rounded-full object-cover border-4 border-blue-500/20"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center border-4 border-blue-500/20">
                      <span className="text-white text-3xl font-semibold">
                        {getUserInitials()}
                      </span>
                    </div>
                  )}
                  <label className={`
                    absolute bottom-0 right-0 p-1.5 rounded-full cursor-pointer
                    ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}
                    transition-colors
                  `}>
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <h3 className={`mt-3 font-medium text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {user.fullName || user.username}
                </h3>
                <p className={`text-sm flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <BadgeCheck className="w-3 h-3" />
                  {user.role?.charAt(0).toUpperCase() + user.role?.slice(1) || 'Employee'}
                </p>
                {user.isActive === false && (
                  <span className="mt-2 text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                    Inactive
                  </span>
                )}
              </div>

              {/* Quick Info */}
              <div className="mb-6 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{user.email}</span>
                </div>
                {user.department && (
                  <div className="flex items-center gap-2 text-gray-500">
                    <Building2 className="w-4 h-4" />
                    <span>{user.department}</span>
                  </div>
                )}
                {user.position && (
                  <div className="flex items-center gap-2 text-gray-500">
                    <Briefcase className="w-4 h-4" />
                    <span>{user.position}</span>
                  </div>
                )}
              </div>

              {/* Tabs */}
              <nav className="space-y-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${activeTab === tab.id
                        ? darkMode 
                          ? 'bg-gray-700 text-white' 
                          : 'bg-blue-50 text-blue-600'
                        : darkMode
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }
                    `}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 max-h-[600px] overflow-y-auto">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <form onSubmit={handleProfileUpdate}>
                  <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Profile Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={profileForm.fullName}
                          onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                          disabled={!isEditing}
                          className={`
                            w-full pl-10 pr-3 py-2 border rounded-lg
                            ${darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                            }
                            ${!isEditing && 'opacity-75 cursor-not-allowed'}
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                          `}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Username
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={profileForm.username}
                          onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                          disabled={!isEditing}
                          className={`
                            w-full pl-10 pr-3 py-2 border rounded-lg
                            ${darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                            }
                            ${!isEditing && 'opacity-75 cursor-not-allowed'}
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                          `}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          disabled={!isEditing}
                          className={`
                            w-full pl-10 pr-3 py-2 border rounded-lg
                            ${darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                            }
                            ${!isEditing && 'opacity-75 cursor-not-allowed'}
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                          `}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          value={profileForm.phone || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          disabled={!isEditing}
                          className={`
                            w-full pl-10 pr-3 py-2 border rounded-lg
                            ${darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                            }
                            ${!isEditing && 'opacity-75 cursor-not-allowed'}
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                          `}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Department
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={profileForm.department || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                          disabled={!isEditing}
                          className={`
                            w-full pl-10 pr-3 py-2 border rounded-lg
                            ${darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                            }
                            ${!isEditing && 'opacity-75 cursor-not-allowed'}
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                          `}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Position
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={profileForm.position || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, position: e.target.value })}
                          disabled={!isEditing}
                          className={`
                            w-full pl-10 pr-3 py-2 border rounded-lg
                            ${darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                            }
                            ${!isEditing && 'opacity-75 cursor-not-allowed'}
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                          `}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={profileForm.location || ''}
                          onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                          disabled={!isEditing}
                          className={`
                            w-full pl-10 pr-3 py-2 border rounded-lg
                            ${darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                            }
                            ${!isEditing && 'opacity-75 cursor-not-allowed'}
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                          `}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    {!isEditing ? (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            setProfileForm({
                              fullName: user?.fullName || '',
                              username: user?.username || '',
                              email: user?.email || '',
                              phone: user?.phone || '',
                              location: user?.location || '',
                              department: user?.department || '',
                              position: user?.position || ''
                            });
                          }}
                          className={`px-4 py-2 border rounded-lg transition-colors ${
                            darkMode 
                              ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                          {loading ? 'Saving...' : (
                            <>
                              <Save className="w-4 h-4" />
                              Save Changes
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </form>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <form onSubmit={handlePasswordChange}>
                  <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Change Password
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Current Password
                      </label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                          className={`
                            w-full pl-10 pr-10 py-2 border rounded-lg
                            ${darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                            }
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                          `}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        New Password
                      </label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                          className={`
                            w-full pl-10 pr-10 py-2 border rounded-lg
                            ${darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                            }
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                          `}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                          className={`
                            w-full pl-10 pr-10 py-2 border rounded-lg
                            ${darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                            }
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                          `}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Changing...' : 'Change Password'}
                    </button>
                  </div>
                </form>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <form onSubmit={handlePreferencesUpdate}>
                  <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Preferences
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Email Notifications
                        </label>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Receive email notifications about account activity
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferencesForm.notifications}
                          onChange={(e) => setPreferencesForm({ ...preferencesForm, notifications: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className={`
                          w-11 h-6 rounded-full peer 
                          ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}
                          peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                          after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                          peer-checked:bg-blue-600
                        `}></div>
                      </label>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Language
                      </label>
                      <select
                        value={preferencesForm.language}
                        onChange={(e) => setPreferencesForm({ ...preferencesForm, language: e.target.value })}
                        className={`
                          w-full px-3 py-2 border rounded-lg
                          ${darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                          }
                          focus:outline-none focus:ring-2 focus:ring-blue-500
                        `}
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="hi">हिन्दी</option>
                        <option value="ta">தமிழ்</option>
                        <option value="te">తెలుగు</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Timezone
                      </label>
                      <select
                        value={preferencesForm.timezone}
                        onChange={(e) => setPreferencesForm({ ...preferencesForm, timezone: e.target.value })}
                        className={`
                          w-full px-3 py-2 border rounded-lg
                          ${darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                          }
                          focus:outline-none focus:ring-2 focus:ring-blue-500
                        `}
                      >
                        <option value="Asia/Kolkata">India (IST)</option>
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="Europe/London">London (GMT)</option>
                        <option value="Asia/Dubai">Dubai (GST)</option>
                        <option value="Asia/Singapore">Singapore (SGT)</option>
                        <option value="Australia/Sydney">Sydney (AEST)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : 'Save Preferences'}
                    </button>
                  </div>
                </form>
              )}

              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <div>
                  <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Account Activity
                  </h3>

                  <div className="space-y-4">
                    <div className={`
                      p-4 rounded-lg space-y-3
                      ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}
                    `}>
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          <CalendarDays className="w-4 h-4 inline mr-2" />
                          Member Since
                        </span>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {formatDate(user.createdAt)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          <Clock className="w-4 h-4 inline mr-2" />
                          Last Login
                        </span>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {formatDate(user.lastLogin)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          <BadgeCheck className="w-4 h-4 inline mr-2" />
                          Account Status
                        </span>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          user.isActive 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>

                    <h4 className={`font-medium mt-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Login History
                    </h4>
                    
                    <div className="space-y-2">
                      {/* Sample login history - you'll need to implement this in backend */}
                      <div className={`
                        p-3 rounded-lg text-sm
                        ${darkMode ? 'bg-gray-700/30' : 'bg-gray-50'}
                      `}>
                        <div className="flex items-center justify-between">
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                            Chrome on Windows
                          </span>
                          <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                            {formatDate(user.lastLogin)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                          }`}>
                            Current Session
                          </span>
                          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            • IP: 192.168.1.1
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className={`
            flex items-center justify-between p-6 border-t
            ${darkMode ? 'border-gray-700' : 'border-gray-200'}
          `}>
            <button 
              onClick={handleLogout}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${darkMode 
                  ? 'text-red-400 hover:bg-red-500/10' 
                  : 'text-red-600 hover:bg-red-50'
                }
              `}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
            <button
              onClick={onClose}
              className={`px-4 py-2 border rounded-lg transition-colors ${
                darkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;

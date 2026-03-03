import React, { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../hooks/useAuth';
import UserProfileModal from '../modals/UserProfileModal';

const UserProfile = () => {
  const { darkMode } = useTheme();
  const { user, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center space-x-3">
        <div className="text-right hidden sm:block">
          <div className={`h-4 w-24 animate-pulse rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          <div className={`h-3 w-32 animate-pulse rounded mt-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        </div>
        <div className={`w-10 h-10 rounded-full animate-pulse ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center space-x-3 hover:opacity-80 transition-opacity focus:outline-none"
      >
        <div className="text-right hidden sm:block">
          <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {user.username}
          </p>
          {/* <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {user.email}
          </p> */}
        </div>
        <div className="relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold">{user.initials}</span>
            </div>
          )}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
        </div>
      </button>

      <UserProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default UserProfile;
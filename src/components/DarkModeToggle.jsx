// src/components/DarkModeToggle.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <button onClick={toggleDarkMode} className="fixed top-4 right-4 bg-gray-200 dark:bg-gray-800 p-2 rounded-full shadow-md transition-all duration-500">
      <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="text-yellow-500 dark:text-blue-400" />
    </button>
  );
};

export default DarkModeToggle;

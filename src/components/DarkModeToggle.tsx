import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface DarkModeToggleProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`p-2 sm:p-2.5 rounded-lg ${
        darkMode
          ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400'
          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
      } transition-all hover:scale-105 active:scale-95 touch-manipulation`}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{ minHeight: '44px', minWidth: '44px' }} // Ensure minimum touch target size
    >
      {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
    </button>
  );
};

export default DarkModeToggle;
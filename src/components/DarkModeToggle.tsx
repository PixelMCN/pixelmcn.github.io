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
      className={`p-2 rounded-lg ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} transition-all`}
    >
      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export default DarkModeToggle;
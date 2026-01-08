import React from 'react';
import { Terminal, User, Briefcase, Mail } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

interface NavigationProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  scrollToSection: (ref: React.RefObject<HTMLElement>) => void;
  heroRef: React.RefObject<HTMLDivElement>;
  aboutRef: React.RefObject<HTMLDivElement>;
  projectsRef: React.RefObject<HTMLDivElement>;
  contactRef: React.RefObject<HTMLDivElement>;
}

const Navigation: React.FC<NavigationProps> = ({ 
  darkMode, 
  setDarkMode, 
  scrollToSection, 
  heroRef,
  aboutRef, 
  projectsRef, 
  contactRef 
}) => {
  const sections = [
    { name: 'home', ref: heroRef, icon: Terminal },
    { name: 'about', ref: aboutRef, icon: User },
    { name: 'projects', ref: projectsRef, icon: Briefcase },
    { name: 'contact', ref: contactRef, icon: Mail }
  ];

  return (
    <nav className={`fixed top-0 w-full ${darkMode ? 'bg-slate-950/70' : 'bg-white/70'} backdrop-blur-xl border-b ${darkMode ? 'border-purple-500/20' : 'border-purple-300/30'} z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <h1 className={`text-2xl font-bold bg-gradient-to-r ${darkMode ? 'from-purple-400 via-pink-400 to-purple-400' : 'from-purple-600 via-pink-600 to-purple-600'} bg-clip-text text-transparent`}>
              PixelMCN
            </h1>
          </div>
          <div className="flex items-center gap-8">
            {sections.map((section) => (
              <button
                key={section.name}
                onClick={() => scrollToSection(section.ref)}
                className={`capitalize transition-all relative group ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {section.name}
              </button>
            ))}
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
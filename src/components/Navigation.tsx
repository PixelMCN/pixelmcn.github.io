import React, { useState, useEffect } from 'react';
import { Terminal, User, Briefcase, Mail, Menu, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const sections = [
    { name: 'home', ref: heroRef, icon: Terminal },
    { name: 'about', ref: aboutRef, icon: User },
    { name: 'projects', ref: projectsRef, icon: Briefcase },
    { name: 'contact', ref: contactRef, icon: Mail }
  ];

  // Handle scroll events for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when section is clicked
  const handleSectionClick = (ref: React.RefObject<HTMLElement>) => {
    scrollToSection(ref);
    setIsMobileMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className={`fixed top-0 w-full ${
        darkMode 
          ? isScrolled ? 'bg-slate-950/90' : 'bg-slate-950/70' 
          : isScrolled ? 'bg-white/90' : 'bg-white/70'
      } backdrop-blur-xl border-b ${
        darkMode ? 'border-purple-500/20' : 'border-purple-300/30'
      } z-50 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSectionClick(heroRef)}>
              <Terminal className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <h1 className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${
                darkMode ? 'from-purple-400 via-pink-400 to-purple-400' : 'from-purple-600 via-pink-600 to-purple-600'
              } bg-clip-text text-transparent`}>
                PixelMCN
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {sections.map((section) => (
                <button
                  key={section.name}
                  onClick={() => handleSectionClick(section.ref)}
                  className={`capitalize transition-all relative group text-sm lg:text-base ${
                    darkMode 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {section.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${
                    darkMode ? 'bg-purple-400' : 'bg-purple-600'
                  } transition-all group-hover:w-full`}></span>
                </button>
              ))}
              <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
              <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg transition-all ${
                  darkMode 
                    ? 'bg-slate-800 hover:bg-slate-700 text-purple-400' 
                    : 'bg-gray-200 hover:bg-gray-300 text-purple-600'
                }`}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={`fixed inset-0 z-40 md:hidden ${
          darkMode ? 'bg-slate-950/95' : 'bg-white/95'
        } backdrop-blur-xl pt-20 px-4 animate-fade-in`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-4">
              {sections.map((section) => (
                <button
                  key={section.name}
                  onClick={() => handleSectionClick(section.ref)}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    darkMode 
                      ? 'bg-slate-900/50 hover:bg-slate-800/70 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <section.icon className={`w-6 h-6 ${
                    darkMode ? 'text-purple-400' : 'text-purple-600'
                  }`} />
                  <span className="text-lg font-medium capitalize">{section.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
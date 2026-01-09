import React, { useEffect, useState } from 'react';

interface BackgroundProps {
  darkMode: boolean;
}

const Background: React.FC<BackgroundProps> = ({ darkMode }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Animated Background - positioned behind scroll content */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Reduced size and opacity on mobile for better performance */}
        <div className={`absolute top-10 sm:top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 ${
          darkMode ? 'bg-purple-500/15' : 'bg-purple-400/25'
        } rounded-full blur-2xl sm:blur-3xl float-element`}></div>
        <div className={`absolute top-20 sm:top-40 right-4 sm:right-20 w-56 h-56 sm:w-96 sm:h-96 ${
          darkMode ? 'bg-pink-500/15' : 'bg-pink-400/25'
        } rounded-full blur-2xl sm:blur-3xl float-element`}></div>
        <div className={`absolute bottom-10 sm:bottom-20 left-1/3 sm:left-1/2 w-48 h-48 sm:w-80 sm:h-80 ${
          darkMode ? 'bg-blue-500/15' : 'bg-blue-400/25'
        } rounded-full blur-2xl sm:blur-3xl float-element`}></div>
      </div>

      {/* Grid overlay - positioned behind scroll content */}
      <div className={`fixed inset-0 z-0 pointer-events-none ${
        darkMode ? 'opacity-8' : 'opacity-4'
      }`} style={{
        backgroundImage: `linear-gradient(${darkMode ? 'rgba(139, 92, 246, 0.25)' : 'rgba(139, 92, 246, 0.15)'} 1px, transparent 1px), linear-gradient(90deg, ${darkMode ? 'rgba(139, 92, 246, 0.25)' : 'rgba(139, 92, 246, 0.15)'} 1px, transparent 1px)`,
        backgroundSize: isMobile ? '40px 40px' : '50px 50px'
      }}></div>
    </>
  );
};

export default Background;
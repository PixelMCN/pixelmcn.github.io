import React from 'react';

interface BackgroundProps {
  darkMode: boolean;
}

const Background: React.FC<BackgroundProps> = ({ darkMode }) => {
  return (
    <>
      {/* Animated Background - positioned behind scroll content */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={`absolute top-20 left-10 w-72 h-72 ${darkMode ? 'bg-purple-500/20' : 'bg-purple-400/30'} rounded-full blur-3xl float-element`}></div>
        <div className={`absolute top-40 right-20 w-96 h-96 ${darkMode ? 'bg-pink-500/20' : 'bg-pink-400/30'} rounded-full blur-3xl float-element`}></div>
        <div className={`absolute bottom-20 left-1/2 w-80 h-80 ${darkMode ? 'bg-blue-500/20' : 'bg-blue-400/30'} rounded-full blur-3xl float-element`}></div>
      </div>

      {/* Grid overlay - positioned behind scroll content */}
      <div className={`fixed inset-0 z-0 pointer-events-none ${darkMode ? 'opacity-10' : 'opacity-5'}`} style={{
        backgroundImage: `linear-gradient(${darkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.2)'} 1px, transparent 1px), linear-gradient(90deg, ${darkMode ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.2)'} 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>
    </>
  );
};

export default Background;
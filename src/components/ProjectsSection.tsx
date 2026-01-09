import React, { useRef, useEffect } from 'react';
import { Code2 } from 'lucide-react';

interface ProjectsSectionProps {
  darkMode: boolean;
  projectsRef: React.RefObject<HTMLDivElement>;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ darkMode, projectsRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated background canvas - optimized for mobile performance
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reduce particle count on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 20 : 40;

    // Set canvas size with proper scaling for retina displays
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    updateCanvasSize();

    const particles: Array<{x: number, y: number, vx: number, vy: number, size: number}> = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width / (window.devicePixelRatio || 1),
        y: Math.random() * canvas.height / (window.devicePixelRatio || 1),
        vx: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3),
        vy: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3),
        size: Math.random() * 1.5 + 0.5
      });
    }

    let animationId: number;
    const animate = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = darkMode ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.15)';
        ctx.fill();
      });

      // Reduce connection calculations on mobile for better performance
      if (!isMobile) {
        particles.forEach((p1, i) => {
          particles.slice(i + 1).forEach(p2 => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = darkMode 
                ? `rgba(168, 85, 247, ${0.08 * (1 - dist / 120)})` 
                : `rgba(168, 85, 247, ${0.04 * (1 - dist / 120)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        });
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [darkMode]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden" ref={projectsRef}>
      {/* Animated Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 ${
          darkMode ? 'bg-purple-500/10' : 'bg-purple-400/15'
        } rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '5s' }}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 ${
          darkMode ? 'bg-pink-500/10' : 'bg-pink-400/15'
        } rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative w-full px-2">
        {/* Header */}
        <div className="mb-12 sm:mb-16 md:mb-20 text-center">
          <div className={`inline-flex items-center gap-2 mb-4 sm:mb-6 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full border-2 ${
            darkMode 
              ? 'bg-purple-500/10 border-purple-500/30 text-purple-300' 
              : 'bg-purple-100 border-purple-300 text-purple-700'
          } shadow-lg ${darkMode ? 'shadow-purple-500/10' : 'shadow-purple-300/20'}`}>
            <Code2 className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-mono font-semibold">Projects Portfolio</span>
          </div>
          
          <h3 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Featured Work
          </h3>
          
          <p className={`text-sm sm:text-base md:text-xl max-w-2xl mx-auto px-4 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          } leading-relaxed`}>
            A comprehensive showcase of development projects spanning multiple domains and technologies, from backend systems to modern web applications.
          </p>
        </div>

        {/* Coming Soon Text */}
        <div className="text-center px-4">
          <p className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Coming Soon ;)
          </p>
          <p className={`mt-3 sm:mt-4 text-xs sm:text-sm ${
            darkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Projects are currently under development. Check back soon!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
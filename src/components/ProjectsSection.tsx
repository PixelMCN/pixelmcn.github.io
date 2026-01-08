import React, { useRef, useEffect } from 'react';
import { Code2 } from 'lucide-react';

interface ProjectsSectionProps {
  darkMode: boolean;
  projectsRef: React.RefObject<HTMLDivElement>;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ darkMode, projectsRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated background canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{x: number, y: number, vx: number, vy: number, size: number}> = [];
    
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = darkMode ? 'rgba(168, 85, 247, 0.2)' : 'rgba(168, 85, 247, 0.15)';
        ctx.fill();
      });

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
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => cancelAnimationFrame(animationId);
  }, [darkMode]);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative z-10 overflow-hidden" ref={projectsRef}>
      {/* Animated Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${darkMode ? 'bg-purple-500/10' : 'bg-purple-400/15'} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '5s' }}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${darkMode ? 'bg-pink-500/10' : 'bg-pink-400/15'} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className={`inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full border-2 ${
            darkMode 
              ? 'bg-purple-500/10 border-purple-500/30 text-purple-300' 
              : 'bg-purple-100 border-purple-300 text-purple-700'
          } shadow-lg ${darkMode ? 'shadow-purple-500/10' : 'shadow-purple-300/20'}`}>
            <Code2 className="w-4 h-4" />
            <span className="text-sm font-mono font-semibold">Projects Portfolio</span>
          </div>
          
          <h3 className={`text-5xl md:text-7xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Featured Work
          </h3>
          
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            A comprehensive showcase of development projects spanning multiple domains and technologies, from backend systems to modern web applications.
          </p>
        </div>

        {/* Coming Soon Text */}
        <div className="text-center">
          <p className={`text-4xl md:text-5xl font-light ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Coming Soon ;)
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
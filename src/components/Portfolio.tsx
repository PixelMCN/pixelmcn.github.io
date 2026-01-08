import React, { useEffect, useRef, useState } from 'react';
import Navigation from './Navigation';
import Background from './Background';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load GSAP from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.async = true;
    script.onload = () => {
      const gsap = (window as any).gsap;

      // Hero animations
      gsap.from(heroRef.current?.querySelector('h2'), {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
      });

      gsap.from(heroRef.current?.querySelectorAll('p'), {
        duration: 1,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        delay: 0.3,
        ease: 'power3.out'
      });

      // Social links animation
      gsap.from(socialsRef.current?.querySelectorAll('a'), {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        delay: 0.8,
        ease: 'back.out(1.7)'
      });

      // About section animation
      gsap.from(aboutRef.current?.querySelectorAll('.about-card'), {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.15,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
        },
        ease: 'power3.out'
      });

      // Contact animation
      gsap.from(contactRef.current?.querySelectorAll('.contact-content'), {
        duration: 0.8,
        y: 50,
        opacity: 0,
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
        },
        ease: 'power3.out'
      });

      // Floating animation for decorative elements
      gsap.to('.float-element', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.3
      });
    };
    document.head.appendChild(script);

    // Load ScrollTrigger
    const scrollTriggerScript = document.createElement('script');
    scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
    scrollTriggerScript.async = true;
    document.head.appendChild(scrollTriggerScript);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(scrollTriggerScript);
    };
  }, []);

  // Handle scroll snap edge cases
  useEffect(() => {
    const container = document.querySelector('.scroll-snap-container');
    if (!container) return;

    let scrollTimeout: number;

    const handleScroll = () => {
      // Clear existing timeout
      if (scrollTimeout) clearTimeout(scrollTimeout);

      // Set new timeout to handle scroll end
      scrollTimeout = setTimeout(() => {
        // Optional: Add any post-scroll logic here
      }, 150);
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      // Find the parent scroll-snap-section and scroll to it
      const section = ref.current.closest('.scroll-snap-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className={`relative transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`} style={{ fontFamily: "'Space Mono', monospace" }}>
      {/* Load Space Mono font */}
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      
      <Background darkMode={darkMode} />
      
      <Navigation 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        scrollToSection={scrollToSection}
        heroRef={heroRef}
        aboutRef={aboutRef}
        projectsRef={projectsRef}
        contactRef={contactRef}
      />

      <div className="scroll-snap-container" style={{ 
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth'
      }}>
        <div className="scroll-snap-section" style={{ scrollSnapAlign: 'start' }}>
          <HeroSection 
            darkMode={darkMode} 
            heroRef={heroRef} 
            socialsRef={socialsRef} 
          />
        </div>

        <div className="scroll-snap-section" style={{ scrollSnapAlign: 'start' }}>
          <AboutSection 
            darkMode={darkMode} 
            aboutRef={aboutRef} 
          />
        </div>

        <div className="scroll-snap-section" style={{ scrollSnapAlign: 'start' }}>
          <ProjectsSection 
            darkMode={darkMode} 
            projectsRef={projectsRef} 
          />
        </div>

        <div className="scroll-snap-section" style={{ scrollSnapAlign: 'start' }}>
          <ContactSection 
            darkMode={darkMode} 
            contactRef={contactRef} 
          />
          {/* Footer included in contact section */}
          <footer className={`border-t ${darkMode ? 'border-purple-500/20' : 'border-purple-300/30'} py-8 relative z-10 transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto px-6 text-center">
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>© 2026 PixelMCN. Student Developer & Explorer of Code.</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
import React, { useEffect, useRef, useState } from 'react';
import Navigation from './Navigation';
import Background from './Background';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollSnapEnabled, setScrollSnapEnabled] = useState(true);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile and handle scroll snap behavior
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Disable scroll snap on very small screens for better UX
      setScrollSnapEnabled(!mobile || window.innerWidth >= 480);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP animations with mobile optimizations
  useEffect(() => {
    // Load GSAP from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.async = true;
    script.onload = () => {
      const gsap = (window as any).gsap;

      // Only run complex animations on non-mobile or reduce motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isMobile && prefersReducedMotion) return;

      // Hero animations - simplified for mobile
      if (!isMobile) {
        gsap.from(heroRef.current?.querySelector('h2'), {
          duration: 1.2,
          y: 50,
          opacity: 0,
          ease: 'power3.out'
        });
      } else {
        gsap.from(heroRef.current?.querySelector('h2'), {
          duration: 0.8,
          y: 30,
          opacity: 0,
          ease: 'power2.out'
        });
      }

      gsap.from(heroRef.current?.querySelectorAll('p'), {
        duration: isMobile ? 0.6 : 1,
        y: isMobile ? 20 : 30,
        opacity: 0,
        stagger: isMobile ? 0.1 : 0.2,
        delay: 0.2,
        ease: 'power2.out'
      });

      // Social links animation - simplified for mobile
      gsap.from(socialsRef.current?.querySelectorAll('a'), {
        duration: isMobile ? 0.6 : 0.8,
        y: isMobile ? 20 : 30,
        opacity: 0,
        stagger: isMobile ? 0.05 : 0.1,
        delay: 0.5,
        ease: 'back.out(1.7)'
      });

      // About section animation - only on desktop/tablet
      if (!isMobile) {
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
      }

      // Contact animation - only on desktop/tablet
      if (!isMobile) {
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
      }

      // Floating animation for decorative elements - reduced on mobile
      if (!isMobile) {
        gsap.to('.float-element', {
          y: -20,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          stagger: 0.3
        });
      }
    };
    document.head.appendChild(script);

    // Load ScrollTrigger only if needed
    if (!isMobile) {
      const scrollTriggerScript = document.createElement('script');
      scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
      scrollTriggerScript.async = true;
      document.head.appendChild(scrollTriggerScript);
    }

    return () => {
      const gsapScript = document.querySelector('script[src*="gsap.min.js"]');
      if (gsapScript) document.head.removeChild(gsapScript);
      const scrollTriggerScript = document.querySelector('script[src*="ScrollTrigger.min.js"]');
      if (scrollTriggerScript) document.head.removeChild(scrollTriggerScript);
    };
  }, [isMobile]);

  // Handle scroll snap edge cases with mobile optimization
  useEffect(() => {
    if (!scrollSnapEnabled || !containerRef.current) return;

    const container = containerRef.current;
    let scrollTimeout: number;

    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);

      // Set new timeout to handle scroll end
      scrollTimeout = setTimeout(() => {
        // Optional: Add any post-scroll logic here
      }, 150);
    };

    // Handle touch events for better mobile experience
    const handleTouchStart = () => {
      if (isMobile) {
        // Temporarily disable scroll snap during touch for smoother scrolling
        container.style.scrollSnapType = 'none';
      }
    };

    const handleTouchEnd = () => {
      if (isMobile && scrollSnapEnabled) {
        // Re-enable scroll snap after touch ends with a delay
        setTimeout(() => {
          container.style.scrollSnapType = 'y mandatory';
        }, 300);
      }
    };

    container.addEventListener('scroll', handleScroll);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [scrollSnapEnabled, isMobile]);

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      // Find the parent scroll-snap-section and scroll to it
      const section = ref.current.closest('.scroll-snap-section') as HTMLElement | null;
      if (section) {
        section.scrollIntoView({ 
          behavior: isMobile ? 'smooth' : 'smooth', 
          block: 'start' 
        });
      } else {
        ref.current.scrollIntoView({ 
          behavior: isMobile ? 'smooth' : 'smooth', 
          block: 'start' 
        });
      }
    }
  };

  return (
    <div className={`relative transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'
    }`} style={{ fontFamily: "'Space Mono', monospace" }}>
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

      <div 
        ref={containerRef}
        className="scroll-snap-container" 
        style={{ 
          height: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollSnapType: scrollSnapEnabled ? 'y mandatory' : 'none',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
      >
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
          <footer className={`border-t ${
            darkMode ? 'border-purple-500/20' : 'border-purple-300/30'
          } py-6 sm:py-8 relative z-10 transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className={`text-sm sm:text-base ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                © 2026 PixelMCN. Student Developer & Explorer of Code.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
// ==================== //
// Global JavaScript
// ==================== //

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initPageTransitions();
  initScrollAnimations();
  initLazyLoading();
});

// ==================== //
// Navbar Functionality
// ==================== //
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  const menuOverlay = document.querySelector('.menu-overlay');
  
  // Navbar scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // Mobile menu toggle
  if (navbarToggle && navbarMenu && menuOverlay) {
    const toggleMenu = (isOpen) => {
      navbarToggle.classList.toggle('active', isOpen);
      navbarMenu.classList.toggle('active', isOpen);
      menuOverlay.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };
    
    navbarToggle.addEventListener('click', () => {
      const isOpen = !navbarMenu.classList.contains('active');
      toggleMenu(isOpen);
    });
    
    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', () => {
      toggleMenu(false);
    });
    
    // Close menu when clicking on a link
    const navLinks = navbarMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
        toggleMenu(false);
      }
    });
  }
}

// ==================== //
// Page Transitions
// ==================== //
function initPageTransitions() {
  const transition = document.querySelector('.page-transition');
  
  // Fade in on page load
  if (transition) {
    setTimeout(() => {
      transition.classList.remove('active');
    }, 100);
  }
  
  // Intercept link clicks for smooth transitions
  const links = document.querySelectorAll('a[href^="./"], a[href^="/"], a[href^="index.html"], a[href^="docs.html"]');
  
  links.forEach(link => {
    // Skip external links and anchor links
    if (link.hostname !== window.location.hostname || link.getAttribute('href').startsWith('#')) {
      return;
    }
    
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Skip if it's a download or opens in new tab
      if (link.hasAttribute('download') || link.getAttribute('target') === '_blank') {
        return;
      }
      
      e.preventDefault();
      
      // Trigger transition
      transition.classList.add('active');
      
      // Navigate after transition
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
}

// ==================== //
// Scroll Animations with AnimeJS
// ==================== //
function initScrollAnimations() {
  if (typeof anime === 'undefined') {
    console.warn('AnimeJS not loaded, skipping animations');
    return;
  }
  
  // Observe elements for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Determine animation type
        if (element.classList.contains('fade-in')) {
          animateFadeIn(element);
        } else if (element.classList.contains('slide-in-left')) {
          animateSlideInLeft(element);
        } else if (element.classList.contains('slide-in-right')) {
          animateSlideInRight(element);
        } else if (element.classList.contains('scale-in')) {
          animateScaleIn(element);
        } else if (element.classList.contains('fade-in-up')) {
          animateFadeInUp(element);
        }
        
        // Stop observing after animation
        observer.unobserve(element);
      }
    });
  }, observerOptions);
  
  // Observe all animated elements
  const animatedElements = document.querySelectorAll(
    '.fade-in, .slide-in-left, .slide-in-right, .scale-in, .fade-in-up'
  );
  
  animatedElements.forEach(el => observer.observe(el));
}

// Animation functions
function animateFadeIn(element) {
  anime({
    targets: element,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 800,
    easing: 'easeOutCubic',
    complete: () => element.classList.add('animated')
  });
}

function animateSlideInLeft(element) {
  anime({
    targets: element,
    opacity: [0, 1],
    translateX: [-50, 0],
    duration: 800,
    easing: 'easeOutCubic',
    complete: () => element.classList.add('animated')
  });
}

function animateSlideInRight(element) {
  anime({
    targets: element,
    opacity: [0, 1],
    translateX: [50, 0],
    duration: 800,
    easing: 'easeOutCubic',
    complete: () => element.classList.add('animated')
  });
}

function animateScaleIn(element) {
  anime({
    targets: element,
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 800,
    easing: 'easeOutCubic',
    complete: () => element.classList.add('animated')
  });
}

function animateFadeInUp(element) {
  anime({
    targets: element,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 800,
    easing: 'easeOutCubic',
    complete: () => element.classList.add('animated')
  });
}

// ==================== //
// Smooth Scroll for Anchor Links
// ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if href is just "#"
    if (href === '#') {
      e.preventDefault();
      return;
    }
    
    const target = document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Update URL without jumping
      history.pushState(null, null, href);
    }
  });
});

// ==================== //
// Utility Functions
// ==================== //

// Format number with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Format date to relative time
function formatRelativeTime(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
  if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Copy to clipboard
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  } else {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    document.body.removeChild(textarea);
  }
}

// Show toast notification
function showToast(message, duration = 3000) {
  // Create toast element if it doesn't exist
  let toast = document.querySelector('.toast');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--color-surface-elevated);
      color: var(--color-text-primary);
      padding: 12px 24px;
      border-radius: 8px;
      border: 1px solid var(--color-border);
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
      font-size: 0.875rem;
      font-weight: 500;
    `;
    document.body.appendChild(toast);
  }
  
  toast.textContent = message;
  
  // Show toast
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 10);
  
  // Hide toast after duration
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
  }, duration);
}

// ==================== //
// Lazy Loading for Images
// ==================== //
function initLazyLoading() {
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Load the image
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          
          // Add loaded class for fade-in effect
          img.classList.add('lazy-loaded');
          
          // Stop observing this image
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px', // Start loading 50px before entering viewport
      threshold: 0.01
    });
    
    // Observe all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

// Export utility functions
window.utils = {
  formatNumber,
  formatRelativeTime,
  debounce,
  copyToClipboard,
  showToast
};

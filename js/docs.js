// ==================== //
// Docs Page JavaScript
// ==================== //

document.addEventListener('DOMContentLoaded', () => {
  // Check if coming soon section exists
  const comingSoonSection = document.querySelector('.coming-soon-section');
  
  if (comingSoonSection) {
    animateComingSoon();
  } else {
    // Original docs functionality
    initSidebar();
    initTableOfContents();
    initCodeBlocks();
    initSearch();
    initScrollSpy();
    animateDocsContent();
  }
});

// ==================== //
// Sidebar Functionality
// ==================== //
function initSidebar() {
  const sidebar = document.getElementById('docsSidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarClose = document.getElementById('sidebarClose');
  const sectionToggles = document.querySelectorAll('.nav-section-toggle');
  
  // Mobile sidebar toggle
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  // Close sidebar
  if (sidebarClose && sidebar) {
    sidebarClose.addEventListener('click', () => {
      sidebar.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  // Close sidebar when clicking on a link (mobile)
  const sidebarLinks = sidebar.querySelectorAll('.nav-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 968) {
        sidebar.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  // Close sidebar when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 968 && 
        sidebar.classList.contains('active') && 
        !sidebar.contains(e.target) && 
        !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Section toggles
  sectionToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const section = toggle.dataset.section;
      const items = toggle.nextElementSibling;
      
      toggle.classList.toggle('active');
      items.classList.toggle('active');
    });
  });
  
  // Set active link based on current hash
  updateActiveLink();
  window.addEventListener('hashchange', updateActiveLink);
}

function updateActiveLink() {
  const hash = window.location.hash || '#introduction';
  const links = document.querySelectorAll('.nav-link');
  
  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === hash) {
      link.classList.add('active');
      
      // Expand parent section
      const parentSection = link.closest('.nav-section');
      if (parentSection) {
        const toggle = parentSection.querySelector('.nav-section-toggle');
        const items = parentSection.querySelector('.nav-section-items');
        if (toggle && items) {
          toggle.classList.add('active');
          items.classList.add('active');
        }
      }
    }
  });
}

// ==================== //
// Table of Contents
// ==================== //
function initTableOfContents() {
  const toc = document.getElementById('tocNav');
  if (!toc) return;
  
  const contentWrapper = document.querySelector('.content-wrapper');
  if (!contentWrapper) return;
  
  // Get all h2 and h3 headings from the current section
  const currentHash = window.location.hash || '#introduction';
  const currentSection = document.querySelector(currentHash);
  
  if (!currentSection) return;
  
  const headings = currentSection.querySelectorAll('h2, h3');
  
  if (headings.length === 0) {
    toc.innerHTML = '<p style="color: var(--color-text-muted); font-size: 0.875rem;">No headings found</p>';
    return;
  }
  
  toc.innerHTML = '';
  
  headings.forEach((heading, index) => {
    const id = heading.id || `heading-${index}`;
    if (!heading.id) {
      heading.id = id;
    }
    
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = heading.textContent;
    link.style.paddingLeft = heading.tagName === 'H3' ? '1rem' : '0';
    
    link.addEventListener('click', (e) => {
      e.preventDefault();
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, null, `#${id}`);
    });
    
    toc.appendChild(link);
  });
}

// ==================== //
// Code Block Functionality
// ==================== //
function initCodeBlocks() {
  const codeBlocks = document.querySelectorAll('.code-block');
  
  codeBlocks.forEach(block => {
    const copyButton = block.querySelector('.copy-code');
    const code = block.querySelector('code');
    
    if (copyButton && code) {
      copyButton.addEventListener('click', () => {
        const text = code.textContent;
        window.utils.copyToClipboard(text);
        
        // Visual feedback
        const originalHTML = copyButton.innerHTML;
        copyButton.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        `;
        copyButton.style.color = 'var(--color-secondary)';
        
        setTimeout(() => {
          copyButton.innerHTML = originalHTML;
          copyButton.style.color = '';
        }, 2000);
      });
    }
  });
}

// ==================== //
// Search Functionality
// ==================== //
function initSearch() {
  const searchInput = document.getElementById('docsSearch');
  if (!searchInput) return;
  
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.nav-section');
  
  searchInput.addEventListener('input', window.utils.debounce((e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query === '') {
      // Show all
      navLinks.forEach(link => {
        link.style.display = '';
      });
      sections.forEach(section => {
        section.style.display = '';
      });
      return;
    }
    
    // Filter links
    let hasVisibleLinks = {};
    
    navLinks.forEach(link => {
      const text = link.textContent.toLowerCase();
      const section = link.closest('.nav-section');
      const sectionId = section ? section.querySelector('.nav-section-toggle').dataset.section : null;
      
      if (text.includes(query)) {
        link.style.display = '';
        if (sectionId) {
          hasVisibleLinks[sectionId] = true;
        }
      } else {
        link.style.display = 'none';
      }
    });
    
    // Show/hide sections based on visible links
    sections.forEach(section => {
      const toggle = section.querySelector('.nav-section-toggle');
      const sectionId = toggle.dataset.section;
      
      if (hasVisibleLinks[sectionId]) {
        section.style.display = '';
        // Auto-expand sections with matches
        toggle.classList.add('active');
        section.querySelector('.nav-section-items').classList.add('active');
      } else {
        section.style.display = 'none';
      }
    });
  }, 300));
}

// ==================== //
// Scroll Spy
// ==================== //
function initScrollSpy() {
  const sections = document.querySelectorAll('.doc-section');
  const navLinks = document.querySelectorAll('.nav-link');
  const tocLinks = document.querySelectorAll('.toc a');
  
  const observerOptions = {
    rootMargin: '-100px 0px -66%',
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        
        // Update sidebar nav
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
        
        // Update TOC
        tocLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => observer.observe(section));
  
  // Also observe headings within sections for TOC
  const headings = document.querySelectorAll('.doc-section h2, .doc-section h3');
  headings.forEach(heading => {
    if (heading.id) {
      observer.observe(heading);
    }
  });
}

// ==================== //
// Content Animations
// ==================== //
function animateDocsContent() {
  if (typeof anime === 'undefined') return;
  
  // Animate sidebar on load
  anime({
    targets: '.docs-sidebar',
    opacity: [0, 1],
    translateX: [-20, 0],
    duration: 600,
    easing: 'easeOutCubic'
  });
  
  // Animate main content
  anime({
    targets: '.content-wrapper',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 800,
    delay: 200,
    easing: 'easeOutCubic'
  });
  
  // Animate TOC
  anime({
    targets: '.toc',
    opacity: [0, 1],
    translateX: [20, 0],
    duration: 600,
    delay: 400,
    easing: 'easeOutCubic'
  });
  
  // Animate doc sections as they come into view
  const docSections = document.querySelectorAll('.doc-section');
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 800,
          easing: 'easeOutCubic'
        });
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  docSections.forEach(section => {
    section.style.opacity = '0';
    sectionObserver.observe(section);
  });
  
  // Animate info boxes
  const infoBoxes = document.querySelectorAll('.info-box, .warning-box');
  
  const boxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          opacity: [0, 1],
          scale: [0.95, 1],
          duration: 600,
          easing: 'easeOutCubic'
        });
        boxObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  infoBoxes.forEach(box => {
    box.style.opacity = '0';
    boxObserver.observe(box);
  });
  
  // Animate code blocks
  const codeBlocks = document.querySelectorAll('.code-block');
  
  const codeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
          easing: 'easeOutCubic'
        });
        codeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  codeBlocks.forEach(block => {
    block.style.opacity = '0';
    codeObserver.observe(block);
  });
}

// ==================== //
// Keyboard Navigation
// ==================== //
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K to focus search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.getElementById('docsSearch');
    if (searchInput) {
      searchInput.focus();
    }
  }
  
  // Escape to close sidebar (mobile)
  if (e.key === 'Escape') {
    const sidebar = document.getElementById('docsSidebar');
    if (sidebar && sidebar.classList.contains('active')) {
      sidebar.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

// ==================== //
// Update TOC on hash change
// ==================== //
window.addEventListener('hashchange', () => {
  initTableOfContents();
});

// ==================== //
// Smooth scroll for all anchor links
// ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    if (href === '#') {
      e.preventDefault();
      return;
    }
    
    const target = document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      
      const offsetTop = target.offsetTop - 100;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      history.pushState(null, null, href);
    }
  });
});

// ==================== //
// Print styles helper
// ==================== //
window.addEventListener('beforeprint', () => {
  // Expand all sections for printing
  const sectionToggles = document.querySelectorAll('.nav-section-toggle');
  const sectionItems = document.querySelectorAll('.nav-section-items');
  
  sectionToggles.forEach(toggle => toggle.classList.add('active'));
  sectionItems.forEach(items => items.classList.add('active'));
});

// ==================== //
// Coming Soon Animation
// ==================== //
function animateComingSoon() {
  if (typeof anime === 'undefined') return;
  
  // Animate the floating icon
  anime({
    targets: '.floating-icon',
    opacity: [0, 1],
    scale: [0.5, 1],
    duration: 1000,
    easing: 'easeOutElastic(1, .8)'
  });
  
  // Animate the title
  anime({
    targets: '.coming-soon-title',
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 800,
    delay: 300,
    easing: 'easeOutCubic'
  });
  
  // Animate the description
  anime({
    targets: '.coming-soon-description',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 800,
    delay: 500,
    easing: 'easeOutCubic'
  });
  
  // Animate the button
  anime({
    targets: '.back-home-btn',
    opacity: [0, 1],
    translateY: [20, 0],
    scale: [0.9, 1],
    duration: 600,
    delay: 700,
    easing: 'easeOutCubic'
  });
}

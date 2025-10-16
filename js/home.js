// ==================== //
// Home Page JavaScript
// ==================== //

// Configuration
const CONFIG = {
  github: {
    username: 'pixelmcn', // Change this to your GitHub username
    maxRepos: 12
  },
  modrinth: {
    username: 'Pixelis0P', // Change this to your Modrinth username
    maxProjects: 12
  }
};

// Language colors (GitHub style)
const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  TypeScript: '#2b7489',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Go: '#00ADD8',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#ffac45',
  Kotlin: '#F18E33',
  Dart: '#00B4AB',
  Shell: '#89e051',
  Vue: '#41b883',
  React: '#61dafb'
};

// Project type colors (Modrinth)
const PROJECT_TYPE_COLORS = {
  mod: '#10b981',
  modpack: '#3b82f6',
  resourcepack: '#f59e0b',
  shader: '#8b5cf6',
  datapack: '#ec4899',
  plugin: '#06b6d4'
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initHeroAnimations();
  fetchGitHubProjects();
  fetchModrinthProjects();
});

// ==================== //
// Hero Animations
// ==================== //
function initHeroAnimations() {
  if (typeof anime === 'undefined') return;
  
  // Animate hero content
  anime.timeline({
    easing: 'easeOutExpo'
  })
  .add({
    targets: '.hero-title',
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 1000
  })
  .add({
    targets: '.hero-subtitle',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 800
  }, '-=600')
  .add({
    targets: '.tech-badge',
    opacity: [0, 1],
    translateY: [20, 0],
    scale: [0.8, 1],
    duration: 600,
    delay: anime.stagger(100)
  }, '-=400')
  .add({
    targets: '.social-link',
    opacity: [0, 1],
    scale: [0, 1],
    duration: 500,
    delay: anime.stagger(100)
  }, '-=200');
}

// ==================== //
// Skeleton Loader
// ==================== //
function createSkeletonCard() {
  const skeleton = document.createElement('div');
  skeleton.className = 'skeleton-card';
  skeleton.innerHTML = `
    <div class="skeleton-header">
      <div class="skeleton-title"></div>
      <div class="skeleton-icon"></div>
    </div>
    <div class="skeleton-description"></div>
    <div class="skeleton-description"></div>
    <div class="skeleton-stats">
      <div class="skeleton-stat"></div>
      <div class="skeleton-stat"></div>
    </div>
    <div class="skeleton-tags">
      <div class="skeleton-tag"></div>
      <div class="skeleton-tag"></div>
      <div class="skeleton-tag"></div>
    </div>
    <div class="skeleton-footer"></div>
  `;
  return skeleton;
}

function showSkeletonLoaders(container, count = 6) {
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    container.appendChild(createSkeletonCard());
  }
}

// ==================== //
// GitHub API Integration
// ==================== //
async function fetchGitHubProjects() {
  const container = document.getElementById('githubProjects');
  
  // Show skeleton loaders
  showSkeletonLoaders(container, CONFIG.github.maxRepos);
  
  try {
    const response = await fetch(`https://api.github.com/users/${CONFIG.github.username}/repos?sort=updated&per_page=100`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repositories');
    }
    
    const repos = await response.json();
    
    // Filter out forks and sort by stars
    const filteredRepos = repos
      .filter(repo => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, CONFIG.github.maxRepos);
    
    if (filteredRepos.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary);">No repositories found.</p>';
      return;
    }
    
    container.innerHTML = '';
    
    filteredRepos.forEach((repo, index) => {
      const card = createGitHubProjectCard(repo);
      container.appendChild(card);
      
      // Animate card entrance
      if (typeof anime !== 'undefined') {
        anime({
          targets: card,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 600,
          delay: index * 100,
          easing: 'easeOutCubic'
        });
      }
    });
    
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    container.innerHTML = `
      <p style="text-align: center; color: var(--color-text-secondary);">
        Unable to load GitHub projects. Please check the username in the configuration.
      </p>
    `;
  }
}

function createGitHubProjectCard(repo) {
  const card = document.createElement('div');
  card.className = 'project-card fade-in';
  
  const language = repo.language || 'Unknown';
  const languageColor = LANGUAGE_COLORS[language] || '#888888';
  
  // Create topics HTML
  let topicsHTML = '';
  if (repo.topics && repo.topics.length > 0) {
    const displayTopics = repo.topics.slice(0, 5); // Show max 5 topics
    topicsHTML = `
      <div class="project-topics">
        ${displayTopics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
      </div>
    `;
  }
  
  card.innerHTML = `
    <div class="project-header">
      <h3 class="project-title">${repo.name}</h3>
      <svg viewBox="0 0 24 24" fill="currentColor" class="project-icon">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    </div>
    
    <p class="project-description">${repo.description || 'No description provided.'}</p>
    
    <div class="project-stats">
      <div class="project-stat">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
        <span>${window.utils.formatNumber(repo.stargazers_count)}</span>
      </div>
      <div class="project-stat">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
        <span>${window.utils.formatNumber(repo.forks_count)}</span>
      </div>
    </div>
    
    ${topicsHTML}
    
    <div class="project-languages">
      <span class="language-badge">
        <span class="language-dot" style="background-color: ${languageColor};"></span>
        ${language}
      </span>
    </div>
    
    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-link">
      View Repository
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
      </svg>
    </a>
  `;
  
  return card;
}

// ==================== //
// Modrinth API Integration
// ==================== //
async function fetchModrinthProjects() {
  const container = document.getElementById('modrinthProjects');
  
  // Show skeleton loaders
  showSkeletonLoaders(container, CONFIG.modrinth.maxProjects);
  
  try {
    // First, get the user ID from username
    const userResponse = await fetch(`https://api.modrinth.com/v2/user/${CONFIG.modrinth.username}`);
    
    if (!userResponse.ok) {
      throw new Error('Failed to fetch Modrinth user');
    }
    
    const userData = await userResponse.json();
    const userId = userData.id;
    
    // Then fetch user's projects
    const projectsResponse = await fetch(`https://api.modrinth.com/v2/user/${userId}/projects`);
    
    if (!projectsResponse.ok) {
      throw new Error('Failed to fetch Modrinth projects');
    }
    
    const projects = await projectsResponse.json();
    
    // Sort by downloads and limit
    const sortedProjects = projects
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, CONFIG.modrinth.maxProjects);
    
    if (sortedProjects.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary);">No projects found.</p>';
      return;
    }
    
    container.innerHTML = '';
    
    sortedProjects.forEach((project, index) => {
      const card = createModrinthProjectCard(project);
      container.appendChild(card);
      
      // Animate card entrance
      if (typeof anime !== 'undefined') {
        anime({
          targets: card,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 600,
          delay: index * 100,
          easing: 'easeOutCubic'
        });
      }
    });
    
  } catch (error) {
    console.error('Error fetching Modrinth projects:', error);
    container.innerHTML = `
      <p style="text-align: center; color: var(--color-text-secondary);">
        Unable to load Modrinth projects. Please check the username in the configuration.
      </p>
    `;
  }
}

function createModrinthProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card fade-in';
  
  const projectType = project.project_type || 'mod';
  const typeColor = PROJECT_TYPE_COLORS[projectType] || '#10b981';
  
  // Create categories HTML
  let categoriesHTML = '';
  if (project.categories && project.categories.length > 0) {
    const displayCategories = project.categories.slice(0, 5); // Show max 5 categories
    categoriesHTML = `
      <div class="project-topics">
        ${displayCategories.map(cat => `<span class="topic-tag">${cat}</span>`).join('')}
      </div>
    `;
  }
  
  card.innerHTML = `
    <div class="project-header">
      <h3 class="project-title">${project.title}</h3>
      <img src="./resources/images/modrinth.svg" alt="Modrinth" class="project-icon modrinth-icon">
    </div>
    
    <p class="project-description">${project.description || 'No description provided.'}</p>
    
    <div class="project-stats">
      <div class="project-stat">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/>
        </svg>
        <span>${window.utils.formatNumber(project.downloads)}</span>
      </div>
      <div class="project-stat">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <span>${window.utils.formatNumber(project.followers)}</span>
      </div>
    </div>
    
    ${categoriesHTML}
    
    <div class="project-languages">
      <span class="language-badge">
        <span class="language-dot" style="background-color: ${typeColor};"></span>
        ${projectType.charAt(0).toUpperCase() + projectType.slice(1)}
      </span>
    </div>
    
    <a href="https://modrinth.com/${projectType}/${project.slug}" target="_blank" rel="noopener noreferrer" class="project-link">
      View Project
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
      </svg>
    </a>
  `;
  
  return card;
}

// ==================== //
// Section Animations
// ==================== //
if (typeof anime !== 'undefined') {
  // Animate section titles when they come into view
  const sectionTitles = document.querySelectorAll('.section-title');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 800,
          easing: 'easeOutCubic'
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  sectionTitles.forEach(title => {
    title.style.opacity = '0';
    observer.observe(title);
  });
}

// ==================== //
// Timeline Animation
// ==================== //
if (typeof anime !== 'undefined') {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(timelineItems).indexOf(entry.target);
        
        anime({
          targets: entry.target,
          opacity: [0, 1],
          translateX: [-30, 0],
          duration: 600,
          delay: index * 150,
          easing: 'easeOutCubic'
        });
        
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  timelineItems.forEach(item => {
    item.style.opacity = '0';
    timelineObserver.observe(item);
  });
}

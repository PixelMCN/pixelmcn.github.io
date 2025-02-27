function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Start from random position at top of screen
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = '-20px';
    
    // Random size between 2px and 4px
    const size = Math.random() * 2 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random delay for natural effect
    const delay = Math.random() * 5;
    particle.style.animation = `snowfall 10s ${delay}s infinite linear`;
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 15000);
}

function initParticles() {
    // Create initial particles
    for (let i = 0; i < 50; i++) {
        createParticle();
    }
    
    // Create new particles periodically
    setInterval(createParticle, 200);
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', initParticles);
// This file contains JavaScript code for interactive elements on the website

// Function to handle navigation
function navigateTo(page) {
    window.location.href = page;
}

// Function to showcase projects
function showcaseProjects() {
    const projects = [
        {
            title: "Minecraft Mod",
            description: "A mod that adds new features to Minecraft.",
            link: "https://github.com/yourusername/minecraft-mod"
        },
        {
            title: "Minecraft Server",
            description: "A custom Minecraft server with unique gameplay.",
            link: "https://yourminecraftserver.com"
        }
    ];

    const projectsContainer = document.getElementById('projects-container');
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project';
        projectElement.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank">View Project</a>
        `;
        projectsContainer.appendChild(projectElement);
    });
}

// Initialize functions on page load
window.onload = function() {
    showcaseProjects();
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
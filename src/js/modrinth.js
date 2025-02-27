async function fetchModrinthProjects() {
    const username = 'Pixelis0P';
    const downloadsGrid = document.querySelector('.downloads-grid');

    try {
        const response = await fetch(`https://api.modrinth.com/v2/user/${username}/projects`);
        const projects = await response.json();

        // Sort projects alphabetically by title
        projects.sort((a, b) => a.title.localeCompare(b.title));

        projects.forEach(project => {
            const downloads = project.downloads.toLocaleString();
            const tags = project.categories
                .map(tag => `<span class="mod-tag">${tag}</span>`)
                .join('');
            
            const card = `
                <div class="mod-card" data-aos="fade-up">
                    <img src="${project.icon_url}" alt="${project.title}" class="mod-image">
                    <div class="mod-info">
                        <div class="mod-content">
                            <div class="mod-header">
                                <h3 class="mod-title">${project.title}</h3>
                            </div>
                            <div class="mod-stats">
                                <span>⬇️ ${downloads} Downloads</span>
                                <span>📦 ${project.versions_count} Versions</span>
                            </div>
                            <div class="mod-tags">
                                ${tags}
                            </div>
                            <p class="mod-description">${project.description}</p>
                        </div>
                        <a href="https://modrinth.com/${project.project_type}/${project.slug}" 
                           class="download-btn" target="_blank">
                            Download
                        </a>
                    </div>
                </div>
            `;
            downloadsGrid.insertAdjacentHTML('beforeend', card);
        });
    } catch (error) {
        console.error('Error fetching Modrinth projects:', error);
        downloadsGrid.innerHTML = '<p>Failed to load projects. Please try again later.</p>';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', fetchModrinthProjects);
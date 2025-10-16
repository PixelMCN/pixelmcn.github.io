# PixelMCN Portfolio Website

A modern, AMOLED dark-themed two-page portfolio website built with HTML, CSS, and JavaScript. Features automatic GitHub and Modrinth project integration, smooth animations with AnimeJS, and full mobile responsiveness.

## 🌟 Features

### Home Page
- **Hero Section** with gradient overlay and animated content
- **Tech Stack** display with interactive badges
- **Social Links** (Discord, GitHub, Bluesky) with SVG icons
- **Featured Projects** section with two categories:
  - **GitHub Projects**: Automatically fetches and displays repositories with stars, forks, and language badges
  - **Modrinth Projects**: Displays mods/modpacks with downloads and followers
- **About Me** section featuring:
  - Interactive timeline of coding journey
  - Personal description
  - Current status card
- Smooth scroll animations and element reveals using AnimeJS

### Docs Page
- **GitBook-style layout** with multi-layered sidebar navigation
- **Searchable documentation** with real-time filtering
- **Table of Contents** that updates based on current section
- **Code blocks** with syntax highlighting and copy functionality
- **Info and warning boxes** for important notes
- **Scroll spy** navigation that highlights current section
- **Keyboard shortcuts** (Ctrl/Cmd + K for search, Escape to close sidebar)

### Shared Features
- **Fixed navbar** with scroll effects and mobile hamburger menu
- **Page transitions** between Home and Docs pages
- **Footer** with quick links and social connections
- **Fully responsive** design for all screen sizes
- **AMOLED dark theme** with blue, green, and pure black color palette
- **Outfit font** from Google Fonts

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- A code editor (VS Code recommended)
- Git (optional, for version control)

### Installation

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/pixelmcn/pixelmcn.github.io.git
   cd pixelmcn.github.io
   ```

2. **Configure your usernames**
   
   Open `js/home.js` and update the configuration:
   ```javascript
   const CONFIG = {
     github: {
       username: 'your-github-username', // Change this
       maxRepos: 6
     },
     modrinth: {
       username: 'your-modrinth-username', // Change this
       maxProjects: 6
     }
   };
   ```

3. **Update social links**
   
   In both `index.html` and `docs.html`, update the social links in the hero section and footer:
   ```html
   <a href="https://discord.com/users/YOUR_ID" target="_blank">Discord</a>
   <a href="https://github.com/YOUR_USERNAME" target="_blank">GitHub</a>
   <a href="https://bsky.app/profile/YOUR_HANDLE" target="_blank">Bluesky</a>
   ```

4. **Customize content**
   
   - Update the hero section with your name and tech stack
   - Modify the timeline in the About Me section
   - Edit the documentation content in `docs.html`

5. **Open in browser**
   
   Simply open `index.html` in your web browser, or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

## 📁 Project Structure

```
pixelmcn.github.io/
├── index.html          # Home page
├── docs.html           # Documentation page
├── css/
│   ├── global.css      # Shared styles (navbar, footer, utilities)
│   ├── home.css        # Home page specific styles
│   └── docs.css        # Docs page specific styles
├── js/
│   ├── global.js       # Shared JavaScript (navbar, transitions, animations)
│   ├── home.js         # Home page logic (GitHub/Modrinth API)
│   └── docs.js         # Docs page logic (sidebar, search, TOC)
└── README.md           # This file
```

## 🎨 Customization

### Colors
Edit the CSS variables in `css/global.css`:
```css
:root {
  --color-primary: #3b82f6;      /* Blue */
  --color-secondary: #10b981;    /* Green */
  --color-background: #000000;   /* Pure black */
  /* ... more colors */
}
```

### Fonts
The website uses the Outfit font from Google Fonts. To change it, update the `<link>` tag in the HTML files and the `font-family` in `css/global.css`.

### Animation Speed
Adjust animation durations in `js/global.js` and page-specific JS files:
```javascript
anime({
  duration: 800, // Change this value (in milliseconds)
  easing: 'easeOutCubic'
});
```

## 🔧 API Integration

### GitHub API
The website uses the GitHub REST API to fetch repositories. No authentication is required for public repositories, but you're limited to 60 requests per hour per IP address.

### Modrinth API
The Modrinth API v2 is used to fetch projects. No API key is required for basic usage.

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio! If you find bugs or have suggestions, please open an issue.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

- Design inspiration from [MazecraftMC](https://github.com/MazecraftMC/MazecraftMC.github.io)
- Animations powered by [AnimeJS](https://animejs.com/)
- Icons are inline SVG from various sources
- Font: [Outfit](https://fonts.google.com/specimen/Outfit) by Google Fonts

## 📞 Contact

- GitHub: [@pixelmcn](https://github.com/pixelmcn)
- Discord: [Your Discord]
- Bluesky: [Your Bluesky]

---

Made with ❤️ by PixelMCN
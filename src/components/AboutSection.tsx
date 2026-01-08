import React from 'react';

interface AboutSectionProps {
  darkMode: boolean;
  aboutRef: React.RefObject<HTMLDivElement>;
}

const AboutSection: React.FC<AboutSectionProps> = ({ darkMode, aboutRef }) => {
  const skills = [
    { name: 'JavaScript', icon: '/icons/javascript.svg' },
    { name: 'TypeScript', icon: '/icons/typescript.svg' },
    { name: 'Python', icon: '/icons/python.svg' },
    { name: 'PHP', icon: '/icons/php.svg' },
    { name: 'React', icon: '/icons/react.svg' },
    { name: 'Next.js', icon: '/icons/nextdotjs.svg' },
    { name: 'Vue', icon: '/icons/vuedotjs.svg' },
    { name: 'Vite', icon: '/icons/vite.svg' },
    { name: 'Discord.js', icon: '/icons/discorddotjs.svg' },
    { name: 'Tailwind', icon: '/icons/tailwindcss.svg' },
    { name: 'Git', icon: '/icons/git.svg' },
    { name: 'Node.js', icon: '/icons/nodedotjs.svg' },
    { name: 'HTML', icon: '/icons/html5.svg' },
    { name: 'CSS', icon: '/icons/css.svg' },
    { name: 'Go', icon: '/icons/go.svg' }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative z-10" ref={aboutRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className={`text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r ${darkMode ? 'from-purple-300 to-pink-300' : 'from-purple-600 to-pink-600'} bg-clip-text text-transparent`}>
            About Me
          </h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-lg`}>Student developer passionate about code</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className={`about-card ${darkMode ? 'bg-slate-900/30 border-purple-500/20' : 'bg-white/50 border-purple-300/30'} backdrop-blur-sm border rounded-2xl p-8 relative overflow-hidden transition-colors duration-300`}>
            <div className={`absolute top-0 right-0 w-32 h-32 ${darkMode ? 'bg-purple-500/10' : 'bg-purple-400/20'} rounded-full blur-2xl`}></div>
            <div className="relative z-10">
              <h4 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>Background</h4>
              <div className={`space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                <p>
                  I'm a student developer passionate about exploring different coding environments
                  and building projects across various platforms.
                </p>
                <p>
                  My journey includes creating Discord bots, developing Minecraft plugins for both
                  Bedrock and Java editions, building mods for Fabric, and crafting modern web
                  applications.
                </p>
                <p>
                  I also run <strong className={`${darkMode ? 'text-purple-400' : 'text-purple-600'} font-semibold`}>MazecraftMC Network</strong>, a
                  Minecraft server where I apply my development skills to create unique gameplay
                  experiences.
                </p>
              </div>
            </div>
          </div>

          <div className={`about-card ${darkMode ? 'bg-slate-900/30 border-purple-500/20' : 'bg-white/50 border-purple-300/30'} backdrop-blur-sm border rounded-2xl p-8 relative overflow-hidden transition-colors duration-300`}>
            <div className={`absolute top-0 left-0 w-32 h-32 ${darkMode ? 'bg-pink-500/10' : 'bg-pink-400/20'} rounded-full blur-2xl`}></div>
            <div className="relative z-10">
              <h4 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-pink-300' : 'text-pink-700'}`}>Philosophy</h4>
              <div className={`space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                <p>
                  I believe in learning by doing. Every project is an opportunity to explore new
                  technologies and push the boundaries of what I can create.
                </p>
                <p>
                  From game development to web applications, I enjoy the challenge of working
                  across different languages and frameworks, constantly expanding my skill set.
                </p>
                <p className={`${darkMode ? 'text-purple-300' : 'text-purple-700'} font-medium italic`}>
                  Always learning, always building, always exploring new technologies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Infinite Marquee for Skills */}
        <div className="mt-12">
          <div className={`text-center mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm uppercase tracking-widest font-semibold`}>
            Technologies & Tools
          </div>
          
          {/* First Marquee */}
          <div className="relative overflow-hidden py-6 mb-3">
            {/* Enhanced gradient masks */}
            <div className={`absolute left-0 top-0 bottom-0 w-32 ${darkMode ? 'bg-gradient-to-r from-slate-950 to-transparent' : 'bg-gradient-to-r from-gray-50 to-transparent'} z-10 pointer-events-none`}></div>
            <div className={`absolute right-0 top-0 bottom-0 w-32 ${darkMode ? 'bg-gradient-to-l from-slate-950 to-transparent' : 'bg-gradient-to-l from-gray-50 to-transparent'} z-10 pointer-events-none`}></div>
            
            {/* Marquee content */}
            <div className="flex animate-marquee whitespace-nowrap">
              {[...skills, ...skills].map((skill, index) => (
                <div key={index} className="inline-flex items-center gap-3 mx-8">
                  <img src={skill.icon} alt={skill.name} className="w-6 h-6 opacity-60" />
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} font-medium text-base`}>
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
import React from 'react';

interface AboutSectionProps {
  darkMode: boolean;
  aboutRef: React.RefObject<HTMLDivElement>;
}

const AboutSection: React.FC<AboutSectionProps> = ({ darkMode, aboutRef }) => {
  const skills = [
    { name: 'JavaScript', icon: '/new/javascript.svg' },
    { name: 'TypeScript', icon: '/new/typescript.svg' },
    { name: 'Python', icon: '/new/python.svg' },
    { name: 'PHP', icon: '/new/php.png' },
    { name: 'Java', icon: '/new/java.png' },
    { name: 'React', icon: '/new/react.png' },
    { name: 'Next.js', icon: '/new/nextjs.png' },
    { name: 'Vue', icon: '/new/vuejs.png' },
    { name: 'Vite', icon: '/new/vite.png' },
    { name: 'Discord.js', icon: '/new/discordjs.png' },
    { name: 'Tailwind', icon: '/new/tailwindcss.svg' },
    { name: 'Git', icon: '/new/git.svg' },
    { name: 'Node.js', icon: '/new/nodejs.png' },
    { name: 'HTML', icon: '/new/html.svg' },
    { name: 'CSS', icon: '/new/css.svg' },
    { name: 'Go', icon: '/new/go.svg' }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10" ref={aboutRef}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12 sm:mb-16">
          <h3 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r ${
            darkMode ? 'from-purple-300 to-pink-300' : 'from-purple-600 to-pink-600'
          } bg-clip-text text-transparent leading-tight`}>
            About Me
          </h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-base md:text-lg px-4`}>
            Student developer passionate about code
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 px-2">
          <div className={`about-card ${
            darkMode ? 'bg-slate-900/30 border-purple-500/20' : 'bg-white/50 border-purple-300/30'
          } backdrop-blur-sm border rounded-xl sm:rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-colors duration-300`}>
            <div className={`absolute top-0 right-0 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 ${
              darkMode ? 'bg-purple-500/10' : 'bg-purple-400/20'
            } rounded-full blur-2xl`}></div>
            <div className="relative z-10">
              <h4 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${
                darkMode ? 'text-purple-300' : 'text-purple-700'
              }`}>Background</h4>
              <div className={`space-y-3 sm:space-y-4 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              } leading-relaxed text-sm sm:text-base`}>
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
                  I also run <strong className={`${
                    darkMode ? 'text-purple-400' : 'text-purple-600'
                  } font-semibold`}>MazecraftMC Network</strong>, a
                  Minecraft server where I apply my development skills to create unique gameplay
                  experiences.
                </p>
              </div>
            </div>
          </div>

          <div className={`about-card ${
            darkMode ? 'bg-slate-900/30 border-purple-500/20' : 'bg-white/50 border-purple-300/30'
          } backdrop-blur-sm border rounded-xl sm:rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-colors duration-300`}>
            <div className={`absolute top-0 left-0 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 ${
              darkMode ? 'bg-pink-500/10' : 'bg-pink-400/20'
            } rounded-full blur-2xl`}></div>
            <div className="relative z-10">
              <h4 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${
                darkMode ? 'text-pink-300' : 'text-pink-700'
              }`}>Philosophy</h4>
              <div className={`space-y-3 sm:space-y-4 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              } leading-relaxed text-sm sm:text-base`}>
                <p>
                  I believe in learning by doing. Every project is an opportunity to explore new
                  technologies and push the boundaries of what I can create.
                </p>
                <p>
                  From game development to web applications, I enjoy the challenge of working
                  across different languages and frameworks, constantly expanding my skill set.
                </p>
                <p className={`${
                  darkMode ? 'text-purple-300' : 'text-purple-700'
                } font-medium italic`}>
                  Always learning, always building, always exploring new technologies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Infinite Marquee for Skills */}
        <div className="mt-8 sm:mt-12 px-2">
          <div className={`text-center mb-6 sm:mb-8 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          } text-xs sm:text-sm uppercase tracking-widest font-semibold`}>
            Technologies & Tools
          </div>
          
          {/* First Marquee */}
          <div className="relative overflow-hidden py-4 sm:py-6 mb-2 sm:mb-3">
            {/* Enhanced gradient masks */}
            <div className={`absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 ${
              darkMode ? 'bg-gradient-to-r from-slate-950 to-transparent' : 'bg-gradient-to-r from-gray-50 to-transparent'
            } z-10 pointer-events-none`}></div>
            <div className={`absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 ${
              darkMode ? 'bg-gradient-to-l from-slate-950 to-transparent' : 'bg-gradient-to-l from-gray-50 to-transparent'
            } z-10 pointer-events-none`}></div>
            
            {/* Marquee content */}
            <div className="flex animate-marquee whitespace-nowrap">
              {[...skills, ...skills].map((skill, index) => (
                <div key={index} className="inline-flex items-center gap-2 sm:gap-3 mx-4 sm:mx-6 md:mx-8">
                  <img src={skill.icon} alt={skill.name} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 opacity-60" />
                  <span className={`${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  } font-medium text-xs sm:text-sm md:text-base`}>
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
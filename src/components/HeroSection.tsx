import React from 'react';
import {  Github, Code2, Server, ExternalLink } from 'lucide-react';

interface HeroSectionProps {
  darkMode: boolean;
  heroRef: React.RefObject<HTMLDivElement>;
  socialsRef: React.RefObject<HTMLDivElement>;
}

const HeroSection: React.FC<HeroSectionProps> = ({ darkMode, heroRef, socialsRef }) => {
  const socials = [
    { name: 'GitHub - PixelMCN', url: 'https://github.com/PixelMCN', icon: Github },
    { name: 'GitHub - MazecraftMC', url: 'https://github.com/MazecraftMC', icon: Github },
    { name: 'Modrinth', url: 'https://modrinth.com/user/Pixelis0P', icon: Code2 },
    { name: 'MazecraftMC Network', url: 'https://mazecraftmc.fun', icon: Server }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative z-10" ref={heroRef}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
            <span className={`bg-gradient-to-r ${darkMode ? 'from-purple-400 via-pink-400 to-purple-400' : 'from-purple-600 via-pink-600 to-purple-600'} bg-clip-text text-transparent inline-block`}>
              Student Developer
            </span>
          </h2>
          <p className={`text-2xl md:text-3xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4 font-light`}>
            Exploring Multiple Coding Environments
          </p>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Building Discord bots, Minecraft plugins & mods, and modern web applications
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4" ref={socialsRef}>
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center gap-3 px-6 py-3 ${darkMode ? 'bg-slate-900/50 hover:bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40' : 'bg-white/50 hover:bg-white/70 border-purple-300/30 hover:border-purple-400/50'} rounded-xl border transition-all hover:shadow-lg ${darkMode ? 'hover:shadow-purple-500/20' : 'hover:shadow-purple-400/30'} hover:-translate-y-1`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${darkMode ? 'from-purple-500/10 to-pink-500/10' : 'from-purple-400/10 to-pink-400/10'} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <Icon className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'} relative z-10`} />
                <span className={`${darkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'} transition-colors relative z-10`}>
                  {social.name}
                </span>
                <ExternalLink className={`w-4 h-4 ${darkMode ? 'text-gray-500 group-hover:text-purple-400' : 'text-gray-400 group-hover:text-purple-600'} transition-colors relative z-10`} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
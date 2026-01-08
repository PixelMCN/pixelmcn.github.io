import React, { useState } from 'react';
import { Github, Globe, Mail, MessageCircle, ArrowUpRight } from 'lucide-react';

interface ContactSectionProps {
  darkMode: boolean;
  contactRef: React.RefObject<HTMLDivElement>;
}

const ContactSection: React.FC<ContactSectionProps> = ({ darkMode, contactRef }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const contactCards = [
    {
      id: 'github',
      title: 'GitHub',
      description: 'Explore my projects and contributions',
      icon: Github,
      href: 'https://github.com/PixelMCN',
      gradient: 'from-purple-600 to-violet-600',
      darkGradient: 'from-purple-500 to-violet-500',
    },
    {
      id: 'mazecraft',
      title: 'MazecraftMC',
      description: 'Visit the Minecraft network',
      icon: Globe,
      href: 'https://mazecraftmc.fun',
      gradient: 'from-pink-600 to-rose-600',
      darkGradient: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative z-10" ref={contactRef}>
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${darkMode ? 'bg-purple-500/10' : 'bg-purple-400/15'} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '4s' }}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${darkMode ? 'bg-pink-500/10' : 'bg-pink-400/15'} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-[fade-in_0.8s_ease-out]">
          <div className="inline-flex items-center gap-2 mb-4">
            <MessageCircle className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <span className={`text-sm font-semibold uppercase tracking-wider ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
              Let's Connect
            </span>
          </div>
          <h3 className={`text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r ${darkMode ? 'from-purple-300 via-pink-300 to-purple-300' : 'from-purple-600 via-pink-600 to-purple-600'} bg-clip-text text-transparent leading-tight`}>
            Get In Touch
          </h3>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-xl leading-relaxed max-w-2xl mx-auto`}>
            Have a project in mind or just want to chat? I'm always open to discussing new opportunities and collaborations.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {contactCards.map((card, index) => {
            const Icon = card.icon;
            
            return (
              <a
                key={card.id}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${
                  darkMode 
                    ? 'bg-slate-900/50 border-slate-700/50 hover:border-purple-500/50' 
                    : 'bg-white/70 border-gray-200 hover:border-purple-400/50'
                } border backdrop-blur-sm hover:-translate-y-2 hover:shadow-2xl ${
                  darkMode ? 'hover:shadow-purple-500/20' : 'hover:shadow-purple-300/30'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${darkMode ? card.darkGradient : card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Animated corner accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${darkMode ? card.darkGradient : card.gradient} opacity-10 rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500`}></div>

                <div className="relative p-8 flex items-start gap-6">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${darkMode ? card.darkGradient : card.gradient} p-0.5 group-hover:scale-110 transition-transform duration-500`}>
                    <div className={`w-full h-full rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'} flex items-center justify-center`}>
                      <Icon className={`w-7 h-7 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {card.title}
                      </h4>
                      <ArrowUpRight className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'} transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300`} />
                    </div>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Bottom shine effect */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${darkMode ? card.darkGradient : card.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
              </a>
            );
          })}
        </div>

        {/* Additional CTA */}
        <div className={`text-center p-8 rounded-2xl ${darkMode ? 'bg-slate-900/30 border-slate-700/50' : 'bg-white/50 border-gray-200'} border backdrop-blur-sm`}>
          <Mail className={`w-8 h-8 mx-auto mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-lg mb-2`}>
            Prefer email?
          </p>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
            Feel free to reach out through any of my social platforms above, or check out my projects on GitHub and Modrinth!
          </p>
        </div>
      </div>

      {/* Remove the style jsx block */}
    </section>
  );
};

export default ContactSection;
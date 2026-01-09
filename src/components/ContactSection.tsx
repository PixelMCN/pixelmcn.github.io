import { Github, Globe, Mail, MessageCircle, ArrowUpRight } from 'lucide-react';

interface ContactSectionProps {
  darkMode: boolean;
  contactRef: React.RefObject<HTMLDivElement>;
}

const ContactSection: React.FC<ContactSectionProps> = ({ darkMode, contactRef }) => {
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
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10" ref={contactRef}>
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 ${
          darkMode ? 'bg-purple-500/10' : 'bg-purple-400/15'
        } rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '4s' }}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 ${
          darkMode ? 'bg-pink-500/10' : 'bg-pink-400/15'
        } rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 px-2">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 animate-[fade-in_0.8s_ease-out] px-2">
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <MessageCircle className={`w-5 h-5 sm:w-6 sm:h-6 ${
              darkMode ? 'text-purple-400' : 'text-purple-600'
            }`} />
            <span className={`text-xs sm:text-sm font-semibold uppercase tracking-wider ${
              darkMode ? 'text-purple-400' : 'text-purple-600'
            }`}>
              Let's Connect
            </span>
          </div>
          <h3 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 bg-gradient-to-r ${
            darkMode ? 'from-purple-300 via-pink-300 to-purple-300' : 'from-purple-600 via-pink-600 to-purple-600'
          } bg-clip-text text-transparent leading-tight`}>
            Get In Touch
          </h3>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm sm:text-base md:text-xl leading-relaxed max-w-2xl mx-auto px-4`}>
            Have a project in mind or just want to chat? I'm always open to discussing new opportunities and collaborations.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 px-2">
          {contactCards.map((card, index) => {
            const Icon = card.icon;
            
            return (
              <a
                key={card.id}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-500 ${
                  darkMode 
                    ? 'bg-slate-900/50 border-slate-700/50 hover:border-purple-500/50' 
                    : 'bg-white/70 border-gray-200 hover:border-purple-400/50'
                } border backdrop-blur-sm hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-2xl ${
                  darkMode ? 'hover:shadow-purple-500/20' : 'hover:shadow-purple-300/30'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
                // Add touch-friendly attributes
                aria-label={`Contact via ${card.title}`}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  darkMode ? card.darkGradient : card.gradient
                } opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Animated corner accent */}
                <div className={`absolute top-0 right-0 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 bg-gradient-to-br ${
                  darkMode ? card.darkGradient : card.gradient
                } opacity-10 rounded-bl-full transform translate-x-12 -translate-y-12 sm:translate-x-16 sm:-translate-y-16 group-hover:translate-x-4 group-hover:-translate-y-4 sm:group-hover:translate-x-8 sm:group-hover:-translate-y-8 transition-transform duration-500`}></div>

                <div className="relative p-5 sm:p-6 md:p-8 flex items-start gap-3 sm:gap-4 md:gap-6">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-gradient-to-br ${
                    darkMode ? card.darkGradient : card.gradient
                  } p-0.5 group-hover:scale-110 transition-transform duration-500 touch-manipulation`}>
                    <div className={`w-full h-full rounded-lg md:rounded-xl ${
                      darkMode ? 'bg-slate-900' : 'bg-white'
                    } flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${
                        darkMode ? 'text-purple-400' : 'text-purple-600'
                      }`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <h4 className={`text-lg sm:text-xl md:text-2xl font-bold ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      } truncate`}>
                        {card.title}
                      </h4>
                      <ArrowUpRight className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      } transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 flex-shrink-0`} />
                    </div>
                    <p className={`${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    } text-xs sm:text-sm leading-relaxed`}>
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Bottom shine effect */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
                  darkMode ? card.darkGradient : card.gradient
                } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
              </a>
            );
          })}
        </div>

        {/* Additional CTA */}
        <div className={`text-center p-6 sm:p-8 rounded-xl sm:rounded-2xl ${
          darkMode ? 'bg-slate-900/30 border-slate-700/50' : 'bg-white/50 border-gray-200'
        } border backdrop-blur-sm mx-2`}>
          <Mail className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-3 sm:mb-4 ${
            darkMode ? 'text-purple-400' : 'text-purple-600'
          }`} />
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-base sm:text-lg mb-2`}>
            Prefer email?
          </p>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-xs sm:text-sm leading-relaxed px-2`}>
            Feel free to reach out through any of my social platforms above, or check out my projects on GitHub and Modrinth!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
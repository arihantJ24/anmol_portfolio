import React from 'react';
import { RESUME_DATA } from '../constants';
import { ArrowUpRight, Twitter, BookOpen, LayoutGrid, FileText, Send } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Portfolio: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  // Helper to get icon by type
  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'telegram': return <Send className="w-4 h-4" />;
      default: return <ArrowUpRight className="w-4 h-4" />;
    }
  };

  return (
    <section ref={ref} className={`reveal-section ${isVisible ? 'is-visible' : ''}`}>
      
      {/* Projects Gallery - Featured Grid */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg">
                <LayoutGrid className="w-6 h-6 text-accent-cyan" />
            </div>
            <h3 className="text-3xl font-bold text-white">Project Gallery</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {RESUME_DATA.portfolio.map((project, index) => {
              const mainLink = project.links[0]?.url;
              const isEven = index % 2 === 0;
              
              return (
                <div 
                    key={index} 
                    className="group bg-[#0a0a0a] rounded-2xl border border-neutral-800 overflow-hidden shadow-lg hover:shadow-cyan-500/10 hover:border-neutral-700 transition-all duration-500 flex flex-col relative"
                >
                    {/* Visual Header - Dark Abstract */}
                    <a 
                      href={mainLink}
                      target="_blank" 
                      rel="noreferrer"
                      className="block h-48 w-full bg-neutral-900 relative overflow-hidden p-6 flex items-center justify-center cursor-pointer"
                    >
                        {/* Glow Blob */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-[60px] opacity-20 ${isEven ? 'bg-cyan-500' : 'bg-fuchsia-500'} animate-pulse-slow`}></div>
                        
                        {/* Dark Abstract UI */}
                        <div className="relative z-10 bg-[#050505] border border-neutral-800 rounded-xl p-4 w-4/5 h-4/5 transform group-hover:scale-[1.03] group-hover:-rotate-1 transition-transform duration-500 flex flex-col gap-3 shadow-2xl">
                            <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                                <div className={`h-full w-1/3 ${isEven ? 'bg-cyan-500' : 'bg-fuchsia-500'}`}></div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-8 h-8 rounded-lg bg-neutral-800"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="w-3/4 h-2 bg-neutral-800 rounded-full"></div>
                                    <div className="w-1/2 h-2 bg-neutral-900 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </a>

                    {/* Content Body */}
                    <div className="p-6 flex flex-col flex-grow relative z-20 bg-[#0a0a0a]">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 border border-neutral-800">
                                    <LayoutGrid className="w-4 h-4" />
                                </div>
                                {/* Title */}
                                <a 
                                    href={mainLink} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="text-xl font-bold text-white transition-colors hover:text-accent-cyan"
                                >
                                    {project.title}
                                </a>
                            </div>
                            {/* Animated Links Buttons */}
                            <div className="flex gap-2 relative z-30">
                                 {project.links.map((link, i) => (
                                     <a 
                                        key={i} 
                                        href={link.url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className={`
                                            flex items-center justify-center w-9 h-9 rounded-full bg-neutral-900 text-neutral-500 border border-neutral-800
                                            transition-all duration-300 transform ease-out
                                            hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]
                                            hover:text-white hover:border-neutral-600
                                        `}
                                        aria-label={link.label}
                                        title={link.label}
                                     >
                                         {getLinkIcon(link.type)}
                                     </a>
                                 ))}
                            </div>
                        </div>
                        
                        <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                            {project.description}
                        </p>

                        {/* Featured Tweets / Content */}
                        {project.featuredContent && project.featuredContent.length > 0 && (
                            <div className="mb-6">
                                <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider mb-2">Featured Posts</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.featuredContent.slice(0, 4).map((url, i) => (
                                        <a 
                                            key={i}
                                            href={url}
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="
                                                flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-neutral-800
                                                bg-neutral-900 text-neutral-400 transition-all duration-300
                                                hover:bg-neutral-800 hover:text-white hover:border-neutral-700 hover:scale-105
                                            "
                                        >
                                            <Twitter className="w-3 h-3 text-blue-400" />
                                            <span>Post {i + 1}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-auto pt-4 border-t border-neutral-900 flex flex-wrap gap-2">
                            {project.stats.map((stat, i) => (
                                <span key={i} className="text-xs font-medium bg-neutral-900 text-neutral-500 px-2.5 py-1 rounded-md border border-neutral-800">
                                    {stat}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Research & Articles - Masonry Layout */}
      <div>
        <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg">
                <FileText className="w-6 h-6 text-accent-fuchsia" />
            </div>
            <h3 className="text-3xl font-bold text-white">Research & Articles</h3>
        </div>

        <div className="columns-1 md:columns-2 gap-6 space-y-6">
            {RESUME_DATA.publications.map((pub, index) => (
                <a 
                    key={index}
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        block break-inside-avoid
                        group bg-[#0a0a0a] rounded-2xl border border-neutral-800 p-6 
                        hover:border-neutral-700 hover:shadow-2xl hover:shadow-fuchsia-900/10 
                        hover:-translate-y-1 hover:scale-[1.01]
                        transition-all duration-300
                        relative overflow-hidden
                        z-0
                    "
                >
                    {/* Decorative background blob on hover */}
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-fuchsia-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl z-0"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start gap-4 mb-3">
                            <div className="shrink-0 w-10 h-10 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center text-fuchsia-500 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            {/* External Link Icon Animation */}
                            <div className="
                                flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-500 
                                transition-all duration-300 ease-out
                                group-hover:text-white group-hover:border-neutral-600
                                group-hover:scale-110 group-hover:rotate-45
                            ">
                                 <ArrowUpRight className="w-4 h-4" />
                            </div>
                        </div>
                        
                        <h4 className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors leading-snug mb-2">
                            {pub.title}
                        </h4>
                        
                        <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                            <span className="bg-neutral-900 px-2 py-1 rounded-md border border-neutral-800 group-hover:border-neutral-700 transition-colors">
                                {pub.platform}
                            </span>
                            <span>•</span>
                            <span>Read Analysis</span>
                        </div>
                    </div>
                </a>
            ))}
        </div>
        
        {/* Footer Action */}
        <div className="mt-12 text-center">
             <p className="text-neutral-500 text-sm mb-4">Curious to read more?</p>
             <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 border border-neutral-700 text-white rounded-full font-medium hover:bg-neutral-700 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-105">
                 View Full Archive
                 <ArrowUpRight className="w-4 h-4" />
             </a>
        </div>
      </div>

    </section>
  );
};

export default Portfolio;
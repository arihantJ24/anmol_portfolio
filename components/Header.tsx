import React from 'react';
import { Twitter, MapPin, Linkedin } from 'lucide-react';
import { RESUME_DATA } from '../constants';

const Header: React.FC = () => {
  const { name, contact } = RESUME_DATA;

  return (
    <header className="space-y-8">
      {/* Avatar & Bio Badge */}
      <div className="flex items-center gap-5">
        {/* Avatar with Glow */}
        <div className="relative group shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden bg-neutral-900 border-2 border-neutral-800 shadow-2xl">
            <img 
              src="https://avatar.iran.liara.run/public/boy?username=Anmol" 
              alt={name} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        {/* Side Text */}
        <div className="text-sm text-neutral-400 font-medium leading-relaxed max-w-[200px] border-l-2 border-neutral-800 pl-4">
          <span className="text-white font-bold">4 years</span> of Web3 expertise across content, social media, and community-driven growth
        </div>
      </div>

      {/* Intro */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
          Hey there! <br />
          I am <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{name.split(' ')[0]}</span>
        </h1>
        <div className="flex items-center gap-2 text-neutral-400 font-medium mt-4">
            <MapPin className="w-4 h-4 text-accent-cyan" />
            {contact.location}
        </div>
      </div>

      {/* Social Buttons - Dark Theme */}
      <div className="flex flex-wrap gap-3">
        <a 
          href="https://x.com/Anmol562002"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-blue-500/50 text-white font-medium transition-all hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] group"
        >
          <Twitter className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
          Twitter
        </a>
        <a 
          href="https://www.linkedin.com/in/anmoljain8494848/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-blue-500/50 text-white font-medium transition-all hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] group"
        >
          <Linkedin className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
          LinkedIn
        </a>
      </div>
    </header>
  );
};

export default Header;
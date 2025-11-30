
import React from 'react';
import Header from './components/Header';
import Summary from './components/Summary';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Portfolio from './components/Portfolio';
import Contributions from './components/Contributions';
import GeminiChat from './components/GeminiChat';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] p-6 md:p-12 lg:p-16 text-gray-200">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column: Fixed Sidebar feel on Desktop */}
          <div className="lg:col-span-4 space-y-12">
            <div className="lg:sticky lg:top-16 space-y-12">
              <Header />
              <Summary />
              <Skills />
              <Contributions />
              <Education />
              
              <div className="pt-8 border-t border-neutral-800 text-xs text-neutral-500">
                © {new Date().getFullYear()} Anmol Jain
              </div>
            </div>
          </div>

          {/* Right Column: Scrollable Content (Gallery) */}
          <main className="lg:col-span-8 space-y-20">
            <Portfolio />
            <Experience />
          </main>
        </div>

      </div>
      <GeminiChat />
    </div>
  );
};

export default App;

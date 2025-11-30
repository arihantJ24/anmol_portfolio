import React from 'react';
import { RESUME_DATA } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Summary: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={ref}
      className={`space-y-4 reveal-section ${isVisible ? 'is-visible' : ''}`}
    >
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-fuchsia">
        {RESUME_DATA.role}
      </h2>
      <p className="text-neutral-400 leading-relaxed text-lg border-l-2 border-neutral-800 pl-4">
        {RESUME_DATA.summary}
      </p>
    </section>
  );
};

export default Summary;
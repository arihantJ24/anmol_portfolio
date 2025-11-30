import React from 'react';
import { RESUME_DATA } from '../constants';

const Skills: React.FC = () => {
  return (
    <section className="space-y-4">
       <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider">Skills</h3>
       <div className="flex flex-wrap gap-2">
          {RESUME_DATA.skills.map((skill, index) => (
            <span 
                key={index}
                className="px-3 py-1.5 rounded-lg bg-neutral-900 text-neutral-300 text-sm font-medium border border-neutral-800 hover:border-neutral-600 hover:text-white transition-all cursor-default"
            >
                {skill}
            </span>
          ))}
       </div>
    </section>
  );
};

export default Skills;
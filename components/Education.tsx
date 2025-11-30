import React from 'react';
import { RESUME_DATA } from '../constants';
import { Award } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <section className="space-y-6">
      <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider">Education & Certs</h3>
      
      <div className="space-y-6">
        {RESUME_DATA.education.map((edu, idx) => (
            <div key={idx}>
                <h4 className="font-bold text-white text-lg">{edu.degree}</h4>
                <p className="text-neutral-400 text-sm">{edu.institution}</p>
                <p className="text-neutral-600 text-xs mt-1">{edu.period}</p>
            </div>
        ))}
        
        <div className="pt-4 border-t border-neutral-800">
            <div className="flex flex-wrap gap-2">
                {RESUME_DATA.certifications.map((cert, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-400 hover:text-white transition-colors">
                        <Award className="w-3 h-3 text-accent-lime" />
                        {cert.name}
                    </span>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
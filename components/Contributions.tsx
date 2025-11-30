
import React from 'react';
import { RESUME_DATA } from '../constants';
import { Zap, ExternalLink } from 'lucide-react';

const Contributions: React.FC = () => {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider">Contributions & Freelance</h3>
        <div className="h-[1px] flex-1 bg-neutral-800"></div>
      </div>
      
      <div className="space-y-6">
        {RESUME_DATA.contributions.map((item, idx) => (
            <div key={idx} className="group">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-bold text-white text-base group-hover:text-accent-cyan transition-colors">
                            {item.company}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                            <span className="text-accent-fuchsia font-medium">{item.role}</span>
                            <span>•</span>
                            <span>{item.type}</span>
                        </div>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-600 border border-neutral-800 px-1.5 py-0.5 rounded">
                        {item.period.split(' – ')[0].split('/')[1]} - {item.period.split(' – ')[1].split('/')[1] || 'Now'}
                    </span>
                </div>
                
                <ul className="mt-3 space-y-1.5">
                    {item.description.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-neutral-500 leading-relaxed">
                            <Zap className="w-3 h-3 text-neutral-700 mt-0.5 shrink-0 group-hover:text-accent-cyan transition-colors" />
                            {point}
                        </li>
                    ))}
                </ul>
            </div>
        ))}
      </div>
    </section>
  );
};

export default Contributions;

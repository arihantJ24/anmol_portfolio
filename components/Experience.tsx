import React, { useMemo } from 'react';
import { RESUME_DATA } from '../constants';
import { Briefcase, Calendar, MapPin, ArrowDown } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Experience: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  // --- Timeline Logic ---
  const { minDate, maxDate, totalDuration, processedExperience, years } = useMemo(() => {
    const parseDate = (dateStr: string) => {
      if (dateStr.toLowerCase().includes('present')) return new Date();
      const [month, year] = dateStr.split('/');
      // Handle MM/YYYY format
      return new Date(parseInt(year), parseInt(month) - 1);
    };

    const processed = RESUME_DATA.experience.map((exp, index) => {
      const [startStr, endStr] = exp.period.split(' – ');
      const start = parseDate(startStr);
      const end = parseDate(endStr);
      return { ...exp, start, end, id: `exp-${index}` };
    });

    // Calculate bounds with buffer
    const timestamps = processed.flatMap(e => [e.start.getTime(), e.end.getTime()]);
    const min = new Date(Math.min(...timestamps));
    const max = new Date(Math.max(...timestamps));
    
    // Add 2 months buffer to start and end
    min.setMonth(min.getMonth() - 2);
    max.setMonth(max.getMonth() + 2);

    const duration = max.getTime() - min.getTime();
    
    // Generate years for grid
    const startYear = min.getFullYear();
    const endYear = max.getFullYear();
    const yearArray = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

    return { 
      minDate: min, 
      maxDate: max, 
      totalDuration: duration, 
      processedExperience: processed,
      years: yearArray
    };
  }, []);

  const getPosition = (date: Date) => {
    return ((date.getTime() - minDate.getTime()) / totalDuration) * 100;
  };

  const scrollToExperience = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of sticky header + padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Generic Dark Theme Color logic
  const getTheme = () => {
    return { 
        bar: 'bg-neutral-700', 
        hoverBar: 'group-hover:bg-accent-lime',
        activeBar: 'bg-accent-lime',
        hoverText: 'group-hover:text-white',
        border: 'border-neutral-800', 
        hoverBorder: 'hover:border-neutral-600',
        dot: 'bg-accent-lime'
    };
  };

  const theme = getTheme();

  return (
    <section ref={ref} className={`reveal-section space-y-12 ${isVisible ? 'is-visible' : ''}`}>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg">
            <Briefcase className="w-6 h-6 text-accent-lime" />
        </div>
        <h3 className="text-3xl font-bold text-white">Experience</h3>
      </div>

      {/* Desktop Timeline Visualization */}
      <div className="hidden md:block bg-[#0a0a0a] rounded-2xl border border-neutral-800 p-8 shadow-sm overflow-hidden relative">
         <div className="flex justify-between items-end mb-6 border-b border-neutral-800 pb-2">
             <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Career Timeline</h4>
             <span className="text-xs text-neutral-600 italic">Click bars to view details</span>
         </div>
         
         <div className="relative h-48 w-full">
            {/* Grid Background */}
            <div className="absolute inset-0 w-full h-full flex justify-between pointer-events-none z-0">
                {years.map((year) => (
                    <div key={year} className="relative h-full flex flex-col justify-end items-start">
                        <div className="absolute bottom-0 left-0 top-0 border-l border-dashed border-neutral-800"></div>
                        <span className="translate-x-[-50%] translate-y-6 text-xs font-medium text-neutral-600">{year}</span>
                    </div>
                ))}
            </div>

            {/* Timeline Bars */}
            <div className="absolute inset-0 flex flex-col justify-center gap-4 py-2 z-10">
                {processedExperience.map((job, index) => {
                    const left = getPosition(job.start);
                    const width = getPosition(job.end) - left;
                    
                    return (
                        <button 
                            key={index}
                            onClick={() => scrollToExperience(job.id)}
                            className="group relative h-6 rounded-full cursor-pointer text-left focus:outline-none transition-all duration-300 hover:scale-[1.01]"
                            style={{ 
                                left: `${left}%`, 
                                width: `${Math.max(width, 2)}%`, // Minimum visual width
                            }}
                            aria-label={`Scroll to ${job.company}`}
                        >
                             {/* Bar Background with Opacity */}
                             <div className={`absolute inset-0 rounded-full bg-neutral-800 opacity-50`}></div>
                             {/* Solid Indicator Strip */}
                             <div className={`absolute top-0 bottom-0 left-0 w-full rounded-full border-l-[4px] border-neutral-600 ${theme.hoverBar} bg-neutral-700 opacity-80 group-hover:opacity-100 transition-colors shadow-sm`}></div>
                             
                             {/* Company Label */}
                             <div className={`
                                absolute top-1/2 -translate-y-1/2 left-3 
                                text-[10px] font-bold text-neutral-400 uppercase tracking-wide 
                                whitespace-nowrap overflow-hidden opacity-0 group-hover:opacity-100 lg:opacity-100 transition-all group-hover:text-white
                             `}>
                                {job.company}
                             </div>

                             {/* Tooltip */}
                             <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white text-black text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 pointer-events-none shadow-[0_0_15px_rgba(255,255,255,0.2)] whitespace-nowrap font-bold">
                                {job.role}
                                <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                             </div>
                        </button>
                    );
                })}
            </div>
         </div>
      </div>

      {/* Detailed Card List */}
      <div className="relative space-y-10">
        {processedExperience.map((job, index) => {
            return (
              <div 
                key={index} 
                id={job.id}
                className="group scroll-mt-24 relative"
              >
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                    {/* Desktop Date Column */}
                    <div className="hidden md:flex flex-col items-end w-32 shrink-0 pt-2 opacity-60 group-hover:opacity-100 transition-opacity">
                         <span className="text-sm font-bold text-white">{job.period.split(' – ')[0]}</span>
                         <ArrowDown className="w-3 h-3 text-neutral-600 my-1" />
                         <span className="text-xs text-neutral-500 text-right">{job.period.split(' – ')[1]}</span>
                    </div>

                    {/* Content Card */}
                    <div className={`
                        flex-1 bg-[#0a0a0a] p-6 md:p-8 rounded-2xl border border-neutral-800
                        shadow-sm transition-all duration-300 w-full
                        hover:shadow-xl hover:shadow-lime-500/5 hover:-translate-y-1 hover:border-neutral-600
                    `}>
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                            <div>
                                <h4 className="text-2xl font-bold text-white flex items-center gap-2">
                                    {job.company}
                                    {job.location && (
                                        <span className="hidden sm:inline-flex text-[10px] font-bold text-neutral-500 bg-neutral-900 px-2 py-1 rounded-md border border-neutral-800 uppercase tracking-wider items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {job.location}
                                        </span>
                                    )}
                                </h4>
                                <p className="text-base font-medium mt-1 text-accent-lime">
                                    {job.role}
                                </p>
                            </div>
                            {/* Mobile Date Badge */}
                            <div className="md:hidden text-xs font-medium text-neutral-400 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg whitespace-nowrap">
                                {job.period}
                            </div>
                        </div>

                        <ul className="space-y-3">
                            {job.description.map((point, i) => (
                                <li key={i} className="flex items-start gap-3 text-neutral-400 text-sm md:text-base leading-relaxed group-hover:text-neutral-200 transition-colors">
                                    <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0 bg-neutral-600 group-hover:bg-accent-lime transition-colors"></span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
              </div>
            );
        })}
      </div>
    </section>
  );
};

export default Experience;
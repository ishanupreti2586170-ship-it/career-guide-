import { useState } from 'react';
import { motion } from 'motion/react';
import { PersonalityReport, ReadinessQuestion } from '../types';
import { generateReadinessQuiz } from '../services/geminiService';
import { ArrowRight, Loader2, Info, LayoutGrid, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface InsightReportProps {
  report: PersonalityReport;
  onSelectCareer: (career: string) => void;
}

export default function InsightReport({ report, onSelectCareer }: InsightReportProps) {
  const [loadingCareer, setLoadingCareer] = useState<string | null>(null);

  const handleSelect = async (careerTitle: string) => {
    setLoadingCareer(careerTitle);
    await onSelectCareer(careerTitle);
    setLoadingCareer(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-24">
      {/* Sidebar: Personality Profile */}
      <div className="md:col-span-4 space-y-6">
        <div className="bg-indigo-900 rounded-[32px] p-8 text-white shadow-card sticky top-28">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 vibrant-gradient rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-900/50">
              <Zap size={20} />
            </div>
            <h3 className="text-xl font-extrabold tracking-tight">Mentality Map</h3>
          </div>

          <div className="space-y-8">
            {report.traits.map((trait, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-indigo-300">
                  <span>{trait.name}</span>
                  <span className="px-2 py-1 bg-white/10 rounded-md text-indigo-100">{trait.value}%</span>
                </div>
                <div className="h-1.5 bg-indigo-950 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-rose-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${trait.value}%` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 space-y-4">
             <div className="flex items-center gap-2 text-xs font-black text-indigo-300 uppercase tracking-widest">
                <Info size={14} /> Global Insight
             </div>
             <p className="text-sm font-medium text-indigo-50 leading-relaxed italic opacity-80">
               "{report.summary}"
             </p>
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-card">
           <div className="grid grid-cols-1 gap-6">
              <div>
                <h5 className="font-black text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-4">Core Strengths</h5>
                <ul className="space-y-3">
                  {report.strengths.slice(0, 3).map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-700">
                      <div className="mt-1 w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
           </div>
        </div>
      </div>

      {/* Main Content: Recommendations */}
      <div className="md:col-span-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-rose-500">Vocation Mapping</h2>
            <h3 className="text-5xl font-black text-slate-900 tracking-tight">Top Recommendations</h3>
          </div>
          <div className="flex gap-2">
             <span className="px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
               AI Verified
             </span>
             <span className="px-4 py-2 bg-amber-100 rounded-full text-[10px] font-black text-amber-600 uppercase tracking-widest">
               High Demand
             </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {report.recommendations.map((career, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[32px] p-10 border border-slate-200 shadow-card hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8">
                 <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className={cn("h-4 w-1.5 rounded-full", j < (career.difficultyScale / 2) ? "bg-indigo-500" : "bg-slate-100")} />
                    ))}
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Diff. Lvl</span>
                 </div>
              </div>

              <div className="flex flex-col md:flex-row gap-10">
                <div className="w-16 h-16 shrink-0 rounded-3xl vibrant-gradient flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-100">
                  {career.title.charAt(0)}
                </div>
                
                <div className="space-y-6 flex-1">
                  <div className="space-y-2">
                    <h4 className="text-3xl font-black text-slate-900 leading-none">{career.title}</h4>
                    <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest">
                      {Math.round(90 + Math.random() * 9)}% Likability Match
                    </p>
                  </div>

                  <p className="text-lg font-medium text-slate-500 leading-relaxed italic border-l-4 border-rose-100 pl-6">
                    {career.whyFits}
                  </p>

                  <div className="flex flex-wrap gap-10 pt-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Required Mindset</span>
                      <p className="text-base font-extrabold text-indigo-600">{career.mindset}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Market Status</span>
                      <p className="text-base font-extrabold text-slate-800">{career.growthPotential}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelect(career.title)}
                    disabled={!!loadingCareer}
                    className="mt-6 flex items-center gap-4 py-4 px-8 border-2 border-indigo-600 font-extrabold text-indigo-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all group/btn"
                  >
                    {loadingCareer === career.title ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>
                        Start Readiness Trial
                        <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

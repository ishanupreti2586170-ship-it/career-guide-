import { motion } from 'motion/react';
import { ReadinessResult } from '../types';
import { CheckCircle2, Bookmark, ExternalLink, RefreshCw, Trophy, Target } from 'lucide-react';

interface RoadmapProps {
  career: string;
  result: ReadinessResult;
  onRestart: () => void;
}

export default function Roadmap({ career, result, onRestart }: RoadmapProps) {
  const percentage = (result.score / result.total) * 100;

  return (
    <div className="space-y-16 pb-24 max-w-5xl mx-auto">
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-6">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-100 rounded-full text-rose-600 text-xs font-black uppercase tracking-widest">
               Trial Conclusion
             </div>
             <h3 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">
               {percentage >= 80 ? 'Exceptional' : percentage >= 50 ? 'Strong Focus' : 'Growth Plan'}
             </h3>
             <p className="text-2xl text-slate-500 max-w-xl font-medium">
               Neural validation complete for the <span className="text-indigo-600 font-black">{career}</span> trajectory.
             </p>
          </div>
          
          <div className="shrink-0 flex items-center justify-center p-12 vibrant-gradient text-white rounded-[40px] shadow-2xl shadow-indigo-200 aspect-square text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-150 transition-transform duration-700 rounded-full" />
            <div className="relative">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-70">Logic Score</div>
              <div className="text-7xl font-black">{result.score}<span className="text-3xl opacity-50">/{result.total}</span></div>
            </div>
          </div>
        </div>

        <div className="p-10 rounded-[32px] border-4 border-slate-100 italic text-2xl font-medium text-slate-700 leading-relaxed bg-white relative shadow-sm">
          <div className="absolute -top-5 left-10 p-2 bg-indigo-600 text-white rounded-lg">
            <Trophy size={20} />
          </div>
          "{result.feedback}"
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <section className="md:col-span-7 space-y-8">
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
              <Target size={16} className="text-indigo-600" /> Immediate Trajectory
            </h4>
            <div className="space-y-4">
               {result.nextSteps.map((step, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="flex gap-6 p-6 rounded-3xl border border-slate-100 bg-white group hover:border-indigo-400 transition-all shadow-sm hover:shadow-md"
                 >
                   <div className="h-10 w-10 shrink-0 bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center rounded-xl font-black text-sm transition-colors">
                     0{i + 1}
                   </div>
                   <p className="text-base font-bold text-slate-700 leading-snug self-center">{step}</p>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        <section className="md:col-span-5 space-y-8">
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3 text-right justify-end">
              Expert Resources <Bookmark size={16} className="text-rose-500" />
            </h4>
            <div className="grid gap-3">
               {result.resources.map((res, i) => (
                 <a
                   key={i}
                   href={res.link}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between group hover:vibrant-gradient hover:text-white transition-all shadow-sm"
                 >
                   <span className="text-sm font-black uppercase tracking-wider">{res.title}</span>
                   <ExternalLink size={18} className="opacity-40 group-hover:opacity-100" />
                 </a>
               ))}
            </div>
          </div>

          <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-[32px] space-y-4">
             <h4 className="font-extrabold text-sm text-indigo-900 uppercase tracking-tight">Strategy for Acceleration</h4>
             <p className="text-xs font-bold text-indigo-600/70 leading-relaxed italic">
               The market for {career} has evolved. We recommend doubling down on practical problem-solving logic. 
               Avoid passive learning; focus on building a case-study portfolio that proves your cognitive readiness.
             </p>
          </div>
        </section>
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={onRestart}
          className="flex items-center gap-3 px-8 py-4 rounded-xl border-2 border-slate-200 text-xs font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all"
        >
          <RefreshCw size={14} />
          Reset Cognitive Profile
        </button>
      </div>
    </div>
  );
}

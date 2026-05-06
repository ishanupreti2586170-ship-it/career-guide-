import { ArrowRight, BrainCircuit, Target, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="flex flex-col gap-12 py-8">
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-xs font-black uppercase tracking-[0.2em]">
          <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
          2026 Career Intelligence
        </div>
        <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.9]">
          Design your <span className="text-indigo-600">Future</span> Self.
        </h2>
        <p className="text-xl text-slate-500 max-w-xl leading-relaxed">
          The world's first AI-driven vocation mapper. Analyze your mentality, 
          verify your readiness, and unlock high-growth professions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: BrainCircuit, color: "bg-indigo-100 text-indigo-600", title: "Cognitive Trial", desc: "Scientific parsing of your native professional mentality." },
          { icon: Target, color: "bg-rose-100 text-rose-600", title: "Logical Pulse", desc: "Real-world simulator testing your industry readiness." },
          { icon: TrendingUp, color: "bg-teal-100 text-teal-600", title: "Growth Lab", desc: "Precision roadmap for the high-earning jobs of tomorrow." }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            className="p-8 bg-white border border-slate-200 rounded-3xl shadow-card hover:shadow-xl transition-all duration-300 group"
          >
            <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <item.icon size={24} />
            </div>
            <h3 className="text-xl font-extrabold text-slate-800 mb-2">{item.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
        <button
          onClick={onStart}
          className="group w-full sm:w-auto flex items-center justify-center gap-3 vibrant-gradient text-white px-10 py-5 rounded-2xl text-base font-extrabold shadow-lg shadow-indigo-200 hover:scale-105 transition-all"
        >
          Initiate Simulation
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <div className="flex -space-x-3">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200 shadow-sm">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${n}`} alt="user" />
            </div>
          ))}
          <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
            +2k
          </div>
        </div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Verified by active professionals</p>
      </div>
    </div>
  );
}

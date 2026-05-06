import { motion } from 'motion/react';
import { TrendingUp, Rocket, Globe, Zap } from 'lucide-react';

const TRENDING_PROFESSIONS = [
  {
    title: "AI Solutions Architect",
    growth: "+45%",
    mindset: "Computational Thinking",
    description: "Requires the ability to break down complex human problems into logical steps that software can solve. You must be comfortable with data and structured logic.",
    icon: Zap
  },
  {
    title: "Eco-Sustainability Strategist",
    growth: "+32%",
    mindset: "Systems Thinking",
    description: "Focuses on the long-term impact of business on the environment. Requires seeing the 'big picture' and how small changes affect a global network.",
    icon: Globe
  },
  {
    title: "Digital Community Builder",
    growth: "+28%",
    mindset: "Empathetic Thinking",
    description: "Focuses on human connection in a digital world. Requires high emotional intelligence to understand group dynamics and foster trust.",
    icon: Rocket
  },
  {
    title: "Data Storyteller",
    growth: "+40%",
    mindset: "Narrative Thinking",
    description: "The bridge between raw data and human decision-making. Requires the ability to find a 'story' within numbers to explain results simply.",
    icon: TrendingUp
  }
];

export default function MarketTrends() {
  return (
    <div className="space-y-12 py-8">
      <div className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-rose-500">Market Intelligence</h2>
        <h3 className="text-6xl font-black text-slate-900 tracking-tighter">Trending Vocations</h3>
        <p className="text-xl text-slate-500 max-w-2xl font-medium">
          Professional landscapes are shifting. Here are the most robust growth sectors 
          for 2026 and the mentality required to master them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TRENDING_PROFESSIONS.map((prof, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-card hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 vibrant-gradient rounded-2xl flex items-center justify-center text-white shadow-lg">
                <prof.icon size={28} />
              </div>
              <span className="px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-xs font-black uppercase tracking-widest">
                Growth: {prof.growth}
              </span>
            </div>

            <div className="space-y-4">
              <h4 className="text-2xl font-black text-slate-900">{prof.title}</h4>
              <div className="inline-block px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-md text-indigo-600 text-xs font-bold uppercase tracking-widest">
                Mindset: {prof.mindset}
              </div>
              <p className="text-slate-500 font-medium leading-relaxed italic">
                {prof.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

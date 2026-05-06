import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AptitudeQuestion } from '../types';
import { generateAptitudeTest } from '../services/geminiService';
import { Loader2, ArrowRight, Brain, Calculator, MessageSquare, Box } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ExpertLabs() {
  const [questions, setQuestions] = useState<AptitudeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loadState, setLoadState] = useState<'loading' | 'active' | 'complete'>('loading');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    loadTest();
  }, []);

  const loadTest = async () => {
    setLoadState('loading');
    try {
      const data = await generateAptitudeTest();
      setQuestions(data);
      setLoadState('active');
    } catch (e) {
      console.error(e);
    }
  };

  const handleNext = () => {
    if (selectedOption === null) return;
    
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setLoadState('complete');
    }
  };

  if (loadState === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-8">
        <Loader2 size={64} className="animate-spin text-indigo-600" />
        <div className="text-center">
          <h3 className="text-2xl font-black uppercase tracking-tight">Generating IQ Simulation</h3>
          <p className="text-slate-500 font-medium mt-2 italic">Preparing logic puzzles and verbal reasoning trials...</p>
        </div>
      </div>
    );
  }

  if (loadState === 'complete') {
    const score = answers.reduce((acc, ans, i) => acc + (ans === questions[i].correctAnswer ? 1 : 0), 0);
    const iqLevel = score > 8 ? 'Exceptional' : score > 5 ? 'Strong' : 'Functional';
    
    return (
      <div className="max-w-3xl mx-auto py-12 space-y-12 text-center">
        <div className="space-y-4">
          <div className="inline-flex w-24 h-24 vibrant-gradient rounded-full items-center justify-center text-white mb-4">
            <Brain size={48} />
          </div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tight">Simulation Results</h2>
          <p className="text-xl text-slate-500 font-medium">Cognitive Aptitude Level: <span className="text-indigo-600 font-extrabold">{iqLevel}</span></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="p-8 bg-white border border-slate-200 rounded-[32px] shadow-card">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Score Analysis</h4>
            <div className="text-6xl font-black text-slate-900 mb-2">{score}<span className="text-2xl opacity-30">/{questions.length}</span></div>
            <p className="text-sm font-medium text-slate-500 italic leading-relaxed">
              Based on your pattern recognition and verbal logic, your aptitude fits mid-to-high complexity professional environments.
            </p>
          </div>
          <div className="p-8 bg-indigo-900 rounded-[32px] text-white shadow-card">
             <h4 className="text-xs font-black uppercase tracking-widest text-indigo-300 mb-4">Industry Pulse</h4>
             <p className="text-sm font-medium leading-relaxed italic opacity-90">
               "Your score indicates a strong readiness for roles involving strategic coordination or complex problem solving in technical sectors."
             </p>
          </div>
        </div>

        <button 
          onClick={loadTest}
          className="px-10 py-5 vibrant-gradient text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 hover:scale-105 transition-all"
        >
          Re-initialize Trial
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const Icon = currentQ.type === 'logic' ? Brain : currentQ.type === 'math' ? Calculator : currentQ.type === 'verbal' ? MessageSquare : Box;

  return (
    <div className="max-w-4xl mx-auto py-12 grid grid-cols-1 md:grid-cols-12 gap-12">
      <div className="md:col-span-4 space-y-8">
        <div className="space-y-4">
          <div className="w-16 h-16 vibrant-gradient rounded-[24px] flex items-center justify-center text-white shadow-lg">
            <Icon size={32} />
          </div>
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-rose-500">Expert Labs</h2>
          <h3 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Aptitude Simulation</h3>
        </div>

        <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span>Simulation Progress</span>
              <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
        </div>
      </div>

      <div className="md:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-[40px] p-12 border border-slate-200 shadow-card space-y-10"
          >
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-slate-100 rounded-md text-[10px] font-black uppercase text-slate-500 tracking-widest">{currentQ.type}</span>
              <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Question {currentIndex + 1}</span>
            </div>
            
            <h4 className="text-3xl font-extrabold text-slate-900 leading-tight">{currentQ.text}</h4>

            <div className="grid grid-cols-1 gap-4">
               {currentQ.options.map((opt, i) => (
                 <button
                   key={i}
                   onClick={() => setSelectedOption(i)}
                   className={cn(
                     "p-6 rounded-2xl border-2 transition-all flex items-center gap-6 group text-left",
                     selectedOption === i ? "border-indigo-600 bg-indigo-50 shadow-md" : "border-slate-100 bg-white hover:border-indigo-200"
                   )}
                 >
                   <div className={cn(
                     "w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-colors",
                     selectedOption === i ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400"
                   )}>
                     {String.fromCharCode(65 + i)}
                   </div>
                   <span className="text-lg font-bold text-slate-700">{opt}</span>
                 </button>
               ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                disabled={selectedOption === null}
                onClick={handleNext}
                className={cn(
                  "px-8 py-4 rounded-xl flex items-center gap-3 font-black text-sm uppercase tracking-widest transition-all",
                  selectedOption === null ? "bg-slate-100 text-slate-300" : "vibrant-gradient text-white shadow-lg hover:scale-105"
                )}
              >
                Proceed
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

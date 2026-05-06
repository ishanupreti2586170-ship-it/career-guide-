import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ReadinessQuestion, ReadinessResult } from '../types';
import { generateReadinessReport } from '../services/geminiService';
import { Loader2, ArrowRight, Info, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface ReadinessQuizProps {
  career: string;
  questions: ReadinessQuestion[];
  onComplete: (score: number, total: number) => void;
}

export default function ReadinessQuiz({ career, questions, onComplete }: ReadinessQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);

  const handleNext = () => {
    const isCorrect = selectedOption === questions[currentIndex].correctAnswer;
    const newScore = isCorrect ? score + 1 : score;

    if (currentIndex < questions.length - 1) {
      setScore(newScore);
      setSelectedOption(null);
      setShowExplanation(false);
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinishing(true);
      onComplete(newScore, questions.length);
    }
  };

  if (isFinishing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-8">
        <Loader2 size={64} className="animate-spin text-rose-500" />
        <div className="text-center space-y-3">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Simulating Career ROI</h3>
          <p className="text-slate-500 font-medium max-w-sm">
            Calculating professional trajectory based on your industry logic...
          </p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
           <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-xs font-black uppercase tracking-widest">
             Stage 02: Readiness Trial
           </span>
           <h3 className="text-5xl font-black text-slate-900 tracking-tight">{career} Trial</h3>
           <p className="text-slate-500 font-medium">Verify your logical readiness for this high-growth path.</p>
        </div>
        
        <div className="w-full md:w-64 space-y-2">
            <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span>Sync Progress</span>
              <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-rose-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          className="bg-white rounded-[40px] p-12 border border-slate-200 shadow-card flex flex-col relative overflow-hidden"
        >
          <div className="space-y-12">
             <div className="space-y-6">
                <div className="flex items-start gap-6">
                   <div className="shrink-0 w-12 h-12 vibrant-gradient rounded-2xl flex items-center justify-center text-white font-black text-xl">
                    Q
                   </div>
                   <h4 className="text-3xl font-extrabold text-slate-900 leading-tight">{currentQ.text}</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQ.options.map((option, i) => (
                    <button
                      key={i}
                      disabled={showExplanation}
                      onClick={() => setSelectedOption(i)}
                      className={cn(
                        "w-full text-left p-6 rounded-3xl border-2 transition-all flex flex-col gap-4 group",
                        selectedOption === i ? "border-indigo-600 bg-indigo-50 shadow-md" : "border-slate-100 bg-white hover:border-indigo-300 shadow-sm",
                        showExplanation && i === currentQ.correctAnswer && "border-teal-500 bg-teal-50 shadow-none",
                        showExplanation && selectedOption === i && i !== currentQ.correctAnswer && "border-rose-500 bg-rose-50 shadow-none"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors",
                        selectedOption === i ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-indigo-200 group-hover:text-indigo-700",
                        showExplanation && i === currentQ.correctAnswer && "bg-teal-500 text-white",
                        showExplanation && selectedOption === i && i !== currentQ.correctAnswer && "bg-rose-500 text-white"
                      )}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className="font-bold text-slate-700 leading-relaxed">{option}</span>
                    </button>
                  ))}
                </div>
             </div>

             <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-slate-100">
                <div className="flex-1">
                  {showExplanation ? (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-indigo-900 text-white p-6 rounded-3xl text-sm font-medium italic leading-relaxed flex gap-4"
                    >
                      <HelpCircle size={20} className="shrink-0 text-indigo-400" />
                      {currentQ.explanation}
                    </motion.div>
                  ) : (
                    <p className="text-slate-400 text-sm font-bold flex items-center gap-2">
                      <HelpCircle size={16} /> Precision choice required for professional accreditation.
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {selectedOption !== null && !showExplanation && (
                    <button
                      onClick={() => setShowExplanation(true)}
                      className="text-indigo-600 font-black text-xs uppercase tracking-widest px-6"
                    >
                      Verify Logic
                    </button>
                  )}
                  <button
                    disabled={selectedOption === null}
                    onClick={handleNext}
                    className={cn(
                      "group flex items-center gap-4 px-10 py-5 rounded-2xl text-base font-black transition-all shadow-lg",
                      selectedOption === null ? "bg-slate-100 text-slate-300 shadow-none" : "vibrant-gradient text-white shadow-indigo-100 hover:scale-105"
                    )}
                  >
                    Submit Outcome
                    <ArrowRight size={20} className="group-hover:translate-x-1" />
                  </button>
                </div>
             </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

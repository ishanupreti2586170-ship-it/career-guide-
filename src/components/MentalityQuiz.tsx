import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MentalityAnswer, PersonalityReport } from '../types';
import { analyzeMentality } from '../services/geminiService';
import { Loader2, ArrowRight, Sparkles, BrainCircuit } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'sc1',
    question: "A high-stakes professional opportunity appears with massive risks. What is your impulse?",
    type: 'choice',
    options: [
      "Rigorous calculation of every failure point before acting.",
      "Swift execution to capture the window of opportunity.",
      "Seeking a collaborative consensus with a trusted team.",
      "Discarding traditional paths to find a secret, creative angle."
    ]
  },
  {
    id: 'sc2',
    type: 'scale',
    question: "Rate your professional drive for autonomy vs. established security.",
    options: ["Strict Corporate Structure", "Steady Employment", "Hybrid Flexibility", "Radical Independence"]
  },
  {
    id: 'sc3',
    type: 'choice',
    question: "What is the ultimate definition of 'success' in your professional life?",
    options: [
      "Becoming a respected subject-matter authority.",
      "Generating vast wealth and financial independence.",
      "Pioneering shifts in culture or technology.",
      "Impacting individual lives through service/education."
    ]
  },
  {
    id: 'sc4',
    type: 'choice',
    question: "You have 10,000 active followers. How do you leverage this power?",
    options: [
      "Build a precision-engineered product for their needs.",
      "Inspire them through daily storytelling and lifestyle.",
      "Analyze their data to optimize market trends.",
      "Teach them a complex skill strictly for free."
    ]
  }
];

interface MentalityQuizProps {
  onComplete: (answers: MentalityAnswer[]) => void;
}

export default function MentalityQuiz({ onComplete }: MentalityQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<MentalityAnswer[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnswer = (option: string) => {
    const currentQ = QUESTIONS[currentIndex];
    const newAnswers = [
      ...answers,
      {
        questionId: currentQ.id,
        question: currentQ.question,
        answer: option,
        type: currentQ.type as any
      }
    ];
    
    setAnswers(newAnswers);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsAnalyzing(true);
      onComplete(newAnswers);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-8">
        <div className="relative">
          <Loader2 size={64} className="animate-spin text-indigo-600" />
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-500 animate-pulse" size={24} />
        </div>
        <div className="text-center space-y-3">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Quantifying Mentality</h3>
          <p className="text-slate-500 font-medium max-w-sm">
            Applying neural psychometrics to your responses. 
            Estimated synchronization: <span className="text-indigo-600 font-bold">94%</span>
          </p>
        </div>
        <div className="w-full max-w-xs h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full vibrant-gradient"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </div>
    );
  }

  const currentQ = QUESTIONS[currentIndex];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Info Area */}
        <div className="md:col-span-4 space-y-8">
          <div className="space-y-4">
             <div className="w-12 h-12 vibrant-gradient rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-100">
               {currentIndex + 1}
             </div>
             <h4 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600">Cognitive Trial</h4>
             <h3 className="text-3xl font-extrabold text-slate-900 leading-tight">Stage 01: Mentality Feed</h3>
          </div>
          
          <div className="p-6 bg-indigo-900 rounded-3xl text-white shadow-card relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <BrainCircuit size={80} />
             </div>
             <p className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-2 text-right">Process Metadata</p>
             <p className="text-sm font-medium leading-relaxed italic text-indigo-50">
               "Your impulsive choices reveal more about your future career potential than your conscious goals."
             </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-black text-slate-400 uppercase tracking-widest px-1">
              <span>Synchronization</span>
              <span>{Math.round(((currentIndex + 1) / QUESTIONS.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-rose-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Interaction Area */}
        <div className="md:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-card space-y-10"
            >
              <h3 className="text-3xl font-extrabold text-slate-900 leading-snug">{currentQ.question}</h3>
              
              <div className="grid grid-cols-1 gap-4">
                {currentQ.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option)}
                    className="group w-full text-left p-6 rounded-2xl border-2 border-slate-100 bg-white hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 flex items-center justify-between shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center font-bold text-slate-400 transition-colors">
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className="font-bold text-slate-700 text-lg leading-tight">{option}</span>
                    </div>
                    <ArrowRight size={20} className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

import { useState, ReactNode } from 'react';
import { motion } from 'motion/react';
import { SupportedLanguage } from '../types';
import { Globe, Shield } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  onNavigate: (step: any) => void;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

const LANGUAGES: { code: SupportedLanguage; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
  { code: 'es', label: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', label: 'French', flag: '🇫🇷' },
  { code: 'de', label: 'German', flag: '🇩🇪' },
  { code: 'zh', label: 'Chinese', flag: '🇨🇳' }
];

export default function Layout({ children, onNavigate, language, onLanguageChange }: LayoutProps) {
  const [showLangs, setShowLangs] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex flex-col">
      {/* Navigation */}
      <nav className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('welcome')}>
          <div className="w-10 h-10 vibrant-gradient rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">V</div>
          <span className="text-2xl font-bold tracking-tight text-slate-800">Vocation<span className="text-indigo-600">AI</span></span>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
          <button onClick={() => onNavigate('welcome')} className="hover:text-indigo-600 transition-colors">Analyze</button>
          <button onClick={() => onNavigate('market_trends')} className="hover:text-indigo-600 transition-colors">Market Trends</button>
          <button onClick={() => onNavigate('expert_labs')} className="hover:text-indigo-600 transition-colors">Expert Labs</button>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <button 
              onClick={() => setShowLangs(!showLangs)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-indigo-50 transition-colors"
            >
              <Globe size={14} className="text-indigo-600" />
              {LANGUAGES.find(l => l.code === language)?.label || 'English'}
            </button>
            {showLangs && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden py-1 z-[60]">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setShowLangs(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-semibold hover:bg-slate-50 flex items-center gap-3"
                  >
                    <span>{lang.flag}</span>
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Neural Mapping</p>
              <p className="text-sm font-bold text-slate-800">v1.2 Active</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white ring-2 ring-indigo-500 overflow-hidden shrink-0">
              <img src="https://api.dicebear.com/7.x/bottts/svg?seed=vocation" alt="engine status" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8"
      >
        {children}
      </motion.main>

      {/* Footer Banner */}
      <footer className="h-16 bg-slate-900 text-white flex items-center px-8 justify-between shrink-0 mt-auto">
        <div className="flex gap-4">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">System Status:</span>
          <span className="text-sm font-bold flex items-center gap-2">
            <Shield size={14} className="text-teal-400" />
            Neural Mapping Engine Synchronized
          </span>
        </div>
        <div className="hidden sm:flex gap-6 items-center">
          <div className="flex gap-2 items-center">
            <span className="text-xs text-slate-400 uppercase tracking-widest">Aptitude:</span>
            <span className="text-sm font-bold text-amber-400">Labs Open</span>
          </div>
          <div className="h-4 w-px bg-slate-700"></div>
          <p className="text-xs text-slate-500 font-mono">2026.VOX.PRIME</p>
        </div>
      </footer>
    </div>
  );
}

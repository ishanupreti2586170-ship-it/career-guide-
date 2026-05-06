import { useState } from 'react';
import Layout from './components/Layout';
import { AppStep, MentalityAnswer, PersonalityReport, ReadinessQuestion, ReadinessResult, SupportedLanguage } from './types';
import Welcome from './components/Welcome';
import MentalityQuiz from './components/MentalityQuiz';
import InsightReport from './components/InsightReport';
import ReadinessQuiz from './components/ReadinessQuiz';
import Roadmap from './components/Roadmap';
import MarketTrends from './components/MarketTrends';
import ExpertLabs from './components/ExpertLabs';
import { analyzeMentality, generateReadinessQuiz, generateReadinessReport } from './services/geminiService';

export default function App() {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [mentalityAnswers, setMentalityAnswers] = useState<MentalityAnswer[]>([]);
  const [report, setReport] = useState<PersonalityReport | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [readinessQuiz, setReadinessQuiz] = useState<ReadinessQuestion[]>([]);
  const [readinessResult, setReadinessResult] = useState<ReadinessResult | null>(null);

  const handleStart = () => {
    setStep(AppStep.MENTALITY_QUIZ);
  };

  const handleMentalityComplete = async (answers: MentalityAnswer[]) => {
    setMentalityAnswers(answers);
    try {
      const reportData = await analyzeMentality(answers, language);
      setReport(reportData);
      setStep(AppStep.ANALYSIS_REPORT);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCareerSelect = async (career: string) => {
    setSelectedCareer(career);
    try {
      const quiz = await generateReadinessQuiz(career, language);
      setReadinessQuiz(quiz);
      setStep(AppStep.READINESS_QUIZ);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReadinessComplete = async (score: number, total: number) => {
    try {
      const result = await generateReadinessReport(selectedCareer!, score, total, language);
      setReadinessResult(result);
      setStep(AppStep.FINAL_ROADMAP);
    } catch (e) {
      console.error(e);
    }
  };

  const reset = () => {
    setStep(AppStep.WELCOME);
    setMentalityAnswers([]);
    setReport(null);
    setSelectedCareer(null);
    setReadinessQuiz([]);
    setReadinessResult(null);
  };

  return (
    <Layout 
      onNavigate={setStep} 
      language={language} 
      onLanguageChange={setLanguage}
    >
      {step === AppStep.WELCOME && (
        <Welcome onStart={handleStart} />
      )}
      {step === AppStep.MENTALITY_QUIZ && (
        <MentalityQuiz onComplete={handleMentalityComplete} />
      )}
      {step === AppStep.ANALYSIS_REPORT && report && (
        <InsightReport report={report} onSelectCareer={handleCareerSelect} />
      )}
      {step === AppStep.READINESS_QUIZ && selectedCareer && (
        <ReadinessQuiz 
          career={selectedCareer} 
          questions={readinessQuiz} 
          onComplete={handleReadinessComplete} 
        />
      )}
      {step === AppStep.FINAL_ROADMAP && readinessResult && selectedCareer && (
        <Roadmap 
          career={selectedCareer} 
          result={readinessResult} 
          onRestart={reset} 
        />
      )}
      {step === AppStep.MARKET_TRENDS && (
        <MarketTrends />
      )}
      {step === AppStep.EXPERT_LABS && (
        <ExpertLabs />
      )}
    </Layout>
  );
}

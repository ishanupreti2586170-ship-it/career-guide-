export enum AppStep {
  WELCOME = 'welcome',
  MENTALITY_QUIZ = 'mentality_quiz',
  ANALYSIS_REPORT = 'analysis_report',
  READINESS_QUIZ = 'readiness_quiz',
  FINAL_ROADMAP = 'final_roadmap',
  MARKET_TRENDS = 'market_trends',
  EXPERT_LABS = 'expert_labs'
}

export type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'hi';

export interface MentalityAnswer {
  questionId: string;
  question: string;
  answer: string;
  type: 'scenario' | 'choice' | 'scale';
}

export interface CareerRecommendation {
  title: string;
  description: string;
  whyFits: string;
  difficultyScale: number; // 1-10
  growthPotential: string;
  mindset: string;
}

export interface PersonalityReport {
  traits: { name: string; value: number }[];
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: CareerRecommendation[];
}

export interface ReadinessQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface AptitudeQuestion {
  id: string;
  text: string;
  type: 'logic' | 'verbal' | 'spatial' | 'math';
  options: string[];
  correctAnswer: number;
}

export interface ReadinessResult {
  score: number;
  total: number;
  feedback: string;
  nextSteps: string[];
  resources: { title: string; link: string }[];
}

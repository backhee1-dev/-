export interface QuestionOption {
  text: string;
  highlightText?: string;
  subText?: string;
  categoryTag?: string;
  illustrationType?: 'speaking' | 'listening' | 'office' | 'home' | 'money' | 'time' | 'solo' | 'team' | 'leader' | 'follower' | 'analytics' | 'creative' | 'process' | 'innovation' | 'stability' | 'growth' | 'chat' | 'focus';
}

export interface Question {
  id: number;
  questionTitle?: string;
  intro?: string;
  optionA: QuestionOption;
  optionB: QuestionOption;
}

export interface PersonalityResult {
  id: string;
  minACount: number;
  maxACount: number;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  strengths: string[];
  recommendedRole: string[];
  workEnvironmentAdvice: string;
  badgeColor: string;
}

export type ScreenState = 'start' | 'quiz' | 'result';

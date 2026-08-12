import { useState } from 'react';
import { ScreenState } from './types';
import { QUESTIONS } from './data/questions';
import { PERSONALITY_RESULTS } from './data/results';
import { soundFx } from './lib/sound';
import { Header } from './components/Header';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('start');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getMuted());

  // Memory-only session state for user's Gemini API key (no DB/localStorage persistence)
  const [apiKey, setApiKey] = useState<string>('');
  const [isKeyApproved, setIsKeyApproved] = useState<boolean>(false);

  const handleApproveKey = async (key: string) => {
    try {
      const res = await fetch('/api/verify-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: key }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setApiKey(key);
        setIsKeyApproved(true);
        return { success: true, message: data.message };
      } else {
        setIsKeyApproved(false);
        return { success: false, error: data.error || 'API Key 승인에 실패했습니다.' };
      }
    } catch (err) {
      setIsKeyApproved(false);
      return {
        success: false,
        error: '서버 네트워크 통신 중 오류가 발생했습니다. 다시 시도해 주세요.',
      };
    }
  };

  const handleResetKey = () => {
    setApiKey('');
    setIsKeyApproved(false);
  };

  const handleToggleMute = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const handleStartGame = () => {
    if (!isKeyApproved) {
      setScreen('start');
      return;
    }
    setCurrentIndex(0);
    setAnswers([]);
    setScreen('quiz');
  };

  const handleScrollToApiKey = () => {
    setScreen('start');
    setTimeout(() => {
      const el = document.getElementById('api-key-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSelectOption = (isA: boolean) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = isA;
    setAnswers(updatedAnswers);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Quiz completed -> calculate results
      soundFx.playSuccessSound();
      setScreen('result');
    }
  };

  const handleGoBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setAnswers((prev) => prev.slice(0, prev.length - 1));
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers([]);
    setScreen('start');
  };

  // Determine result personality type
  const getCalculatedResult = () => {
    const aCount = answers.filter((ans) => ans === true).length;
    const found = PERSONALITY_RESULTS.find(
      (res) => aCount >= res.minACount && aCount <= res.maxACount
    );
    return found || PERSONALITY_RESULTS[PERSONALITY_RESULTS.length - 1];
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans antialiased flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Background Decorative Blur Blobs */}
      <div className="fixed top-0 left-0 w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 py-4 sm:py-6 flex-1 flex flex-col justify-between">
        <Header
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onLogoClick={handleRestart}
          isKeyApproved={isKeyApproved}
          onScrollToApiKey={handleScrollToApiKey}
        />

        <main className="flex-1 flex items-center justify-center my-2">
          {screen === 'start' && (
            <StartScreen
              onStart={handleStartGame}
              apiKey={apiKey}
              isKeyApproved={isKeyApproved}
              onApproveKey={handleApproveKey}
              onResetKey={handleResetKey}
            />
          )}

          {screen === 'quiz' && (
            <QuizScreen
              question={QUESTIONS[currentIndex]}
              currentIndex={currentIndex}
              totalQuestions={QUESTIONS.length}
              onSelectOption={handleSelectOption}
              onGoBack={handleGoBack}
              canGoBack={currentIndex > 0}
            />
          )}

          {screen === 'result' && (
            <ResultScreen
              result={getCalculatedResult()}
              aCount={answers.filter((a) => a === true).length}
              totalCount={QUESTIONS.length}
              questions={QUESTIONS}
              userAnswers={answers}
              onRestart={handleRestart}
              apiKey={apiKey}
              isKeyApproved={isKeyApproved}
              onApproveKey={handleApproveKey}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-slate-400 py-3 border-t border-slate-200/60">
          <p>© {new Date().getFullYear()} 커리어 밸런스 게임 · Work Style & Career Personality Test</p>
        </footer>
      </div>
    </div>
  );
}

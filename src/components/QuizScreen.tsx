import React, { useEffect } from 'react';
import { ArrowLeft, RotateCcw, Keyboard } from 'lucide-react';
import { Question } from '../types';
import { soundFx } from '../lib/sound';
import { Illustration } from './Illustrations';

interface QuizScreenProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onSelectOption: (isA: boolean) => void;
  onGoBack: () => void;
  canGoBack: boolean;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  question,
  currentIndex,
  totalQuestions,
  onSelectOption,
  onGoBack,
  canGoBack
}) => {
  const currentNum = currentIndex + 1;
  const progressPercent = Math.round((currentNum / totalQuestions) * 100);

  // Keyboard shortcut listener (1 = A, 2 = B, Backspace = Undo)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid firing inside input fields
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === '1') {
        soundFx.playOptionSelect('A');
        onSelectOption(true);
      } else if (e.key === '2') {
        soundFx.playOptionSelect('B');
        onSelectOption(false);
      } else if (e.key === 'Backspace' && canGoBack) {
        soundFx.playBackSound();
        onGoBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelectOption, onGoBack, canGoBack]);

  const handleChooseA = () => {
    soundFx.playOptionSelect('A');
    onSelectOption(true);
  };

  const handleChooseB = () => {
    soundFx.playOptionSelect('B');
    onSelectOption(false);
  };

  const handleBack = () => {
    if (!canGoBack) return;
    soundFx.playBackSound();
    onGoBack();
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-2 animate-fadeIn">
      {/* Top Controls & Counter */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {canGoBack ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>이전 질문</span>
            </button>
          ) : (
            <span className="text-xs font-mono font-bold text-slate-400">
              QUESTION {currentNum} OF {totalQuestions}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-mono font-bold text-xs">
            {currentNum < 10 ? `0${currentNum}` : currentNum} / {totalQuestions}
          </span>
        </div>
      </div>

      {/* Animated Progress Bar */}
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-6 border border-slate-200/80">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-500 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Title Header */}
      <div className="text-center mb-6">
        <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-md mb-2 inline-block">
          {question.intro || "둘 중 더 끌리는 선택지를 고르세요"}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
          Q{currentNum}. {question.questionTitle || "어느 쪽에 더 끌리나요?"}
        </h2>
      </div>

      {/* Split Comparison Cards Container (Comic Balance Game Style) */}
      <div className="relative mb-6 rounded-2xl border-3 border-slate-900 bg-slate-900 p-2 sm:p-3 shadow-2xl shadow-slate-300 overflow-hidden">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative">
          
          {/* OPTION A CARD */}
          <button
            onClick={handleChooseA}
            className="group relative bg-gradient-to-b from-blue-600 to-indigo-800 text-white p-4 sm:p-5 rounded-xl text-left border-2 border-blue-400/40 hover:border-yellow-400 transition-all duration-150 hover:scale-[1.01] active:scale-[0.98] cursor-pointer shadow-lg flex flex-col justify-between"
          >
            {/* Header Badge */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="bg-yellow-400 text-slate-950 font-black px-3 py-1 rounded-md text-xs sm:text-sm tracking-wider shadow-sm">
                A 선택
              </span>
              {question.optionA.categoryTag && (
                <span className="text-xs font-bold text-blue-100 bg-blue-900/80 px-2.5 py-0.5 rounded-full border border-blue-400/30">
                  {question.optionA.categoryTag}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-extrabold text-lg sm:text-xl text-white mb-2 leading-snug group-hover:text-yellow-200 transition-colors">
              {question.optionA.text}
            </h3>

            {/* Illustration Canvas */}
            <div className="my-3 rounded-lg bg-slate-950/40 p-2 border border-blue-400/20 group-hover:border-yellow-400/50 transition-colors">
              <Illustration type={question.optionA.illustrationType} accentColor="blue" className="h-36 sm:h-40" />
            </div>

            {/* Footer Highlight */}
            {question.optionA.subText && (
              <div className="mt-2 bg-blue-950/60 p-2.5 rounded-lg border border-blue-400/20 text-xs font-semibold text-blue-100">
                👉 {question.optionA.subText}
              </div>
            )}

            {/* Click Hover Hint overlay */}
            <div className="mt-3 text-center opacity-80 group-hover:opacity-100 transition-opacity">
              <span className="inline-block bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full border border-white/30 group-hover:bg-yellow-400 group-hover:text-slate-950 transition-colors">
                1번 키 또는 A 클릭하기
              </span>
            </div>
          </button>

          {/* VS BADGE IN MIDDLE */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex w-14 h-14 bg-yellow-400 text-slate-950 rounded-full items-center justify-center font-black text-xl border-4 border-slate-900 shadow-2xl transform -rotate-12 animate-pulse">
            VS
          </div>

          {/* OPTION B CARD */}
          <button
            onClick={handleChooseB}
            className="group relative bg-gradient-to-b from-rose-600 to-pink-800 text-white p-4 sm:p-5 rounded-xl text-left border-2 border-rose-400/40 hover:border-yellow-400 transition-all duration-150 hover:scale-[1.01] active:scale-[0.98] cursor-pointer shadow-lg flex flex-col justify-between"
          >
            {/* Header Badge */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="bg-yellow-400 text-slate-950 font-black px-3 py-1 rounded-md text-xs sm:text-sm tracking-wider shadow-sm">
                B 선택
              </span>
              {question.optionB.categoryTag && (
                <span className="text-xs font-bold text-rose-100 bg-rose-900/80 px-2.5 py-0.5 rounded-full border border-rose-400/30">
                  {question.optionB.categoryTag}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="font-extrabold text-lg sm:text-xl text-white mb-2 leading-snug group-hover:text-yellow-200 transition-colors">
              {question.optionB.text}
            </h3>

            {/* Illustration Canvas */}
            <div className="my-3 rounded-lg bg-slate-950/40 p-2 border border-rose-400/20 group-hover:border-yellow-400/50 transition-colors">
              <Illustration type={question.optionB.illustrationType} accentColor="pink" className="h-36 sm:h-40" />
            </div>

            {/* Footer Highlight */}
            {question.optionB.subText && (
              <div className="mt-2 bg-rose-950/60 p-2.5 rounded-lg border border-rose-400/20 text-xs font-semibold text-rose-100">
                👉 {question.optionB.subText}
              </div>
            )}

            {/* Click Hover Hint overlay */}
            <div className="mt-3 text-center opacity-80 group-hover:opacity-100 transition-opacity">
              <span className="inline-block bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full border border-white/30 group-hover:bg-yellow-400 group-hover:text-slate-950 transition-colors">
                2번 키 또는 B 클릭하기
              </span>
            </div>
          </button>

        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <Keyboard className="w-4 h-4 text-indigo-600" />
          <span>키보드 <strong className="text-slate-900">1 (A)</strong> / <strong className="text-slate-900">2 (B)</strong> 번 선택 가능</span>
        </div>

        {canGoBack && (
          <button
            onClick={handleBack}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-900 font-bold transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>이전으로 되돌리기</span>
          </button>
        )}
      </div>
    </div>
  );
};

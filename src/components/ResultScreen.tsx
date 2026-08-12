import React, { useState } from 'react';
import { Share2, RotateCcw, ExternalLink, CheckCircle2, Award, Briefcase, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { PersonalityResult, Question } from '../types';
import { soundFx } from '../lib/sound';
import { AiCareerCoach } from './AiCareerCoach';

interface ResultScreenProps {
  result: PersonalityResult;
  aCount: number;
  totalCount: number;
  questions: Question[];
  userAnswers: boolean[]; // true = A, false = B
  onRestart: () => void;
  apiKey: string;
  isKeyApproved: boolean;
  onApproveKey: (key: string) => Promise<{ success: boolean; message?: string; error?: string }>;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  aCount,
  totalCount,
  questions,
  userAnswers,
  onRestart,
  apiKey,
  isKeyApproved,
  onApproveKey,
}) => {
  const bCount = totalCount - aCount;
  const aPercent = Math.round((aCount / totalCount) * 100);
  const bPercent = 100 - aPercent;

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleShare = () => {
    soundFx.playSoftClick();
    const shareText = `[커리어 밸런스 게임 결과]\n나의 커리어 타입: ${result.emoji} ${result.title}\n"A 선택 ${aCount}회 / B 선택 ${bCount}회"\n\n나의 커리어 성향도 테스트해보세요!`;

    if (navigator.share) {
      navigator.share({
        title: '커리어 밸런스 게임 결과',
        text: shareText,
        url: window.location.href,
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(`${shareText}\n${window.location.href}`).then(() => {
        triggerToast('결과가 클립보드에 복사되었습니다! 📋');
      });
    } else {
      window.prompt('아래 문구를 복사해서 친구들과 공유하세요:', shareText);
    }
  };

  const handleRestart = () => {
    soundFx.playSoftClick();
    onRestart();
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-2 animate-fadeIn relative">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-2xl flex items-center gap-2 border border-slate-700 animate-bounce">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Badge Section */}
      <div className="text-center mb-8">
        <div className="inline-block p-4 rounded-3xl bg-slate-100 border border-slate-200 text-6xl mb-4 shadow-inner">
          {result.emoji}
        </div>

        <div className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase mb-1">
          MY CAREER PERSONALITY
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">
          <span className={`bg-gradient-to-r ${result.badgeColor} bg-clip-text text-transparent`}>
            {result.title}
          </span>
        </h1>

        <p className="text-sm sm:text-base font-semibold text-slate-600 max-w-lg mx-auto">
          {result.subtitle}
        </p>
      </div>

      {/* Ratio Bar Card */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl mb-6 shadow-xl border border-slate-800">
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="text-blue-300">A 선택: {aCount}회 ({aPercent}%)</span>
          <span className="text-rose-300">B 선택: {bCount}회 ({bPercent}%)</span>
        </div>

        <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden flex p-0.5 border border-slate-700 mb-3">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-l-full transition-all duration-500"
            style={{ width: `${aPercent}%` }}
          />
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-r-full transition-all duration-500"
            style={{ width: `${bPercent}%` }}
          />
        </div>

        <p className="text-xs text-slate-300 text-center font-medium leading-relaxed">
          {result.description}
        </p>
      </div>

      {/* Traits & Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        
        {/* Key Strengths */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-5 h-5 text-indigo-600" />
            <h3 className="font-extrabold text-slate-900 text-base">핵심 강점</h3>
          </div>
          <ul className="space-y-2">
            {result.strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Roles */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-5 h-5 text-purple-600" />
            <h3 className="font-extrabold text-slate-900 text-base">추천 직무 분야</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.recommendedRole.map((role, idx) => (
              <span
                key={idx}
                className="bg-white border border-slate-200 text-slate-800 font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Work Environment Advice */}
      <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl mb-6">
        <h4 className="font-extrabold text-amber-900 text-sm mb-1.5 flex items-center gap-1.5">
          <span>💡 추천 근무 환경 & 커리어 팁</span>
        </h4>
        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
          {result.workEnvironmentAdvice}
        </p>
      </div>

      {/* Answer History Accordion Toggle */}
      <div className="mb-6 border border-slate-200 rounded-2xl bg-white overflow-hidden">
        <button
          onClick={() => {
            soundFx.playSoftClick();
            setShowDetails(!showDetails);
          }}
          className="w-full px-5 py-3.5 flex items-center justify-between text-left font-extrabold text-sm text-slate-800 hover:bg-slate-50 transition cursor-pointer"
        >
          <span>📋 내가 선택한 10개 문항 상세보기</span>
          {showDetails ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </button>

        {showDetails && (
          <div className="p-4 border-t border-slate-200 space-y-3 bg-slate-50/50 max-h-80 overflow-y-auto">
            {questions.map((q, idx) => {
              const userChoseA = userAnswers[idx];
              return (
                <div key={q.id} className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                  <div className="font-bold text-slate-900 mb-1">
                    Q{idx + 1}. {q.questionTitle || q.optionA.text}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className={`p-2 rounded-lg border ${userChoseA ? 'bg-blue-50 border-blue-300 font-bold text-blue-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                      A: {q.optionA.highlightText || q.optionA.text} {userChoseA && '✅ (선택)'}
                    </div>
                    <div className={`p-2 rounded-lg border ${!userChoseA ? 'bg-rose-50 border-rose-300 font-bold text-rose-900' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                      B: {q.optionB.highlightText || q.optionB.text} {!userChoseA && '✅ (선택)'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* GEMINI AI CAREER COACH SECTION */}
      <AiCareerCoach
        apiKey={apiKey}
        isKeyApproved={isKeyApproved}
        resultTitle={result.title}
        resultSubtitle={result.subtitle}
        selectedAnswers={questions.map((q, idx) => ({
          question: q.questionTitle || q.optionA.text,
          chosen: userAnswers[idx] ? q.optionA.text : q.optionB.text,
        }))}
        onApproveKey={onApproveKey}
      />

      {/* 1:1 Counseling Banner CTA */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 p-6 rounded-3xl text-white mb-6 shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <span className="bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full border border-white/30 mb-2 inline-block">
            무료 전문 서비스
          </span>
          <h3 className="text-xl sm:text-2xl font-black mb-2">
            전문 취업 컨설턴트와의 1:1 진로 상담
          </h3>
          <p className="text-xs sm:text-sm text-indigo-100 mb-4 leading-relaxed max-w-lg">
            테스트 결과를 바탕으로 나에게 꼭 맞는 구직 전략과 커리어 로드맵을 취업담당 선생님과 1:1로 세워보세요.
          </p>
          <a
            href="https://www.workplus.go.kr/survey.do"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playSoftClick()}
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-sm px-6 py-3 rounded-2xl shadow-md transition transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>1:1 진로상담 신청하기</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Bottom Action Row */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleShare}
          className="flex-1 py-3.5 px-4 rounded-2xl border-2 border-slate-900 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
        >
          <Share2 className="w-4 h-4" />
          <span>결과 공유하기</span>
        </button>

        <button
          onClick={handleRestart}
          className="flex-1 py-3.5 px-4 rounded-2xl border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" />
          <span>다시 해보기</span>
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Play, Sparkles, Clock, CheckCircle2, Zap, HelpCircle, ChevronDown, ChevronUp, ArrowRight, Volume2, Compass, Lightbulb, Users, Award, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { soundFx } from '../lib/sound';
import { Illustration } from './Illustrations';
import { PERSONALITY_RESULTS } from '../data/results';
import { ApiKeySection } from './ApiKeySection';

interface StartScreenProps {
  onStart: () => void;
  apiKey: string;
  isKeyApproved: boolean;
  onApproveKey: (key: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  onResetKey: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStart,
  apiKey,
  isKeyApproved,
  onApproveKey,
  onResetKey,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showLockNotice, setShowLockNotice] = useState<boolean>(false);

  const scrollToApiKey = () => {
    soundFx.playSoftClick();
    const el = document.getElementById('api-key-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStart = () => {
    soundFx.playSoftClick();
    if (!isKeyApproved) {
      setShowLockNotice(true);
      scrollToApiKey();
      return;
    }
    onStart();
  };

  const toggleFaq = (idx: number) => {
    soundFx.playSoftClick();
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const scrollToFeatures = () => {
    soundFx.playSoftClick();
    const el = document.getElementById('features-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      q: '테스트 이용료가 있거나 회원가입이 필요한가요?',
      a: '아닙니다! 회원가입 및 비용 결제 없이 100% 무료로 누구나 즉시 테스트에 참여하고 결과를 확인하실 수 있습니다.'
    },
    {
      q: '테스트 소요 시간은 얼마나 걸리나요?',
      a: '직관적인 10개의 A/B 밸런스 질문으로 구성되어 있어 약 2~3분 정도면 부담 없이 완료할 수 있습니다.'
    },
    {
      q: '결과를 진로 및 취업 준비에 어떻게 활용할 수 있나요?',
      a: '결과 페이지에서 나의 핵심 강점, 추천 직무 분야, 근무 환경 팁을 확인하여 자기소개서 작성 및 면접 준비 시 나만의 일하는 스타일 강점으로 어필할 수 있습니다. 또한 1:1 전문 진로상담 무료 신청과도 바로 연계됩니다.'
    },
    {
      q: '효과음 소리를 끄거나 켤 수 있나요?',
      a: '네! 상단 헤더 우측의 [효과음 켜짐/끔] 토글 버튼을 누르면 언제든지 음소거할 수 있으며, 음소거 상태는 자동으로 저장됩니다.'
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto py-2 animate-fadeIn space-y-10">
      
      {/* MENU LOCK / UNLOCK STATUS BANNER */}
      {!isKeyApproved ? (
        <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl text-amber-950 text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-200/80 text-amber-800 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-amber-900 block">[메뉴 잠김 안내] Gemini API Key 승인 필요</span>
              <span className="text-amber-800 text-xs font-medium">API Key를 승인받으셔야 커리어 밸런스 게임 및 모든 기능 메뉴를 이용할 수 있습니다.</span>
            </div>
          </div>
          <button
            onClick={scrollToApiKey}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white text-xs px-3.5 py-2 rounded-xl font-black shrink-0 cursor-pointer transition flex items-center justify-center gap-1 shadow-xs"
          >
            <span>Key 승인하러 가기</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl text-emerald-950 text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-200/80 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-emerald-900 block">[승인 완료] 모든 메뉴 잠금해제됨</span>
              <span className="text-emerald-800 text-xs font-medium">Gemini API Key 승인이 완료되었습니다. 자유롭게 테스트와 AI 코칭 메뉴를 이용하세요!</span>
            </div>
          </div>
          <button
            onClick={handleStart}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-4 py-2 rounded-xl font-black shrink-0 cursor-pointer transition flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>게임 시작하기</span>
            <Play className="w-3.5 h-3.5 fill-white" />
          </button>
        </div>
      )}

      {/* 1. HERO BANNER SECTION */}
      <section className="text-center pt-2 pb-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
          <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
          <span>WORK STYLE & CAREER PERSONALITY TEST</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight mb-4 tracking-tight">
          나의 진짜 일하는 스타일을 찾는 시간,<br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 bg-clip-text text-transparent">
            커리어 밸런스 게임
          </span>
        </h1>
        
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8 font-medium">
          둘 중 하나만 꼭 골라야 한다면?<br className="hidden sm:block" />
          10가지 직장생활 밸런스 질문을 통해 나만의 커리어 캐릭터, 핵심 강점, 추천 직무와 1:1 진로상담 가이드를 확인해보세요!
        </p>

        {/* Quick Stats Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 max-w-2xl mx-auto">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center">
            <Clock className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
            <div className="text-xs text-slate-500 font-medium">소요 시간</div>
            <div className="text-sm font-extrabold text-slate-800">약 2~3분</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
            <div className="text-xs text-slate-500 font-medium">문항 구성</div>
            <div className="text-sm font-extrabold text-slate-800">10개 A/B 질문</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center">
            <Zap className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <div className="text-xs text-slate-500 font-medium">인터렉션</div>
            <div className="text-sm font-extrabold text-slate-800">사운드 & 단축키</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-center">
            <Award className="w-5 h-5 text-rose-500 mx-auto mb-1" />
            <div className="text-xs text-slate-500 font-medium">진단 결과</div>
            <div className="text-sm font-extrabold text-slate-800">4가지 캐릭터</div>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <button
            onClick={handleStart}
            className={`w-full sm:flex-1 py-4 px-6 rounded-2xl text-white font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer group border ${
              isKeyApproved
                ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 shadow-slate-300'
                : 'bg-amber-600 hover:bg-amber-700 border-amber-500 shadow-amber-200'
            }`}
          >
            {isKeyApproved ? (
              <>
                <span>🚀 바로 테스트 시작하기</span>
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 text-amber-200" />
                <span>🔒 API Key 승인 후 사용 가능</span>
              </>
            )}
          </button>

          <button
            onClick={scrollToFeatures}
            className="w-full sm:w-auto py-4 px-5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <span>앱 특징 알아보기</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </section>

      {/* API KEY ACTIVATION SECTION */}
      <section id="api-key-section" className="scroll-mt-6">
        {showLockNotice && !isKeyApproved && (
          <div className="mb-3 p-3.5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-900 text-xs font-extrabold flex items-center gap-2.5 animate-bounce">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>🔒 메뉴 및 테스트를 사용하기 위해 아래에서 Gemini API Key를 먼저 입력 및 승인받아 주세요!</span>
          </div>
        )}
        <ApiKeySection
          apiKey={apiKey}
          isApproved={isKeyApproved}
          onApproveKey={onApproveKey}
          onResetKey={onResetKey}
        />
      </section>


      {/* 2. INTERACTIVE BALANCE GAME PREVIEW */}
      <section className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              게임 미리보기 : Q1. 회의 스타일 선택
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-400">10문항 중 1번 예시</span>
        </div>

        {/* Visual Split Card */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-slate-900 bg-slate-900 p-2 sm:p-3 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 relative">
            
            {/* Card A Preview */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-4 rounded-xl flex flex-col justify-between border border-blue-400/30">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-yellow-400 text-slate-950 font-black px-2.5 py-0.5 rounded-md text-xs">
                  OPTION A
                </span>
                <span className="text-xs font-bold text-blue-100 bg-blue-900/80 px-2 py-0.5 rounded-md">
                  발표자 스타일
                </span>
              </div>
              
              <h3 className="font-extrabold text-base mb-2 text-white">
                A. 본인만 30분 동안 계속 말하는 회의
              </h3>
              
              <div className="my-2 rounded-lg bg-slate-950/40 p-2 border border-blue-400/20">
                <Illustration type="speaking" accentColor="blue" className="h-32" />
              </div>

              <p className="text-xs text-blue-100 font-medium bg-blue-950/50 p-2 rounded-md border border-blue-400/10">
                ⚡ 직접 준비하여 주도적으로 의견 제시
              </p>
            </div>

            {/* VS Badge in Middle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-yellow-400 text-slate-950 rounded-full flex items-center justify-center font-black text-lg border-4 border-slate-900 shadow-xl transform -rotate-12 animate-pulse">
              VS
            </div>

            {/* Card B Preview */}
            <div className="bg-gradient-to-br from-rose-600 to-pink-800 text-white p-4 rounded-xl flex flex-col justify-between border border-rose-400/30">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-yellow-400 text-slate-950 font-black px-2.5 py-0.5 rounded-md text-xs">
                  OPTION B
                </span>
                <span className="text-xs font-bold text-rose-100 bg-rose-900/80 px-2 py-0.5 rounded-md">
                  경청자 스타일
                </span>
              </div>
              
              <h3 className="font-extrabold text-base mb-2 text-white">
                B. 3시간 동안 계속 상사의 발표를 듣기만 하는 회의
              </h3>

              <div className="my-2 rounded-lg bg-slate-950/40 p-2 border border-rose-400/20">
                <Illustration type="listening" accentColor="pink" className="h-32" />
              </div>

              <p className="text-xs text-rose-100 font-medium bg-rose-950/50 p-2 rounded-md border border-rose-400/10">
                😴 긴 발표 경청 & 방전되는 집중력
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* 3. APP STRENGTHS & FEATURES SECTION */}
      <section id="features-section" className="space-y-6">
        <div className="text-center">
          <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            SPECIAL FEATURES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            커리어 밸런스 게임의 4가지 차별점
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            단순 재미를 넘어 실질적인 진로 기획까지 도와드리는 핵심 강점
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-300 transition group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg mb-2">
              1. 직관적인 A/B 밸런스 선택
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              딱딱하고 지루한 진단 검사지 대신, 흥미로운 극단적 직장생활 상황 중 하나를 가볍게 선택하여 2~3분 만에 완료할 수 있습니다.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-purple-300 transition group">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg mb-2">
              2. 질문마다 펼쳐지는 맞춤 일러스트
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              10개 질문마다 선택 상황을 한눈에 보여주는 센스 있는 벡터 일러스트가 탑재되어 몰입감 높게 즐길 수 있습니다.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-300 transition group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Volume2 className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg mb-2">
              3. 경쾌한 효과음 & 키보드 단축키
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Web Audio API 기반의 은은한 사운드 피드백과 함께 키보드 숫자키 1번(A), 2번(B) 단축키 지원으로 더욱 빠른 조작이 가능합니다.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-rose-300 transition group">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg mb-2">
              4. 1:1 무료 취업 진로상담 연계
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              테스트 결과를 마친 후, 분석 리포트 내용으로 고용노동부 워크플러스 취업 컨설턴트 선생님과의 1:1 무료 상담으로 곧바로 이어집니다.
            </p>
          </div>

        </div>
      </section>


      {/* 4. CAREER PERSONALITY TYPES PREVIEW */}
      <section className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
        <div className="text-center">
          <span className="text-xs font-mono font-bold text-yellow-400 uppercase tracking-widest bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-full">
            DIAGNOSIS TYPES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
            4가지 커리어 캐릭터 미리보기
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            선택 비율에 따라 나에게 딱 맞는 일하는 타입이 매칭됩니다
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PERSONALITY_RESULTS.map((res) => (
            <div
              key={res.id}
              className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 hover:border-slate-500 transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl p-2 bg-slate-900 rounded-xl border border-slate-700 shrink-0">
                  {res.emoji}
                </span>
                <div>
                  <h3 className="font-black text-white text-base leading-tight">
                    {res.title}
                  </h3>
                  <span className="text-xs text-indigo-300 font-medium">
                    A 선택 {res.minACount}~{res.maxACount}회 구간
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium mt-2">
                {res.subtitle}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* 5. WHO IS THIS FOR */}
      <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 sm:p-8 rounded-3xl border border-indigo-100 space-y-6">
        <div className="text-center">
          <span className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-indigo-200">
            TARGET AUDIENCE
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            이런 분들에게 꼭 추천해요!
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-base mb-3">
              01
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mb-1">
              직무적성을 파악하려는 분
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              내가 어떤 환경과 스타일에서 가장 빛을 발하는지 직관적으로 알아보고 싶을 때
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-base mb-3">
              02
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mb-1">
              자소서/면접을 준비하는 분
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              자기소개서와 면접 질문에서 나의 일하는 스타일과 강점 키워드를 명확히 정립할 때
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-base mb-3">
              03
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mb-1">
              동료/스터디원과 공유할 분
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              서로의 일하는 스타일과 협업 밸런스 성향을 재미있게 공유하고 이해하고 싶을 때
            </p>
          </div>
        </div>
      </section>


      {/* 6. FAQ SECTION */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-extrabold text-slate-900">
            자주 묻는 질문 (FAQ)
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left font-extrabold text-sm text-slate-800 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer"
                >
                  <span>Q. {faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>


      {/* 7. BOTTOM STICKY CTA BANNER */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 rounded-3xl text-center shadow-2xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <span className="bg-yellow-400 text-slate-950 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
            READY TO START?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            지금 바로 나의 커리어 성향을 진단해보세요!
          </h2>
          <p className="text-slate-300 text-sm max-w-md mx-auto font-medium">
            10개 질문, 단 2분 투자로 나에게 딱 맞는 일하는 캐릭터와 무료 1:1 상담 기회까지 확인해보세요.
          </p>
          <button
            onClick={handleStart}
            className={`mt-2 inline-flex items-center gap-3 py-4 px-8 rounded-2xl font-black text-base shadow-xl transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer ${
              isKeyApproved
                ? 'bg-yellow-400 hover:bg-yellow-300 text-slate-950'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
            }`}
          >
            <span>{isKeyApproved ? '🚀 바로 테스트 시작하기' : '🔒 Key 승인 후 테스트 시작하기'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

    </div>
  );
};

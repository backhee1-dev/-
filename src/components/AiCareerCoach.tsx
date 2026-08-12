import React, { useState } from 'react';
import { Bot, Sparkles, Loader2, Key, ChevronDown, ChevronUp, RefreshCw, AlertCircle, CheckCircle2, ShieldCheck, Eye, EyeOff, Lock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { soundFx } from '../lib/sound';

interface AiCareerCoachProps {
  apiKey: string;
  isKeyApproved: boolean;
  resultTitle: string;
  resultSubtitle: string;
  selectedAnswers: { question: string; chosen: string }[];
  onApproveKey: (key: string) => Promise<{ success: boolean; message?: string; error?: string }>;
}

export const AiCareerCoach: React.FC<AiCareerCoachProps> = ({
  apiKey,
  isKeyApproved,
  resultTitle,
  resultSubtitle,
  selectedAnswers,
  onApproveKey,
}) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Inline Key Activation State if not approved yet
  const [inlineKey, setInlineKey] = useState<string>(apiKey || '');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isActivatingKey, setIsActivatingKey] = useState<boolean>(false);
  const [inlineFeedback, setInlineFeedback] = useState<string | null>(null);

  const handleGenerateReport = async () => {
    soundFx.playSoftClick();
    setIsLoading(true);
    setErrorMsg(null);

    let generatedText = '';

    try {
      // 1. Try server API route
      const res = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey,
          resultTitle,
          resultSubtitle,
          selectedAnswers,
        }),
      });

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (res.ok && data.success && data.analysis) {
          generatedText = data.analysis;
        } else if (data.error) {
          setErrorMsg(data.error);
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      // Ignore server route error and fallback to client-side call
    }

    // 2. Client-side SDK Fallback if server route did not return text
    if (!generatedText && apiKey) {
      try {
        const { GoogleGenAI } = await import('@google/genai');
        const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
        const prompt = `당신은 대한민국 최고 명성의 커리어 컨설턴트이자 HR 인사 전략 전문가입니다.
사용자가 '커리어 밸런스 게임'을 완료하였으며 진단 결과는 다음과 같습니다:

[사용자 진단 프로필]
- 커리어 유형: ${resultTitle || "커리어 모험가"}
- 서브 타이틀: ${resultSubtitle || "일하는 스타일 진단 완료"}
${selectedAnswers ? `- 주요 밸런스 선택 데이터: ${JSON.stringify(selectedAnswers)}` : ""}

위 성향 데이터를 바탕으로 사용자에게 실질적인 도움을 주는 [맞춤형 커리어 코칭 및 스케일업 분석 리포트]를 작성해 주세요.
반드시 아래 4개 파트를 구체적이고 다정한 마크다운(Markdown) 문서 형태로 구성해 주세요:

### 🌟 1. 나만의 핵심 업무 강점 분석
- 이 캐릭터가 실제 조직과 업무 현장에서 발휘하는 차별화된 핵심 능력 3가지

### 🏢 2. 최적의 조직 문화 & 추천 직무
- 주도성을 높일 수 있는 조직 분위기와 시너지를 발휘할 만한 직무 분야

### 📝 3. 자기소개서 & 면접 핵심 어필 팁
- 서류 작성 및 면접 시 나만의 일하는 스타일을 강점으로 호감 있게 전달하는 구체적 문장 예시

### 🚀 4. 커리어 스케일업 성장 가이드
- 직장생활과 장기 커리어 발전 과정에서 기억해야 할 따뜻하고 실용적인 조언`;

        const modelsToTry = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];
        for (const m of modelsToTry) {
          try {
            const response = await ai.models.generateContent({
              model: m,
              contents: prompt,
            });
            if (response && response.text) {
              generatedText = response.text;
              break;
            }
          } catch (e: any) {
            const msg = String(e?.message || '');
            if (
              msg.includes('API_KEY_INVALID') ||
              msg.includes('API key not valid') ||
              msg.includes('UNAUTHENTICATED') ||
              msg.includes('PERMISSION_DENIED')
            ) {
              throw e;
            }
          }
        }
      } catch (clientErr: any) {
        setErrorMsg(`AI 커리어 분석 생성 중 오류가 발생했습니다: ${clientErr?.message || ''}`);
        setIsLoading(false);
        return;
      }
    }

    if (generatedText) {
      soundFx.playSuccessSound();
      setAnalysis(generatedText);
    } else if (!errorMsg) {
      setErrorMsg('AI 커리어 분석을 생성하지 못했습니다. 다시 시도해 주세요.');
    }

    setIsLoading(false);
  };

  const handleInlineActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineKey.trim()) {
      setInlineFeedback('API Key를 입력해 주세요.');
      return;
    }

    soundFx.playSoftClick();
    setIsActivatingKey(true);
    setInlineFeedback(null);

    const res = await onApproveKey(inlineKey.trim());
    setIsActivatingKey(false);

    if (res.success) {
      soundFx.playSuccessSound();
      setInlineFeedback(null);
    } else {
      setInlineFeedback(res.error || '유효하지 않은 API Key입니다.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-xl border border-indigo-900/60 mb-6 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-yellow-400 uppercase tracking-widest bg-yellow-400/10 px-2.5 py-0.5 rounded-full border border-yellow-400/20">
                  GEMINI 2.0 FLASH AI
                </span>
                {isKeyApproved && (
                  <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Key 승인됨</span>
                  </span>
                )}
              </div>
              <h3 className="font-extrabold text-white text-lg sm:text-xl mt-0.5">
                AI 맞춤 커리어 코칭 & 심층 분석 리포트
              </h3>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed font-medium">
          사용자의 밸런스 선택 성향 데이터와 캐릭터 유형을 바탕으로 Google Gemini AI가 나만을 위한 핵심 강점, 기업 문화 적합성, 자소서 어필 팁 및 커리어 로드맵을 1:1 코칭해 드립니다.
        </p>

        {/* If Key is NOT Approved -> Show Inline Key Approval Box */}
        {!isKeyApproved ? (
          <div className="bg-slate-800/90 p-5 rounded-2xl border border-indigo-500/30 space-y-3">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold">
              <Key className="w-4 h-4 text-yellow-400" />
              <span>AI 분석을 위해 Gemini API Key 승인이 필요합니다</span>
            </div>

            <form onSubmit={handleInlineActivate} className="space-y-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={inlineKey}
                  onChange={(e) => setInlineKey(e.target.value)}
                  placeholder="Gemini API Key 입력 (AIzaSy...)"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-900 border border-slate-700 focus:border-indigo-400 text-white rounded-xl text-xs outline-none font-mono placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isActivatingKey || !inlineKey.trim()}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
              >
                {isActivatingKey ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>서버에서 Key 승인 중...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                    <span>API Key 승인하고 AI 분석 시작하기</span>
                  </>
                )}
              </button>
            </form>

            {inlineFeedback && (
              <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-200 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{inlineFeedback}</span>
              </div>
            )}

            <p className="text-[11px] text-slate-400">
              🔒 입력하신 API Key는 세션 메모리에서만 사용되며 서버/DB에 저장되지 않습니다.
            </p>
          </div>
        ) : (
          /* Key is Approved -> Show Generate Button or Report */
          <div>
            {!analysis && (
              <button
                onClick={handleGenerateReport}
                disabled={isLoading}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-amber-500/20 transition transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                    <span>Gemini AI가 맞춤 리포트를 심층 분석 중입니다...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-slate-950" />
                    <span>실시간 AI 맞춤 커리어 리포트 생성하기</span>
                  </>
                )}
              </button>
            )}

            {errorMsg && (
              <div className="mt-4 p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-200 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {analysis && (
              <div className="mt-4 bg-slate-950/80 p-5 sm:p-6 rounded-2xl border border-indigo-500/40 text-slate-100 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs font-extrabold text-yellow-400">
                      Gemini AI 커리어 리포트 완제
                    </span>
                  </div>
                  <button
                    onClick={handleGenerateReport}
                    disabled={isLoading}
                    className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    <span>다시 분석</span>
                  </button>
                </div>

                <div className="markdown-body text-xs sm:text-sm leading-relaxed space-y-3 font-medium text-slate-200">
                  <ReactMarkdown>{analysis}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

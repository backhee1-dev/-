import React, { useState } from 'react';
import { Key, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2, ShieldCheck, Lock, Sparkles, RefreshCw } from 'lucide-react';
import { soundFx } from '../lib/sound';

interface ApiKeySectionProps {
  apiKey: string;
  isApproved: boolean;
  onApproveKey: (key: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  onResetKey: () => void;
}

export const ApiKeySection: React.FC<ApiKeySectionProps> = ({
  apiKey,
  isApproved,
  onApproveKey,
  onResetKey,
}) => {
  const [inputKey, setInputKey] = useState<string>(apiKey || '');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null; text: string }>({
    type: isApproved ? 'success' : null,
    text: isApproved ? 'Gemini API Key가 검증 및 승인되었습니다.' : '',
  });

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim()) {
      setFeedback({ type: 'error', text: 'Gemini API Key를 입력해 주세요.' });
      return;
    }

    soundFx.playSoftClick();
    setIsLoading(true);
    setFeedback({ type: null, text: '' });

    const res = await onApproveKey(inputKey.trim());
    setIsLoading(false);

    if (res.success) {
      soundFx.playSuccessSound();
      setFeedback({
        type: 'success',
        text: res.message || '✅ Gemini API Key 유효성 검증 및 승인이 완료되었습니다!',
      });
    } else {
      let errText = res.error || '유효하지 않거나 권한이 없는 Gemini API Key입니다.';
      if (
        errText.includes('{') ||
        errText.includes('error') ||
        errText.includes('code') ||
        errText.includes('404') ||
        errText.includes('models/') ||
        errText.includes('API Key 검증 오류')
      ) {
        errText = '유효하지 않거나 권한이 없는 Gemini API Key입니다. 입력하신 Key를 다시 확인해 주세요.';
      }
      setFeedback({
        type: 'error',
        text: errText,
      });
    }
  };

  const handleReset = () => {
    soundFx.playSoftClick();
    setInputKey('');
    setFeedback({ type: null, text: '' });
    onResetKey();
  };

  return (
    <div className="bg-white p-6 sm:p-7 rounded-3xl border border-indigo-100 shadow-md transition-all hover:border-indigo-200">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <span>Gemini API Key 활성화 및 승인</span>
              {isApproved && (
                <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>승인 완료</span>
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              인공지능 실시간 커리어 코칭 및 심층 리포트를 사용하기 위한 API Key 승인
            </p>
          </div>
        </div>

        {isApproved && (
          <button
            onClick={handleReset}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition cursor-pointer"
            title="키 재설정"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">재설정</span>
          </button>
        )}
      </div>

      {/* Form Area */}
      <form onSubmit={handleVerify} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Lock className="w-4 h-4" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            disabled={isLoading || isApproved}
            placeholder="AI Studio 또는 Google Cloud Gemini API Key 입력 (AIzaSy...)"
            className={`w-full pl-10 pr-12 py-3.5 bg-slate-50 border ${
              isApproved
                ? 'border-emerald-300 bg-emerald-50/30 text-emerald-900 font-mono'
                : 'border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-900'
            } rounded-2xl text-xs sm:text-sm transition outline-none font-medium placeholder:text-slate-400`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            title={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Action Button */}
        {!isApproved ? (
          <button
            type="submit"
            disabled={isLoading || !inputKey.trim()}
            className="w-full py-3.5 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-100 transition active:scale-[0.99] cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>백엔드 서버 대 서버 검증 중...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>유효성 확인 및 승인하기</span>
              </>
            )}
          </button>
        ) : (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl text-xs font-bold text-emerald-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Gemini AI 커리어 코치 및 맞춤 리포트 기능이 활성화되었습니다!</span>
            </div>
          </div>
        )}
      </form>

      {/* Feedback Alert Area */}
      {feedback.text && !isApproved && (
        <div
          className={`mt-4 p-3.5 rounded-2xl text-xs font-extrabold flex items-start gap-2.5 border ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          )}
          <span className="leading-relaxed">{feedback.text}</span>
        </div>
      )}

      {/* Security Statement Notice */}
      <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between font-medium">
        <span className="flex items-center gap-1 text-slate-600">
          <span>🔒 입력하신 API Key는 서버나 DB에 저장되지 않으며, 세션 종료 시 즉시 파기됩니다.</span>
        </span>
      </div>
    </div>
  );
};

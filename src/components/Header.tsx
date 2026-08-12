import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundFx } from '../lib/sound';

interface HeaderProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onLogoClick?: () => void;
  isKeyApproved?: boolean;
  onScrollToApiKey?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isMuted,
  onToggleMute,
  onLogoClick,
  isKeyApproved = false,
  onScrollToApiKey,
}) => {
  return (
    <header className="w-full flex items-center justify-between py-4 px-2 mb-2 border-b border-slate-200/80">
      <button
        onClick={() => {
          soundFx.playSoftClick();
          onLogoClick?.();
        }}
        className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl p-1 transition"
      >
        <div className="w-9 h-9 rx-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-mono font-bold tracking-wider text-slate-400 block uppercase">
            CAREER BALANCE
          </span>
          <span className="text-base font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors">
            커리어 밸런스 게임
          </span>
        </div>
      </button>

      <div className="flex items-center gap-2">
        {/* API Key Status Pill */}
        <button
          onClick={() => {
            soundFx.playSoftClick();
            onScrollToApiKey?.();
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all border cursor-pointer ${
            isKeyApproved
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 shadow-xs'
              : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100 shadow-xs animate-pulse'
          }`}
          title={isKeyApproved ? "API Key 승인 완료 (모든 메뉴 잠금해제)" : "API Key 승인 필요 (메뉴 잠김)"}
        >
          <span className="w-2 h-2 rounded-full bg-current" />
          <span>{isKeyApproved ? "API 승인됨 (메뉴 사용 가능)" : "🔒 Key 미승인 (메뉴 잠김)"}</span>
        </button>

        <button
          onClick={onToggleMute}
          title={isMuted ? "음소거 해제" : "효과음 음소거"}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
            isMuted
              ? 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
              : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 shadow-sm'
          }`}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">소리 끔</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-indigo-600 animate-pulse" />
              <span className="hidden sm:inline">효과음 켜짐</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};

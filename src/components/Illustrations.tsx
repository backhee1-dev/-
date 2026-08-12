import React from 'react';

interface IllustrationProps {
  type?: string;
  className?: string;
  accentColor?: 'blue' | 'pink' | 'purple' | 'emerald';
}

export const Illustration: React.FC<IllustrationProps> = ({ type, className = '', accentColor = 'blue' }) => {
  const isBlue = accentColor === 'blue';
  
  switch (type) {
    case 'speaking':
      return (
        <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto ${className}`}>
          {/* Background Stage */}
          <rect width="320" height="220" rx="16" fill={isBlue ? "#1E40AF" : "#9F1239"} opacity="0.15" />
          
          {/* Presentation Screen */}
          <rect x="30" y="20" width="260" height="90" rx="8" fill="#FFFFFF" opacity="0.9" stroke="#94A3B8" strokeWidth="2" />
          <path d="M45 40 H180" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
          <path d="M45 55 H220" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
          <path d="M45 70 H140" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />

          {/* Speaker at Podium */}
          <rect x="120" y="115" width="80" height="65" rx="6" fill="#334155" />
          <path d="M160 115 V95" stroke="#E2E8F0" strokeWidth="3" />
          <circle cx="160" cy="90" r="8" fill="#F59E0B" /> {/* Mic */}

          {/* Speaker Figure */}
          <circle cx="160" cy="65" r="14" fill="#38BDF8" />
          <path d="M140 110 C140 85, 180 85, 180 110" fill="#0284C7" />
          <path d="M135 80 Q120 70 125 60" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
          <path d="M185 80 Q200 70 195 60" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />

          {/* Audience Heads at bottom */}
          <g opacity="0.8">
            <circle cx="50" cy="180" r="16" fill="#1E293B" />
            <circle cx="95" cy="175" r="18" fill="#0F172A" />
            <circle cx="145" cy="182" r="17" fill="#1E293B" />
            <circle cx="195" cy="178" r="18" fill="#0F172A" />
            <circle cx="245" cy="182" r="16" fill="#1E293B" />
            <circle cx="285" cy="185" r="14" fill="#334155" />
          </g>

          {/* Sound waves emitting */}
          <path d="M175 52 A20 20 0 0 1 175 78" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <path d="M183 45 A30 30 0 0 1 183 85" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        </svg>
      );

    case 'listening':
      return (
        <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto ${className}`}>
          {/* Background Room */}
          <rect width="320" height="220" rx="16" fill="#881337" opacity="0.12" />

          {/* Big Chart Presentation in Background */}
          <rect x="130" y="20" width="165" height="100" rx="10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
          <path d="M150 90 L180 70 L210 80 L240 45 L275 35" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="275" cy="35" r="5" fill="#EF4444" />
          <circle cx="170" cy="50" r="15" fill="#E2E8F0" />
          <path d="M170 50 L170 35 A15 15 0 0 1 185 50 Z" fill="#F43F5E" />

          {/* Presenter in background pointing */}
          <circle cx="105" cy="55" r="12" fill="#FB7185" />
          <path d="M90 90 C90 70 120 70 120 90" fill="#E11D48" />
          <path d="M115 65 L145 50" stroke="#E11D48" strokeWidth="4" strokeLinecap="round" />

          {/* Stressed Audience Member at Desk in Foreground */}
          <rect x="40" y="140" width="180" height="12" rx="4" fill="#64748B" />
          <rect x="180" y="110" width="25" height="30" rx="3" fill="#38BDF8" opacity="0.8" />

          <circle cx="110" cy="110" r="18" fill="#F87171" />
          <path d="M95 110 Q110 125 125 110" fill="#EF4444" />
          <path d="M100 95 L95 120 L125 120" stroke="#B91C1C" strokeWidth="3" strokeLinecap="round" />

          <path d="M75 90 Q85 85 80 80" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" />
          <path d="M135 90 Q145 85 140 80" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" />
          
          <circle cx="45" cy="45" r="18" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="3" />
          <path d="M45 45 L45 35 M45 45 L53 45" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          <text x="35" y="76" fontSize="10" fontWeight="bold" fill="#64748B">3 HOURS</text>
        </svg>
      );

    case 'office':
      return (
        <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto ${className}`}>
          <rect width="320" height="220" rx="16" fill="#3B82F6" opacity="0.12" />
          <rect x="60" y="30" width="200" height="160" rx="12" fill="#FFFFFF" stroke="#64748B" strokeWidth="3" />
          <rect x="85" y="55" width="40" height="40" rx="4" fill="#38BDF8" opacity="0.6" />
          <rect x="140" y="55" width="40" height="40" rx="4" fill="#38BDF8" opacity="0.6" />
          <rect x="195" y="55" width="40" height="40" rx="4" fill="#38BDF8" opacity="0.6" />
          <rect x="85" y="110" width="40" height="40" rx="4" fill="#38BDF8" opacity="0.6" />
          <rect x="140" y="110" width="40" height="40" rx="4" fill="#38BDF8" opacity="0.6" />
          <rect x="195" y="110" width="40" height="40" rx="4" fill="#38BDF8" opacity="0.6" />
          <rect x="140" y="160" width="40" height="30" rx="2" fill="#1E293B" />
        </svg>
      );

    case 'home':
      return (
        <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto ${className}`}>
          <rect width="320" height="220" rx="16" fill="#10B981" opacity="0.12" />
          <rect x="40" y="130" width="240" height="14" rx="4" fill="#B45309" />
          <rect x="110" y="85" width="100" height="45" rx="6" fill="#1E293B" />
          <rect x="118" y="92" width="84" height="31" rx="2" fill="#38BDF8" />
          <rect x="230" y="100" width="20" height="30" rx="4" fill="#F43F5E" />
          <path d="M250 108 C258 108 258 122 250 122" stroke="#F43F5E" strokeWidth="3" fill="none" />
          <circle cx="70" cy="110" r="14" fill="#10B981" />
          <rect x="65" y="120" width="10" height="10" fill="#D97706" />
        </svg>
      );

    case 'money':
      return (
        <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto ${className}`}>
          <rect width="320" height="220" rx="16" fill="#10B981" opacity="0.12" />
          <circle cx="160" cy="100" r="55" fill="#F59E0B" />
          <circle cx="160" cy="100" r="45" fill="#FBBF24" stroke="#D97706" strokeWidth="4" />
          <text x="160" y="112" textAnchor="middle" fontSize="42" fontWeight="900" fill="#92400E">₩</text>
          <path d="M50 170 L110 130 L170 140 L270 50" stroke="#10B981" strokeWidth="6" strokeLinecap="round" />
          <polygon points="270,50 250,55 265,70" fill="#10B981" />
        </svg>
      );

    case 'time':
      return (
        <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto ${className}`}>
          <rect width="320" height="220" rx="16" fill="#8B5CF6" opacity="0.12" />
          <circle cx="160" cy="105" r="60" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="6" />
          <circle cx="160" cy="105" r="6" fill="#6D28D9" />
          <path d="M160 105 L160 65" stroke="#6D28D9" strokeWidth="6" strokeLinecap="round" />
          <path d="M160 105 L195 105" stroke="#EC4899" strokeWidth="5" strokeLinecap="round" />
          <circle cx="250" cy="50" r="18" fill="#F59E0B" />
        </svg>
      );

    case 'solo':
      return (
        <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto ${className}`}>
          <rect width="320" height="220" rx="16" fill="#6366F1" opacity="0.12" />
          <circle cx="160" cy="85" r="28" fill="#4338CA" />
          <path d="M120 160 C120 120 200 120 200 160" fill="#3730A3" />
          <path d="M126 85 A36 36 0 0 1 194 85" fill="none" stroke="#F43F5E" strokeWidth="6" strokeLinecap="round" />
          <rect x="120" y="75" width="12" height="22" rx="4" fill="#F43F5E" />
          <rect x="188" y="75" width="12" height="22" rx="4" fill="#F43F5E" />
        </svg>
      );

    case 'team':
      return (
        <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto ${className}`}>
          <rect width="320" height="220" rx="16" fill="#EC4899" opacity="0.12" />
          <circle cx="100" cy="90" r="22" fill="#3B82F6" />
          <circle cx="160" cy="75" r="24" fill="#EC4899" />
          <circle cx="220" cy="90" r="22" fill="#10B981" />
          <rect x="120" y="20" width="80" height="35" rx="10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
          <text x="160" y="42" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#475569">IDEA!</text>
        </svg>
      );

    case 'stability':
      return (
        <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto ${className}`}>
          {/* Background */}
          <rect width="320" height="220" rx="16" fill={isBlue ? "#1E3A8A" : "#881337"} opacity="0.15" />
          {/* Manual / Process Binder */}
          <rect x="70" y="30" width="180" height="160" rx="12" fill="#FFFFFF" stroke="#334155" strokeWidth="3" />
          <rect x="85" y="30" width="20" height="160" fill={isBlue ? "#2563EB" : "#E11D48"} />
          {/* Rings */}
          <circle cx="95" cy="55" r="4" fill="#0F172A" />
          <circle cx="95" cy="110" r="4" fill="#0F172A" />
          <circle cx="95" cy="165" r="4" fill="#0F172A" />
          {/* Checklists */}
          <path d="M125 60 L135 70 L155 50" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="165" y1="60" x2="225" y2="60" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
          
          <path d="M125 105 L135 115 L155 95" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="165" y1="105" x2="225" y2="105" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />

          <path d="M125 150 L135 160 L155 140" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="165" y1="150" x2="225" y2="150" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />

          {/* Shield Badge */}
          <circle cx="230" cy="160" r="22" fill="#F59E0B" />
          <path d="M222 160 L228 166 L238 154" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'creative':
      return (
        <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto ${className}`}>
          {/* Background */}
          <rect width="320" height="220" rx="16" fill="#F59E0B" opacity="0.15" />
          {/* Glowing Lightbulb */}
          <circle cx="160" cy="95" r="42" fill="#FBBF24" stroke="#D97706" strokeWidth="4" />
          <rect x="146" y="137" width="28" height="20" rx="4" fill="#64748B" />
          <rect x="150" y="157" width="20" height="8" rx="2" fill="#334155" />
          
          {/* Filament inside */}
          <path d="M150 105 Q160 80 170 105" stroke="#92400E" strokeWidth="4" fill="none" />

          {/* Rays of Innovation */}
          <line x1="160" y1="35" x2="160" y2="20" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
          <line x1="210" y1="50" x2="225" y2="38" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
          <line x1="110" y1="50" x2="95" y2="38" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
          <line x1="225" y1="100" x2="240" y2="100" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
          <line x1="95" y1="100" x2="80" y2="100" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />

          {/* Sparkles around */}
          <polygon points="75,140 80,150 90,155 80,160 75,170 70,160 60,155 70,150" fill="#EC4899" />
          <polygon points="245,140 250,150 260,155 250,160 245,170 240,160 230,155 240,150" fill="#3B82F6" />
        </svg>
      );

    case 'focus':
      return (
        <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto ${className}`}>
          {/* Background */}
          <rect width="320" height="220" rx="16" fill={isBlue ? "#0284C7" : "#BE123C"} opacity="0.15" />
          
          {/* Target Bullseye */}
          <circle cx="160" cy="110" r="75" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
          <circle cx="160" cy="110" r="55" fill={isBlue ? "#3B82F6" : "#E11D48"} />
          <circle cx="160" cy="110" r="35" fill="#FFFFFF" />
          <circle cx="160" cy="110" r="18" fill="#F59E0B" />

          {/* Arrow Hitting Center */}
          <path d="M250 30 L168 102" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
          <polygon points="160,110 172,98 178,110" fill="#0F172A" />
          <path d="M250 30 L260 20 M250 30 L260 38 M250 30 L242 20" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />

          {/* Magnifying Glass Overlay */}
          <circle cx="110" cy="150" r="28" fill="#38BDF8" opacity="0.3" stroke="#0284C7" strokeWidth="4" />
          <line x1="90" y1="170" x2="65" y2="195" stroke="#0284C7" strokeWidth="7" strokeLinecap="round" />
        </svg>
      );

    case 'analytics':
      return (
        <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto ${className}`}>
          {/* Background */}
          <rect width="320" height="220" rx="16" fill="#8B5CF6" opacity="0.15" />
          
          {/* Dashboard Board */}
          <rect x="50" y="30" width="220" height="160" rx="12" fill="#FFFFFF" stroke="#475569" strokeWidth="3" />
          
          {/* Bar Chart */}
          <rect x="80" y="110" width="22" height="50" rx="4" fill="#3B82F6" />
          <rect x="115" y="80" width="22" height="80" rx="4" fill="#8B5CF6" />
          <rect x="150" y="125" width="22" height="35" rx="4" fill="#EC4899" />
          <rect x="185" y="60" width="22" height="100" rx="4" fill="#10B981" />

          {/* Trend Line Overlay */}
          <path d="M80 100 L115 70 L150 115 L195 45 L240 65" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="240" cy="65" r="6" fill="#F59E0B" />

          {/* Connecting Data Nodes top right */}
          <line x1="220" y1="130" x2="245" y2="110" stroke="#64748B" strokeWidth="3" />
          <line x1="220" y1="130" x2="245" y2="150" stroke="#64748B" strokeWidth="3" />
          <circle cx="220" cy="130" r="7" fill="#6366F1" />
          <circle cx="245" cy="110" r="5" fill="#10B981" />
          <circle cx="245" cy="150" r="5" fill="#F43F5E" />
        </svg>
      );

    case 'growth':
      return (
        <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto ${className}`}>
          {/* Background */}
          <rect width="320" height="220" rx="16" fill={isBlue ? "#0284C7" : "#EA580C"} opacity="0.15" />
          
          {/* Launch Pad Stars */}
          <circle cx="60" cy="50" r="3" fill="#F59E0B" />
          <circle cx="260" cy="40" r="4" fill="#F59E0B" />
          <circle cx="280" cy="120" r="3" fill="#F59E0B" />

          {/* Soaring Rocket */}
          <g transform="translate(110, 30) rotate(25)">
            {/* Rocket Exhaust Flames */}
            <path d="M30 110 Q40 145 30 155 Q20 145 30 110" fill="#EF4444" />
            <path d="M30 115 Q36 140 30 148 Q24 140 30 115" fill="#F59E0B" />
            
            {/* Rocket Body */}
            <path d="M30 10 C50 40 50 90 50 110 L10 110 C10 90 10 40 30 10 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
            {/* Rocket Nose */}
            <path d="M30 10 C45 30 45 40 45 45 L15 45 C15 40 15 30 30 10 Z" fill="#E11D48" />
            {/* Window */}
            <circle cx="30" cy="65" r="10" fill="#38BDF8" stroke="#0F172A" strokeWidth="2" />
            {/* Wings */}
            <path d="M10 85 L-5 110 L10 110 Z" fill="#3B82F6" />
            <path d="M50 85 L65 110 L50 110 Z" fill="#3B82F6" />
          </g>

          {/* Exponential Growth Graph Path */}
          <path d="M40 180 C120 180 180 140 270 60" stroke="#10B981" strokeWidth="6" strokeLinecap="round" />
          <polygon points="270,60 250,65 265,80" fill="#10B981" />
        </svg>
      );

    case 'leader':
      return (
        <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto ${className}`}>
          {/* Background */}
          <rect width="320" height="220" rx="16" fill={isBlue ? "#4338CA" : "#7C2D12"} opacity="0.15" />
          
          {/* Mountain / Podium Peak */}
          <polygon points="160,50 260,190 60,190" fill="#334155" />
          <polygon points="160,50 200,110 120,110" fill="#475569" />

          {/* Leader Figure with Flag on Top */}
          <circle cx="160" cy="38" r="10" fill="#F59E0B" />
          <path d="M160 48 L160 75" stroke="#FFFFFF" strokeWidth="4" />
          {/* Flag */}
          <path d="M160 48 L195 58 L160 68 Z" fill="#EF4444" />

          {/* Compass / Steering Wheel Icon */}
          <circle cx="240" cy="70" r="28" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
          <path d="M240 46 L240 94 M216 70 L264 70" stroke="#0F172A" strokeWidth="3" />
          <circle cx="240" cy="70" r="8" fill="#3B82F6" />

          {/* Guided Team members below following */}
          <circle cx="100" cy="165" r="10" fill="#94A3B8" />
          <circle cx="130" cy="155" r="11" fill="#CBD5E1" />
          <circle cx="190" cy="155" r="11" fill="#CBD5E1" />
          <circle cx="220" cy="165" r="10" fill="#94A3B8" />
        </svg>
      );

    case 'follower':
      return (
        <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto ${className}`}>
          {/* Background */}
          <rect width="320" height="220" rx="16" fill="#0284C7" opacity="0.15" />
          
          {/* Mentor Figure (Tall, guiding) */}
          <circle cx="110" cy="70" r="18" fill="#0284C7" />
          <path d="M85 130 C85 95 135 95 135 130" fill="#0369A1" />
          <path d="M125 95 L160 85" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />

          {/* Student / mentee figure learning */}
          <circle cx="190" cy="95" r="15" fill="#F59E0B" />
          <path d="M170 145 C170 115 210 115 210 145" fill="#D97706" />

          {/* Lightbulb idea shared between them */}
          <circle cx="160" cy="55" r="14" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
          <path d="M160 45 L160 40 M170 48 L174 44 M150 48 L146 44" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

          {/* Sponge / Learning absorbent waves */}
          <rect x="70" y="155" width="180" height="35" rx="8" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
          <path d="M90 172.5 H230" stroke="#10B981" strokeWidth="4" strokeDasharray="8 6" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-auto ${className}`}>
          <rect width="320" height="220" rx="16" fill={isBlue ? "#3B82F6" : "#F43F5E"} opacity="0.15" />
          <circle cx="160" cy="110" r="45" fill={isBlue ? "#2563EB" : "#E11D48"} />
          <text x="160" y="125" textAnchor="middle" fontSize="36" fontWeight="bold" fill="#FFFFFF">VS</text>
        </svg>
      );
  }
};

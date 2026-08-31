import React from 'react';
import { OreId } from '../types';

interface OreIconProps {
  oreId: OreId;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  animate?: boolean;
}

export const OreIcon: React.FC<OreIconProps> = ({
  oreId,
  size = 'md',
  className = '',
  animate = false,
}) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32',
  };

  const containerSize = sizeMap[size];

  switch (oreId) {
    case 'legendary':
      return (
        <div className={`relative flex items-center justify-center ${containerSize} ${className}`}>
          {/* Pulsing prismatic glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-md opacity-75 animate-pulse" />
          <svg
            viewBox="0 0 100 100"
            className={`w-full h-full relative z-10 drop-shadow-xl ${animate ? 'animate-bounce' : ''}`}
          >
            <defs>
              <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="30%" stopColor="#818cf8" />
                <stop offset="60%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
              <linearGradient id="facetHighlight" x1="0%" y1="0%" x2="50%" y2="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Prismatic Crystal Polygon */}
            <polygon points="50,8 82,32 72,82 28,82 18,32" fill="url(#rainbowGrad)" stroke="#ffffff" strokeWidth="2.5" />
            <polygon points="50,8 50,55 82,32" fill="#ffffff" fillOpacity="0.3" />
            <polygon points="50,8 18,32 50,55" fill="#38bdf8" fillOpacity="0.5" />
            <polygon points="50,55 72,82 82,32" fill="#818cf8" fillOpacity="0.6" />
            <polygon points="50,55 28,82 72,82" fill="#c084fc" fillOpacity="0.7" />
            <polygon points="50,55 18,32 28,82" fill="#f472b6" fillOpacity="0.6" />
            {/* Sparkle Glints */}
            <circle cx="50" cy="20" r="3" fill="#ffffff" />
            <circle cx="75" cy="45" r="2.5" fill="#ffffff" />
            <circle cx="30" cy="70" r="2" fill="#ffffff" />
          </svg>
        </div>
      );

    case 'rare':
      return (
        <div className={`relative flex items-center justify-center ${containerSize} ${className}`}>
          <div className="absolute inset-0 rounded-full bg-violet-600 blur-sm opacity-60 animate-pulse" />
          <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-md">
            <defs>
              <linearGradient id="rareGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="50%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#581c87" />
              </linearGradient>
            </defs>
            <polygon points="50,12 85,38 68,88 32,88 15,38" fill="url(#rareGrad)" stroke="#e9d5ff" strokeWidth="2" />
            <polygon points="50,12 50,58 85,38" fill="#d8b4fe" fillOpacity="0.4" />
            <polygon points="50,58 68,88 32,88" fill="#7e22ce" />
            <polygon points="50,12 15,38 50,58" fill="#a855f7" fillOpacity="0.5" />
            <circle cx="42" cy="30" r="2.5" fill="#ffffff" />
          </svg>
        </div>
      );

    case 'gem':
      return (
        <div className={`relative flex items-center justify-center ${containerSize} ${className}`}>
          <div className="absolute inset-0 rounded-full bg-pink-500 blur-sm opacity-50" />
          <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-md">
            <defs>
              <linearGradient id="gemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="60%" stopColor="#db2777" />
                <stop offset="100%" stopColor="#9d174d" />
              </linearGradient>
            </defs>
            <polygon points="50,15 85,45 50,85 15,45" fill="url(#gemGrad)" stroke="#fbcfe8" strokeWidth="2" />
            <polygon points="50,15 50,45 85,45" fill="#f472b6" fillOpacity="0.6" />
            <polygon points="50,45 85,45 50,85" fill="#9d174d" />
            <polygon points="15,45 50,45 50,85" fill="#be185d" />
            <polygon points="15,45 50,15 50,45" fill="#ffffff" fillOpacity="0.4" />
          </svg>
        </div>
      );

    case 'gold':
      return (
        <div className={`relative flex items-center justify-center ${containerSize} ${className}`}>
          <div className="absolute inset-0 rounded-full bg-amber-400 blur-sm opacity-40" />
          <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-md">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="40%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>
            <path
              d="M30,25 L65,20 L85,45 L75,80 L35,85 L18,55 Z"
              fill="url(#goldGrad)"
              stroke="#fef3c7"
              strokeWidth="2"
            />
            <polygon points="30,25 65,20 55,50 25,48" fill="#fef08a" fillOpacity="0.7" />
            <polygon points="65,20 85,45 68,60 55,50" fill="#f59e0b" />
            <polygon points="25,48 55,50 68,60 75,80 35,85 18,55" fill="#b45309" />
            <circle cx="45" cy="35" r="2.5" fill="#ffffff" />
          </svg>
        </div>
      );

    case 'silver':
      return (
        <div className={`relative flex items-center justify-center ${containerSize} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-md">
            <defs>
              <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>
            <path
              d="M35,20 L70,25 L82,55 L65,82 L28,78 L18,45 Z"
              fill="url(#silverGrad)"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
            <polygon points="35,20 70,25 55,50 25,40" fill="#ffffff" fillOpacity="0.8" />
            <polygon points="25,40 55,50 65,82 28,78" fill="#64748b" />
            <polygon points="70,25 82,55 65,82 55,50" fill="#94a3b8" />
          </svg>
        </div>
      );

    case 'iron':
      return (
        <div className={`relative flex items-center justify-center ${containerSize} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-sm">
            <defs>
              <linearGradient id="ironGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#475569" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
            </defs>
            <path
              d="M25,25 L75,22 L85,60 L60,85 L20,75 L15,45 Z"
              fill="url(#ironGrad)"
              stroke="#64748b"
              strokeWidth="2"
            />
            <polygon points="25,25 75,22 55,52 20,48" fill="#cbd5e1" fillOpacity="0.4" />
            <polygon points="55,52 75,22 85,60 60,85" fill="#334155" />
          </svg>
        </div>
      );

    case 'copper':
      return (
        <div className={`relative flex items-center justify-center ${containerSize} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-sm">
            <defs>
              <linearGradient id="copperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fdba74" />
                <stop offset="50%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#9a3412" />
              </linearGradient>
            </defs>
            <path
              d="M30,22 L72,28 L82,58 L58,82 L22,70 L18,38 Z"
              fill="url(#copperGrad)"
              stroke="#fed7aa"
              strokeWidth="1.5"
            />
            <polygon points="30,22 72,28 50,50 25,42" fill="#fed7aa" fillOpacity="0.5" />
            <polygon points="50,50 72,28 82,58 58,82" fill="#9a3412" />
          </svg>
        </div>
      );

    case 'stone':
      return (
        <div className={`relative flex items-center justify-center ${containerSize} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
            <ellipse cx="50" cy="55" rx="35" ry="28" fill="#78716c" stroke="#a8a29e" strokeWidth="2" />
            <ellipse cx="44" cy="45" rx="20" ry="12" fill="#a8a29e" fillOpacity="0.6" />
            <circle cx="36" cy="40" r="3" fill="#d6d3d1" />
            <path d="M60,65 Q65,68 70,64" stroke="#57534e" strokeWidth="2" fill="none" />
          </svg>
        </div>
      );

    case 'miss':
    default:
      return (
        <div className={`relative flex items-center justify-center ${containerSize} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
            {/* Broken cracked dirt and pebble fragments */}
            <path d="M30,45 L45,40 L40,60 L25,55 Z" fill="#57534e" />
            <path d="M60,35 L75,42 L68,65 L55,55 Z" fill="#44403c" />
            <circle cx="50" cy="72" r="6" fill="#57534e" />
            <circle cx="35" cy="68" r="4" fill="#44403c" />
            <circle cx="68" cy="74" r="5" fill="#44403c" />
            {/* Dust puffs */}
            <path d="M42,28 Q48,22 56,26 Q62,32 54,36" stroke="#78716c" strokeWidth="2" fill="none" strokeDasharray="3 3" />
          </svg>
        </div>
      );
  }
};

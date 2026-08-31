import React from 'react';
import { Pickaxe, ShieldCheck, Scale, Zap, Sparkles } from 'lucide-react';
import { AreaDefinition, AreaId } from '../types';

interface AreaCardProps {
  area: AreaDefinition;
  disabled: boolean;
  onSelect: (areaId: AreaId) => void;
}

export const AreaCard: React.FC<AreaCardProps> = ({ area, disabled, onSelect }) => {
  const getAreaIcon = () => {
    switch (area.id) {
      case 'front':
        return <ShieldCheck className="w-5 h-5 text-[#8BA870]" />;
      case 'middle':
        return <Scale className="w-5 h-5 text-[#D4AF37]" />;
      case 'deep':
        return <Zap className="w-5 h-5 text-[#A64D79]" />;
    }
  };

  const getVisualElements = () => {
    switch (area.id) {
      case 'front':
        return {
          cardBg: 'bg-[#3D2B1F] hover:bg-[#2A3520]',
          border: 'border-2 border-[#4A3728] hover:border-[#8BA870]',
          btnBg: 'bg-[#8BA870] hover:bg-[#9cb981] active:bg-[#7b9760] text-[#1B120B]',
          indicator: '浅瀬・坑道入口',
          iconBg: 'bg-[#8BA870]/20 text-[#8BA870] border-[#8BA870]/30',
          tagBg: 'bg-[#2A3520] text-[#8BA870] border-[#8BA870]/40',
          titleColor: 'text-[#8BA870]',
        };
      case 'middle':
        return {
          cardBg: 'bg-[#3D2B1F] hover:bg-[#3D321F]',
          border: 'border-2 border-[#4A3728] hover:border-[#D4AF37]',
          btnBg: 'bg-[#D4AF37] hover:bg-[#e0be4d] active:bg-[#c49f2e] text-[#1B120B]',
          indicator: '中層・岩盤地帯',
          iconBg: 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30',
          tagBg: 'bg-[#3D321F] text-[#D4AF37] border-[#D4AF37]/40',
          titleColor: 'text-[#D4AF37]',
        };
      case 'deep':
        return {
          cardBg: 'bg-[#1B120B] hover:bg-[#2D1622]',
          border: 'border-2 border-dashed border-[#4A3728] hover:border-[#A64D79]',
          btnBg: 'bg-[#A64D79] hover:bg-[#b85a88] active:bg-[#924268] text-white',
          indicator: '最深部・奈落の底',
          iconBg: 'bg-[#A64D79]/20 text-[#A64D79] border-[#A64D79]/30',
          tagBg: 'bg-[#2D1622] text-[#A64D79] border-[#A64D79]/40',
          titleColor: 'text-[#A64D79]',
        };
    }
  };

  const visual = getVisualElements();

  return (
    <button
      id={`area-button-${area.id}`}
      disabled={disabled}
      onClick={() => onSelect(area.id)}
      className={`group relative w-full text-left rounded-2xl p-4 md:p-5 flex flex-col justify-between ${visual.cardBg} ${visual.border} transition-all duration-200 shadow-xl select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 hover:-translate-y-1 active:translate-y-0 active:scale-[0.99]`}
    >
      {/* Deep Legendary Badge */}
      {area.id === 'deep' && (
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#A64D79] text-[9px] font-black tracking-wider rounded text-white shadow">
          LEGENDARY
        </div>
      )}

      {/* Visual Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className={`p-2.5 rounded-xl border shadow-inner ${visual.iconBg}`}>
              {getAreaIcon()}
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8B735B] uppercase tracking-widest block">
                {visual.indicator}
              </span>
              <h3 className={`text-xl md:text-2xl font-black tracking-tight ${visual.titleColor}`}>
                {area.name}
              </h3>
            </div>
          </div>

          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${visual.tagBg} shrink-0 ${area.id === 'deep' ? 'mr-16' : ''}`}>
            {area.tagline}
          </span>
        </div>

        {/* Public Stats */}
        <div className="bg-[#1B120B] border border-[#4A3728] rounded-xl p-3 mb-3 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#8B735B]">発見率</span>
            <span className="font-extrabold text-[#E6D5B8] text-sm">
              {area.discoveryRateDisplay}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#8B735B]">リスク性質</span>
            <span className="font-bold text-[#E6D5B8]">
              {area.riskLabel}
            </span>
          </div>
        </div>

        {/* Short Flavor Description */}
        <p className="text-xs text-[#8B735B] leading-relaxed min-h-[36px]">
          {area.identity}
        </p>

        {area.id === 'deep' && (
          <div className="mt-2 text-[11px] text-[#D4AF37] font-bold flex items-center gap-1.5 bg-[#2D1622] border border-[#A64D79]/40 px-2.5 py-1.5 rounded-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>「伝説の虹晶石 (50,000円)」が眠る唯一の地</span>
          </div>
        )}
      </div>

      {/* Action Button Strip */}
      <div className="mt-4 pt-3 border-t border-[#4A3728] flex items-center justify-center">
        <div
          className={`w-full py-2.5 px-4 rounded-xl font-black text-sm tracking-wide flex items-center justify-center gap-2 shadow-md transition-transform group-hover:scale-[1.02] ${visual.btnBg}`}
        >
          <Pickaxe className="w-4 h-4 transition-transform group-hover:-rotate-45" />
          <span>ここを掘る！</span>
        </div>
      </div>
    </button>
  );
};

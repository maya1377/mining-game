import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Pickaxe, ArrowRight, Sparkles, AlertCircle, Coins, Award } from 'lucide-react';
import { Ore, PlayerState, AreaDefinition } from '../types';
import { OreIcon } from './OreIcon';

interface MiningResultModalProps {
  player: PlayerState;
  area: AreaDefinition;
  ore: Ore;
  isMiss: boolean;
  isStone: boolean;
  flavorMessage: string;
  previousTotal: number;
  newTotal: number;
  rank: number;
  onNextTurn: () => void;
}

export const MiningResultModal: React.FC<MiningResultModalProps> = ({
  player,
  area,
  ore,
  isMiss,
  isStone,
  flavorMessage,
  previousTotal,
  newTotal,
  rank,
  onNextTurn,
}) => {
  const isLegendary = ore.id === 'legendary';
  const isRare = ore.id === 'rare';
  const isGem = ore.id === 'gem';

  useEffect(() => {
    // Fire confetti for legendary or rare discoveries
    if (isLegendary) {
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#06b6d4', '#ec4899', '#f59e0b', '#8b5cf6', '#10b981'],
        });
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#06b6d4', '#ec4899', '#f59e0b', '#8b5cf6', '#10b981'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } else if (isRare) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#c084fc', '#e9d5ff'],
      });
    } else if (isGem) {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.65 },
        colors: ['#ec4899', '#f472b6', '#fb7185'],
      });
    }
  }, [isLegendary, isRare, isGem]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Container with dynamic glow for rare tiers */}
      <div
        className={`relative w-full max-w-md rounded-3xl p-6 md:p-8 bg-[#231810] border shadow-2xl transition-all duration-300 ${
          isLegendary
            ? 'border-[#D4AF37] shadow-[#D4AF37]/30 ring-2 ring-[#D4AF37]'
            : isRare
            ? 'border-[#A64D79] shadow-[#A64D79]/30 ring-2 ring-[#A64D79]'
            : isGem
            ? 'border-[#A64D79]/60 shadow-[#A64D79]/20'
            : isStone
            ? 'border-[#4A3728]'
            : isMiss
            ? 'border-[#4A3728]'
            : 'border-[#4A3728]'
        }`}
      >
        {/* Legendary Full Banner */}
        {isLegendary && (
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#1B120B] font-black text-xs md:text-sm px-5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce">
            <Sparkles className="w-4 h-4 fill-[#1B120B]" />
            <span>★ 伝説級発見！奇跡の虹晶石 ★</span>
          </div>
        )}

        {isRare && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#A64D79] text-white font-extrabold text-xs px-4 py-1 rounded-full shadow-md flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>超レア！希少鉱石発掘！</span>
          </div>
        )}

        {/* Turn Header */}
        <div className="text-center pb-4 border-b border-[#4A3728]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B120B] text-[#E6D5B8] text-xs font-semibold mb-1 border border-[#4A3728]">
            <Pickaxe className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{player.name} の採掘結果（{area.name}）</span>
          </div>
        </div>

        {/* Main Result Presentation */}
        <div className="my-6 text-center">
          {/* Ore Icon Display */}
          <div className="flex justify-center mb-4">
            <div
              className={`p-4 rounded-2xl ${
                isLegendary
                  ? 'bg-[#3D2B1F] border border-[#D4AF37]'
                  : isRare
                  ? 'bg-[#2D1622] border border-[#A64D79]'
                  : isGem
                  ? 'bg-[#2D1622] border border-[#A64D79]/50'
                  : isMiss
                  ? 'bg-[#1B120B] border border-[#4A3728]'
                  : 'bg-[#1B120B] border border-[#4A3728]'
              }`}
            >
              <OreIcon oreId={ore.id} size="xl" animate={isLegendary || isRare} />
            </div>
          </div>

          {/* Ore Name */}
          <h2
            className={`text-2xl md:text-3xl font-black tracking-tight mb-2 ${
              isLegendary
                ? 'text-[#D4AF37]'
                : isRare
                ? 'text-[#A64D79]'
                : isGem
                ? 'text-[#A64D79]'
                : isMiss
                ? 'text-[#8B735B]'
                : isStone
                ? 'text-[#E6D5B8]'
                : 'text-[#D4AF37]'
            }`}
          >
            {ore.name}
          </h2>

          {/* Value Reveal */}
          <div className="flex items-center justify-center gap-1.5 text-2xl md:text-3xl font-black mb-3">
            {isMiss ? (
              <span className="text-[#8B735B] flex items-center gap-1.5 text-lg">
                <AlertCircle className="w-5 h-5 text-[#8B735B]" />
                成果：0円
              </span>
            ) : (
              <div className="flex items-baseline gap-1 text-[#D4AF37] bg-[#3D2B1F] px-4 py-1.5 rounded-2xl border border-[#D4AF37]/30">
                <Coins className="w-6 h-6 text-[#D4AF37] self-center" />
                <span className="text-3xl md:text-4xl tracking-tight font-mono font-black">
                  +{ore.value.toLocaleString('ja-JP')}
                </span>
                <span className="text-base font-bold text-[#8B735B]">円</span>
              </div>
            )}
          </div>

          {/* Humorous / Flavor Text */}
          <p className="text-xs md:text-sm text-[#E6D5B8] font-medium px-4 py-2 bg-[#1B120B] rounded-xl border border-[#4A3728] italic">
            「{flavorMessage}」
          </p>
        </div>

        {/* Updated Score & Rank Strip */}
        <div className="bg-[#1B120B] rounded-2xl p-4 border border-[#4A3728] mb-6 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8B735B]">
            <span>獲得前の総資産</span>
            <span className="font-mono text-[#E6D5B8]">{previousTotal.toLocaleString('ja-JP')}円</span>
          </div>
          <div className="flex items-center justify-between text-sm font-bold text-[#E6D5B8] border-t border-[#4A3728] pt-2">
            <span className="flex items-center gap-1.5 text-[#D4AF37]">
              <Award className="w-4 h-4" />
              <span>更新後の総資産</span>
            </span>
            <span className="text-lg font-mono font-black text-[#D4AF37]">
              {newTotal.toLocaleString('ja-JP')}円
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-[#8B735B]">
            <span>現在の暫定順位</span>
            <span className="font-extrabold text-[#D4AF37] bg-[#2C1E14] border border-[#4A3728] px-2 py-0.5 rounded">
              {rank}位
            </span>
          </div>
        </div>

        {/* Advance Button */}
        <button
          id="next-turn-button"
          onClick={onNextTurn}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#D4AF37] hover:bg-[#e0be4d] active:bg-[#c49f2e] text-[#1B120B] font-black text-base shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.99]"
        >
          <span>次の採掘へ</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

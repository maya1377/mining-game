import React, { useState } from 'react';
import { Pickaxe, Users, Sparkles, BookOpen, Volume2, VolumeX, ShieldCheck, Scale, Zap, Info } from 'lucide-react';
import { PLAYER_ATTEMPTS_CONFIG, PLAYER_COLORS, DEFAULT_PLAYER_NAMES } from '../data/gameData';
import { sound } from '../utils/audio';

interface SetupScreenProps {
  onStartGame: (playerNames: string[]) => void;
  onOpenRules: () => void;
  onOpenBalanceSim?: () => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({
  onStartGame,
  onOpenRules,
  onOpenBalanceSim,
}) => {
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [names, setNames] = useState<string[]>([
    DEFAULT_PLAYER_NAMES[0],
    DEFAULT_PLAYER_NAMES[1],
    DEFAULT_PLAYER_NAMES[2],
    DEFAULT_PLAYER_NAMES[3],
  ]);
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playPickaxe();
    const finalNames = names.slice(0, playerCount).map((n, idx) => n.trim() || `プレイヤー${idx + 1}`);
    onStartGame(finalNames);
  };

  const attemptsPerPlayer = PLAYER_ATTEMPTS_CONFIG[playerCount];
  const totalTurns = attemptsPerPlayer * playerCount;

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4">
      {/* Top Header Navigation */}
      <div className="w-full max-w-xl flex items-center justify-between mb-4">
        <button
          onClick={onOpenRules}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#231810] border border-[#4A3728] text-xs text-[#E6D5B8] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors shadow-sm"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>遊び方・エリア確率</span>
        </button>

        <div className="flex items-center gap-2">
          {onOpenBalanceSim && (
            <button
              onClick={onOpenBalanceSim}
              className="px-2.5 py-1.5 rounded-full bg-[#231810] border border-[#4A3728] text-[11px] text-[#8B735B] hover:text-[#E6D5B8] transition-colors"
              title="確率バランス検証ツール"
            >
              確率シミュレータ
            </button>
          )}

          <button
            onClick={handleToggleSound}
            className="p-2 rounded-full bg-[#231810] border border-[#4A3728] text-[#E6D5B8] hover:text-[#D4AF37] transition-colors"
            title={isMuted ? 'サウンドをONにする' : 'サウンドをミュート'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#8B735B]" /> : <Volume2 className="w-4 h-4 text-[#D4AF37]" />}
          </button>
        </div>
      </div>

      {/* Main Setup Card */}
      <div className="w-full max-w-xl bg-[#231810] border border-[#4A3728] rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Title Area */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D2B1F] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>ブラウザ完結型・ローカル採掘パーティゲーム</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-[#D4AF37] tracking-tight flex items-center justify-center gap-2">
            <Pickaxe className="w-8 h-8 text-[#D4AF37] shrink-0" />
            <span>みんなで採掘！</span>
          </h1>

          <p className="text-xs md:text-sm text-[#8B735B] mt-1">
            「どこ掘る？」3つのエリアから選んで鉱石を発掘！一攫千金を目指せ！
          </p>
        </div>

        {/* Quick Area Preview Strip */}
        <div className="grid grid-cols-3 gap-2 mb-6 text-center">
          <div className="p-2.5 rounded-xl bg-[#2A3520] border border-[#8BA870]/40 text-xs">
            <div className="flex items-center justify-center gap-1 text-[#8BA870] font-bold mb-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>手前</span>
            </div>
            <div className="text-[10px] text-[#8B735B]">発見率 約82%</div>
            <div className="text-[10px] text-[#8BA870] font-medium">安定型</div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#3D321F] border border-[#D4AF37]/40 text-xs">
            <div className="flex items-center justify-center gap-1 text-[#D4AF37] font-bold mb-0.5">
              <Scale className="w-3.5 h-3.5" />
              <span>中間</span>
            </div>
            <div className="text-[10px] text-[#8B735B]">発見率 約55%</div>
            <div className="text-[10px] text-[#D4AF37] font-medium">バランス型</div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#2D1622] border border-[#A64D79]/40 text-xs">
            <div className="flex items-center justify-center gap-1 text-[#A64D79] font-bold mb-0.5">
              <Zap className="w-3.5 h-3.5" />
              <span>奥地</span>
            </div>
            <div className="text-[10px] text-[#8B735B]">発見率 約24%</div>
            <div className="text-[10px] text-[#A64D79] font-medium">一発逆転型</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Player Count Selection */}
          <div>
            <label className="block text-xs font-bold text-[#E6D5B8] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#D4AF37]" />
              <span>プレイ人数を選択</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[2, 3, 4].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setPlayerCount(num);
                  }}
                  className={`py-3 px-4 rounded-2xl font-black text-sm flex flex-col items-center justify-center transition-all cursor-pointer border ${
                    playerCount === num
                      ? 'bg-[#D4AF37] text-[#1B120B] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 scale-[1.02]'
                      : 'bg-[#1B120B] text-[#8B735B] border-[#4A3728] hover:border-[#8B735B] hover:text-[#E6D5B8]'
                  }`}
                >
                  <span className="text-base">{num}人プレイ</span>
                  <span className={`text-[11px] font-bold ${playerCount === num ? 'text-[#1B120B]/80' : 'text-[#8B735B]'}`}>
                    1人{PLAYER_ATTEMPTS_CONFIG[num]}回採掘
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Game Length Info Notice */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#1B120B] border border-[#4A3728] text-xs">
            <span className="text-[#8B735B]">総ゲーム長（全員同回数）:</span>
            <span className="font-bold text-[#D4AF37] font-mono">
              全{totalTurns}ターン（1人あたり{attemptsPerPlayer}回）
            </span>
          </div>

          {/* Player Name Inputs */}
          <div>
            <label className="block text-xs font-bold text-[#E6D5B8] uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>プレイヤー名（手番順）</span>
              <span className="text-[11px] font-normal text-[#8B735B]">※登録順が固定の手番順になります</span>
            </label>
            <div className="space-y-2.5">
              {Array.from({ length: playerCount }).map((_, idx) => {
                const color = PLAYER_COLORS[idx];
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#1B120B] border border-[#4A3728] flex items-center justify-center font-black text-xs text-[#E6D5B8] shrink-0">
                      <span className={`w-2.5 h-2.5 rounded-full ${color.bg}`} />
                    </div>
                    <input
                      type="text"
                      maxLength={16}
                      value={names[idx]}
                      onChange={(e) => handleNameChange(idx, e.target.value)}
                      placeholder={`プレイヤー${idx + 1}`}
                      className="flex-1 bg-[#1B120B] border border-[#4A3728] rounded-xl px-3.5 py-2 text-sm text-[#E6D5B8] placeholder-[#8B735B] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI External Participation Notice */}
          <div className="p-3 bg-[#1B120B] rounded-xl border border-[#4A3728] text-xs text-[#8B735B] leading-relaxed flex items-start gap-2">
            <Info className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#E6D5B8]">外部AIチャット参加対応：</strong>
              <span> 各手番で「AI用ログをコピー」ボタンから状況をワンクリックでコピーし、ChatGPTやClaude等の外部チャットに投げて一緒に遊べます。</span>
            </div>
          </div>

          {/* Start Button */}
          <button
            id="start-game-button"
            type="submit"
            className="w-full py-4 rounded-2xl bg-[#D4AF37] hover:bg-[#e0be4d] active:bg-[#c49f2e] text-[#1B120B] font-black text-base md:text-lg shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
          >
            <Pickaxe className="w-5 h-5" />
            <span>採掘を開始する！</span>
          </button>
        </form>
      </div>
    </div>
  );
};

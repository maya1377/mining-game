import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Award, Sparkles, AlertCircle, ShieldCheck, Scale, Zap, Gem } from 'lucide-react';
import { PlayerState, OreId } from '../types';
import { ORE_DATABASE, determinePlayStyle } from '../data/gameData';
import { OreIcon } from './OreIcon';
import { sound } from '../utils/audio';

interface GameOverScreenProps {
  players: PlayerState[];
  onPlayAgainSamePlayers: () => void;
  onNewGameSetup: () => void;
  onOpenHistory: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  players,
  onPlayAgainSamePlayers,
  onNewGameSetup,
  onOpenHistory,
}) => {
  // Sort players by total score descending
  const sortedPlayers = [...players].sort((a, b) => b.totalValue - a.totalValue);
  const highestScore = sortedPlayers[0]?.totalValue || 0;
  const winners = sortedPlayers.filter((p) => p.totalValue === highestScore);
  const isJointWin = winners.length > 1;

  useEffect(() => {
    sound.playLegendary();

    // Trigger victory confetti burst
    const end = Date.now() + 3 * 1000;
    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const getRank = (player: PlayerState): number => {
    return sortedPlayers.findIndex((p) => p.totalValue === player.totalValue) + 1;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 py-8 space-y-6">
      {/* Victory Banner */}
      <div className="text-center bg-[#231810] border border-[#4A3728] rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#3D2B1F] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-black uppercase mb-3">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>全採掘工程 終了！最終結果発表</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-[#D4AF37] tracking-tight flex items-center justify-center gap-2 mb-2">
          <Trophy className="w-8 h-8 md:w-12 h-12 text-[#D4AF37]" />
          <span>{isJointWin ? '同点優勝！' : '優勝！'}</span>
        </h1>

        <div className="text-xl md:text-2xl font-black text-[#E6D5B8] mb-2">
          {winners.map((w) => w.name).join(' ＆ ')}
        </div>

        <div className="text-2xl md:text-4xl font-mono font-black text-[#D4AF37] tracking-tight">
          最終資産: {highestScore.toLocaleString('ja-JP')}円
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onPlayAgainSamePlayers}
          className="px-6 py-3.5 rounded-2xl bg-[#D4AF37] hover:bg-[#e0be4d] active:bg-[#c49f2e] text-[#1B120B] font-black text-sm md:text-base shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>同じメンバーでもう一度遊ぶ</span>
        </button>

        <button
          onClick={onNewGameSetup}
          className="px-5 py-3.5 rounded-2xl bg-[#3D2B1F] hover:bg-[#4A3728] text-[#E6D5B8] font-bold text-sm md:text-base border border-[#4A3728] shadow-md flex items-center gap-2 transition-all cursor-pointer"
        >
          <span>設定を変えて新しく遊ぶ</span>
        </button>

        <button
          onClick={onOpenHistory}
          className="px-4 py-3.5 rounded-2xl bg-[#1B120B] hover:bg-[#231810] text-[#8B735B] hover:text-[#E6D5B8] font-semibold text-xs md:text-sm border border-[#4A3728] transition-colors"
        >
          全採掘ログを見る
        </button>
      </div>

      {/* Detailed Standings & Player Breakdown Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#E6D5B8] flex items-center gap-2 px-1">
          <Award className="w-5 h-5 text-[#D4AF37]" />
          <span>全プレイヤー最終成績・採掘レポート</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedPlayers.map((player) => {
            const rank = getRank(player);
            const isWinner = winners.some((w) => w.id === player.id);
            const playStyle = determinePlayStyle(player, isWinner);

            // Inventory breakdown
            const inventoryList = (Object.keys(player.inventory) as OreId[])
              .filter((id) => id !== 'miss' && player.inventory[id] > 0)
              .map((id) => ({
                ore: ORE_DATABASE[id],
                count: player.inventory[id],
              }));

            return (
              <div
                key={player.id}
                className={`rounded-2xl p-5 border backdrop-blur-md flex flex-col justify-between transition-all ${
                  isWinner
                    ? 'bg-[#3D2B1F] border-2 border-[#D4AF37] shadow-xl ring-1 ring-[#D4AF37]'
                    : 'bg-[#231810] border-[#4A3728]'
                }`}
              >
                <div>
                  {/* Player Rank & Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-3 h-3 rounded-full shrink-0 ${player.color}`} />
                      <span className="text-base font-black text-[#E6D5B8] truncate">
                        {player.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isWinner && <Trophy className="w-4 h-4 text-[#D4AF37]" />}
                      <span
                        className={`text-xs font-black px-2.5 py-1 rounded-lg ${
                          rank === 1
                            ? 'bg-[#D4AF37] text-[#1B120B]'
                            : rank === 2
                            ? 'bg-[#3D2B1F] text-[#E6D5B8] border border-[#4A3728]'
                            : 'bg-[#1B120B] text-[#8B735B] border border-[#4A3728]'
                        }`}
                      >
                        {rank}位
                      </span>
                    </div>
                  </div>

                  {/* Play Style Badge & Summary */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-full border bg-[#1B120B] text-[#D4AF37] border-[#D4AF37]/30">
                        称号：{playStyle.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8B735B] leading-relaxed">
                      {playStyle.description}
                    </p>
                  </div>

                  {/* Final Score */}
                  <div className="bg-[#1B120B] border border-[#4A3728] rounded-xl p-3 mb-3 flex items-center justify-between">
                    <span className="text-xs text-[#8B735B] font-medium">最終獲得資産</span>
                    <div className="text-xl md:text-2xl font-mono font-black text-[#D4AF37] tracking-tight">
                      {player.totalValue.toLocaleString('ja-JP')}
                      <span className="text-xs font-bold text-[#8B735B] ml-1">円</span>
                    </div>
                  </div>

                  {/* Highest Discovery */}
                  <div className="bg-[#1B120B] border border-[#4A3728] rounded-xl p-2.5 mb-3 flex items-center justify-between text-xs">
                    <span className="text-[#8B735B] flex items-center gap-1">
                      <Gem className="w-3.5 h-3.5 text-[#8B735B]" />
                      <span>最高額発掘物</span>
                    </span>
                    {player.highestOre ? (
                      <div className="flex items-center gap-1.5 font-bold text-[#E6D5B8]">
                        <OreIcon oreId={player.highestOre.id} size="sm" className="w-4 h-4" />
                        <span>{player.highestOre.name}</span>
                        <span className="text-[#D4AF37] font-mono text-[11px]">
                          ({player.highestOre.value.toLocaleString('ja-JP')}円)
                        </span>
                      </div>
                    ) : (
                      <span className="text-[#8B735B] italic">なし（全ハズレ）</span>
                    )}
                  </div>

                  {/* Area Choices Breakdown */}
                  <div className="mb-3">
                    <div className="text-[11px] text-[#8B735B] font-bold mb-1.5">採掘エリア選択内訳</div>
                    <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                      <div className="p-1.5 rounded-lg bg-[#2A3520] border border-[#8BA870]/30">
                        <div className="text-[10px] text-[#8BA870] flex items-center justify-center gap-0.5">
                          <ShieldCheck className="w-3 h-3" />
                          <span>手前</span>
                        </div>
                        <div className="font-extrabold text-[#E6D5B8]">{player.areaChoices.front}回</div>
                      </div>

                      <div className="p-1.5 rounded-lg bg-[#3D321F] border border-[#D4AF37]/30">
                        <div className="text-[10px] text-[#D4AF37] flex items-center justify-center gap-0.5">
                          <Scale className="w-3 h-3" />
                          <span>中間</span>
                        </div>
                        <div className="font-extrabold text-[#E6D5B8]">{player.areaChoices.middle}回</div>
                      </div>

                      <div className="p-1.5 rounded-lg bg-[#2D1622] border border-[#A64D79]/30">
                        <div className="text-[10px] text-[#A64D79] flex items-center justify-center gap-0.5">
                          <Zap className="w-3 h-3" />
                          <span>奥地</span>
                        </div>
                        <div className="font-extrabold text-[#E6D5B8]">{player.areaChoices.deep}回</div>
                      </div>
                    </div>
                  </div>

                  {/* Miss Count */}
                  <div className="text-[11px] text-[#8B735B] flex items-center justify-between mb-3 px-1">
                    <span className="flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-[#8B735B]" />
                      <span>ハズレ（成果ゼロ）回数</span>
                    </span>
                    <span className="font-bold text-[#E6D5B8] font-mono">{player.missCount}回</span>
                  </div>
                </div>

                {/* Full Collected Ores Pill Cloud */}
                <div className="pt-3 border-t border-[#4A3728]">
                  <div className="text-[11px] text-[#8B735B] font-bold mb-1.5">収集鉱石一覧</div>
                  {inventoryList.length === 0 ? (
                    <div className="text-xs text-[#8B735B] italic">鉱石の獲得はありませんでした</div>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {inventoryList.map(({ ore, count }) => (
                        <div
                          key={ore.id}
                          className="flex items-center gap-1 bg-[#1B120B] border border-[#4A3728] px-2 py-1 rounded-lg text-xs"
                        >
                          <OreIcon oreId={ore.id} size="sm" className="w-4 h-4" />
                          <span className="text-[#E6D5B8]">{ore.name}</span>
                          <span className="font-bold font-mono text-[#D4AF37]">×{count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

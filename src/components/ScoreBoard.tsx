import React, { useState } from 'react';
import { Pickaxe, Trophy, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { PlayerState, OreId } from '../types';
import { ORE_DATABASE } from '../data/gameData';
import { OreIcon } from './OreIcon';

interface ScoreBoardProps {
  players: PlayerState[];
  currentPlayerId: string;
  roundNumber: number;
  totalRounds: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  players,
  currentPlayerId,
  roundNumber,
  totalRounds,
}) => {
  const [expandedPlayerId, setExpandedPlayerId] = useState<string | null>(null);

  // Compute ranks with tie handling
  const sortedPlayers = [...players].sort((a, b) => b.totalValue - a.totalValue);
  const getRank = (player: PlayerState): number => {
    return sortedPlayers.findIndex((p) => p.totalValue === player.totalValue) + 1;
  };

  const getLeaderValue = (): number => {
    return sortedPlayers[0]?.totalValue || 0;
  };

  const leaderScore = getLeaderValue();

  return (
    <div className="w-full bg-[#231810] border border-[#4A3728] rounded-2xl p-3 md:p-4 backdrop-blur-md shadow-xl">
      {/* Top Bar: Round & Current Status */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#4A3728]">
        <div className="flex items-center gap-2">
          <div className="bg-[#3D2B1F] text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <Pickaxe className="w-3.5 h-3.5" />
            <span>現在の巡目: {roundNumber} / {totalRounds}</span>
          </div>
          <span className="text-xs text-[#8B735B] hidden sm:inline font-mono">
            全員同回数採掘
          </span>
        </div>

        <div className="text-xs text-[#8B735B] flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-[#D4AF37]" />
          <span>トップ: </span>
          <span className="font-mono font-bold text-[#D4AF37] text-sm">
            {leaderScore.toLocaleString('ja-JP')}円
          </span>
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {players.map((player) => {
          const isCurrent = player.id === currentPlayerId;
          const rank = getRank(player);
          const isExpanded = expandedPlayerId === player.id;
          const diffFromLeader = player.totalValue - leaderScore;

          // Non-empty inventory entries
          const inventoryList = (Object.keys(player.inventory) as OreId[])
            .filter((id) => id !== 'miss' && player.inventory[id] > 0)
            .map((id) => ({
              ore: ORE_DATABASE[id],
              count: player.inventory[id],
            }));

          return (
            <div
              key={player.id}
              className={`relative flex flex-col justify-between rounded-xl p-3 transition-all duration-200 ${
                isCurrent
                  ? 'bg-[#3D2B1F] border-2 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10 ring-1 ring-[#D4AF37] ring-inset'
                  : 'bg-[#1B120B] border border-[#4A3728] hover:border-[#8B735B]'
              }`}
            >
              {/* Active Player Glow Ribbon */}
              {isCurrent && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#1B120B] text-[10px] font-black tracking-wider px-2.5 py-0.5 rounded-full uppercase shadow flex items-center gap-1 animate-pulse">
                  <Pickaxe className="w-2.5 h-2.5" />
                  <span>現在の手番</span>
                </div>
              )}

              {/* Player Header */}
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className={`inline-block w-2.5 h-2.5 rounded-full shrink-0 ${player.color}`}
                    />
                    <span className="font-bold text-xs md:text-sm text-[#E6D5B8] truncate">
                      {player.name}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded shrink-0 ${
                      rank === 1
                        ? 'bg-[#3D2B1F] text-[#D4AF37] border border-[#D4AF37]/40'
                        : rank === 2
                        ? 'bg-[#2A1D13] text-[#E6D5B8] border border-[#4A3728]'
                        : 'bg-[#1B120B] text-[#8B735B] border border-[#4A3728]'
                    }`}
                  >
                    {rank === 1 ? '1st' : rank === 2 ? '2nd' : rank === 3 ? '3rd' : `${rank}th`}
                  </span>
                </div>

                {/* Score */}
                <div className="mt-1">
                  <div className="text-base md:text-xl font-mono font-bold text-[#D4AF37] tracking-tight flex items-baseline gap-0.5">
                    <span>{player.totalValue.toLocaleString('ja-JP')}</span>
                    <span className="text-[10px] md:text-xs font-bold text-[#8B735B]">円</span>
                  </div>

                  {/* Diff from leader */}
                  {rank > 1 && (
                    <div className="text-[10px] text-[#8B735B] font-mono">
                      首位差: {diffFromLeader.toLocaleString('ja-JP')}円
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Info: Attempts Left & Inventory Trigger */}
              <div className="mt-2 pt-2 border-t border-[#4A3728] flex items-center justify-between text-[11px]">
                <span className="text-[#8B735B]">
                  残 <span className="font-bold text-[#E6D5B8]">{player.attemptsLeft}</span>/{player.totalAttempts}回
                </span>

                <button
                  onClick={() => setExpandedPlayerId(isExpanded ? null : player.id)}
                  className="text-[#8B735B] hover:text-[#D4AF37] text-[10px] flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#2A1D13] hover:bg-[#3D2B1F] border border-[#4A3728] transition-colors"
                  title="所持鉱石の内訳を見る"
                >
                  <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
                  <span>所持品</span>
                  {isExpanded ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
                </button>
              </div>

              {/* Expanded Inventory Popup / Drawer */}
              {isExpanded && (
                <div className="mt-2 p-2.5 bg-[#2C1E14] border border-[#4A3728] rounded-lg text-xs space-y-1.5">
                  <div className="text-[10px] text-[#8B735B] font-bold mb-1 flex items-center justify-between">
                    <span>採掘した鉱石</span>
                    <span className="font-mono">計 {player.completedAttempts}回</span>
                  </div>
                  {inventoryList.length === 0 ? (
                    <div className="text-[10px] text-[#8B735B] italic">まだ鉱石がありません</div>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {inventoryList.map(({ ore, count }) => (
                        <div
                          key={ore.id}
                          className="flex items-center gap-1 bg-[#3D2B1F] px-1.5 py-0.5 rounded border border-[#4A3728] text-[10px]"
                        >
                          <OreIcon oreId={ore.id} size="sm" className="w-3.5 h-3.5" />
                          <span className="text-[#E6D5B8]">{ore.name}</span>
                          <span className="font-bold font-mono text-[#D4AF37]">×{count}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {player.missCount > 0 && (
                    <div className="text-[10px] text-[#8B735B] pt-0.5 font-mono">
                      ハズレ回数: {player.missCount}回
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

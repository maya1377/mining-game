import React from 'react';
import { X, History, Pickaxe } from 'lucide-react';
import { TurnHistoryItem } from '../types';
import { OreIcon } from './OreIcon';

interface GameHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: TurnHistoryItem[];
}

export const GameHistoryModal: React.FC<GameHistoryModalProps> = ({
  isOpen,
  onClose,
  history,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[85vh] flex flex-col bg-[#231810] border border-[#4A3728] rounded-3xl p-5 md:p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#4A3728] shrink-0">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-lg font-black text-[#E6D5B8]">
              採掘ログ履歴（全{history.length}手番）
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#1B120B] hover:bg-[#3D2B1F] text-[#8B735B] hover:text-[#E6D5B8] transition-colors border border-[#4A3728]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2 pr-1">
          {history.length === 0 ? (
            <div className="text-center py-8 text-[#8B735B] text-sm">
              まだ採掘履歴はありません
            </div>
          ) : (
            [...history].reverse().map((item, idx) => {
              const itemNumber = history.length - idx;
              return (
                <div
                  key={`${item.turnIndex}-${idx}`}
                  className="p-3 rounded-xl bg-[#1B120B] border border-[#4A3728] flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-[10px] text-[#8B735B] w-6 shrink-0">
                      #{itemNumber}
                    </span>

                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.playerColor}`} />
                      <span className="font-bold text-[#E6D5B8] truncate">{item.playerName}</span>
                      <span className="text-[10px] text-[#8B735B]">
                        ({item.attemptNumber}/{item.totalAttempts}回目)
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        item.areaId === 'front'
                          ? 'bg-[#2A3520] text-[#8BA870] border border-[#8BA870]/40'
                          : item.areaId === 'middle'
                          ? 'bg-[#3D321F] text-[#D4AF37] border border-[#D4AF37]/40'
                          : 'bg-[#2D1622] text-[#A64D79] border border-[#A64D79]/40'
                      }`}
                    >
                      {item.areaName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center gap-1">
                      <OreIcon oreId={item.ore.id} size="sm" className="w-4 h-4" />
                      <span
                        className={`font-extrabold ${
                          item.isMiss ? 'text-[#8B735B]' : 'text-[#D4AF37]'
                        }`}
                      >
                        {item.isMiss
                          ? 'ハズレ (0円)'
                          : `+${item.value.toLocaleString('ja-JP')}円`}
                      </span>
                    </div>

                    <div className="text-[10px] text-[#8B735B] font-mono bg-[#2C1E14] border border-[#4A3728] px-1.5 py-0.5 rounded">
                      累計: {item.playerTotalAfter.toLocaleString('ja-JP')}円
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#4A3728] shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#3D2B1F] hover:bg-[#4A3728] text-[#E6D5B8] font-bold text-xs transition-colors border border-[#4A3728] cursor-pointer"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

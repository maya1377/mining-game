import React, { useState } from 'react';
import { X, BookOpen, ShieldCheck, Scale, Zap, Sparkles, HelpCircle, Eye, EyeOff, Bot } from 'lucide-react';
import { AREA_DEFINITIONS, ORE_DATABASE } from '../data/gameData';
import { OreIcon } from './OreIcon';
import { OreId } from '../types';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  const [showDetailedProbs, setShowDetailedProbs] = useState(false);

  if (!isOpen) return null;

  const oreIdsOrder: OreId[] = [
    'stone',
    'copper',
    'iron',
    'silver',
    'gold',
    'gem',
    'rare',
    'legendary',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#231810] border border-[#4A3728] rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#4A3728]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-xl font-black text-[#E6D5B8]">
              「みんなで採掘！」ゲームのルール＆ガイド
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#1B120B] hover:bg-[#3D2B1F] text-[#8B735B] hover:text-[#E6D5B8] transition-colors border border-[#4A3728]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Concept */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-[#D4AF37] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>ゲームの基本ルール</span>
          </h3>
          <p className="text-xs md:text-sm text-[#E6D5B8] leading-relaxed">
            手番が来たら「どこ掘る？」の合言葉で3つの採掘エリア（手前・中間・奥地）から1つを選びます。
            採掘結果は即座に判定され、発掘された鉱石の価値があなたの総資産に加算されます。
            全員が決まった回数（2人なら10回、3人なら8回、4人なら7回）採掘し終えた時点で、最も総資産が高いプレイヤーの勝利です！
          </p>
        </div>

        {/* Three Mining Areas */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-[#D4AF37]">3つの採掘エリアの特徴</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {/* Front */}
            <div className="p-3 rounded-2xl bg-[#2A3520] border border-[#8BA870]/40">
              <div className="flex items-center gap-1.5 text-[#8BA870] font-black text-sm mb-1">
                <ShieldCheck className="w-4 h-4 text-[#8BA870]" />
                <span>手前 (浅瀬)</span>
              </div>
              <div className="text-xs text-[#8BA870] font-bold mb-1">
                発見率：約82%（安定型）
              </div>
              <p className="text-[11px] text-[#8B735B] leading-relaxed">
                低リスク・低分散。ハズレが少なく着実に銅・鉄・銀などを稼げます。トップを守りたい時におすすめ。
              </p>
            </div>

            {/* Middle */}
            <div className="p-3 rounded-2xl bg-[#3D321F] border border-[#D4AF37]/40">
              <div className="flex items-center gap-1.5 text-[#D4AF37] font-black text-sm mb-1">
                <Scale className="w-4 h-4 text-[#D4AF37]" />
                <span>中間 (中層)</span>
              </div>
              <div className="text-xs text-[#D4AF37] font-bold mb-1">
                発見率：約55%（バランス型）
              </div>
              <p className="text-[11px] text-[#8B735B] leading-relaxed">
                中リスク・中分散。手前よりハズレが増える分、金鉱石や宝石原石、希少鉱石の期待が持てます。
              </p>
            </div>

            {/* Deep */}
            <div className="p-3 rounded-2xl bg-[#2D1622] border border-[#A64D79]/40">
              <div className="flex items-center gap-1.5 text-[#A64D79] font-black text-sm mb-1">
                <Zap className="w-4 h-4 text-[#A64D79]" />
                <span>奥地 (深部)</span>
              </div>
              <div className="text-xs text-[#A64D79] font-bold mb-1">
                発見率：約24%（一発逆転型）
              </div>
              <p className="text-[11px] text-[#8B735B] leading-relaxed">
                高リスク・大分散。約76%がハズレですが、最高額50,000円の「伝説の虹晶石」が出る唯一の場所！
              </p>
            </div>
          </div>
        </div>

        {/* Ore Database */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-[#D4AF37]">鉱石カタログ＆価値一覧</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {oreIdsOrder.map((id) => {
              const ore = ORE_DATABASE[id];
              return (
                <div
                  key={id}
                  className="p-2.5 rounded-xl bg-[#1B120B] border border-[#4A3728] flex items-center gap-2"
                >
                  <OreIcon oreId={id} size="sm" className="w-6 h-6 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#E6D5B8] truncate">{ore.name}</div>
                    <div className="text-[11px] font-mono font-black text-[#D4AF37]">
                      {ore.value.toLocaleString('ja-JP')}円
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-[11px] text-[#8B735B]">
            ※「何も見つからない (0円)」と「石ころ (100円)」は別物です。石ころも立派な100円の資産になります！
          </div>
        </div>

        {/* Detailed Probabilities Toggle (Requirement 11) */}
        <div className="pt-2 border-t border-[#4A3728]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#E6D5B8] flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-[#8B735B]" />
              <span>詳細な確率テーブル・期待値（開発検証済み）</span>
            </span>
            <button
              onClick={() => setShowDetailedProbs(!showDetailedProbs)}
              className="text-xs text-[#D4AF37] hover:text-[#e0be4d] font-bold flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1B120B] border border-[#4A3728] transition-colors cursor-pointer"
            >
              {showDetailedProbs ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showDetailedProbs ? '閉じる' : '詳細表を表示'}</span>
            </button>
          </div>

          {showDetailedProbs && (
            <div className="p-3 rounded-2xl bg-[#1B120B] border border-[#4A3728] space-y-3 text-xs text-[#E6D5B8]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#4A3728] text-[#8B735B]">
                      <th className="py-1.5 px-2">鉱石 / 成果</th>
                      <th className="py-1.5 px-2">手前</th>
                      <th className="py-1.5 px-2">中間</th>
                      <th className="py-1.5 px-2">奥地</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#4A3728]/60 font-medium">
                    <tr>
                      <td className="py-1.5 px-2 text-[#8B735B]">何も見つからない</td>
                      <td className="py-1.5 px-2">18.0%</td>
                      <td className="py-1.5 px-2">45.0%</td>
                      <td className="py-1.5 px-2">76.0%</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2">石ころ (100円)</td>
                      <td className="py-1.5 px-2">8.0%</td>
                      <td className="py-1.5 px-2">5.0%</td>
                      <td className="py-1.5 px-2">1.0%</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2">銅鉱石 (1,000円)</td>
                      <td className="py-1.5 px-2">25.0%</td>
                      <td className="py-1.5 px-2">10.0%</td>
                      <td className="py-1.5 px-2">1.0%</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2">鉄鉱石 (2,500円)</td>
                      <td className="py-1.5 px-2">25.0%</td>
                      <td className="py-1.5 px-2">15.0%</td>
                      <td className="py-1.5 px-2">2.0%</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2">銀鉱石 (5,000円)</td>
                      <td className="py-1.5 px-2">15.0%</td>
                      <td className="py-1.5 px-2">13.0%</td>
                      <td className="py-1.5 px-2">5.0%</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2">金鉱石 (8,000円)</td>
                      <td className="py-1.5 px-2">8.0%</td>
                      <td className="py-1.5 px-2">8.0%</td>
                      <td className="py-1.5 px-2">7.0%</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2">宝石原石 (15,000円)</td>
                      <td className="py-1.5 px-2">1.0%</td>
                      <td className="py-1.5 px-2">3.0%</td>
                      <td className="py-1.5 px-2">5.0%</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2 text-[#A64D79] font-bold">希少鉱石 (30,000円)</td>
                      <td className="py-1.5 px-2">-</td>
                      <td className="py-1.5 px-2">1.0%</td>
                      <td className="py-1.5 px-2">2.5%</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2 text-[#D4AF37] font-bold">伝説の虹晶石 (50,000円)</td>
                      <td className="py-1.5 px-2">-</td>
                      <td className="py-1.5 px-2">-</td>
                      <td className="py-1.5 px-2 text-[#D4AF37] font-bold">0.5%</td>
                    </tr>
                    <tr className="border-t-2 border-[#4A3728] bg-[#231810] font-bold font-mono">
                      <td className="py-2 px-2 text-[#D4AF37]">1回あたり平均期待値</td>
                      <td className="py-2 px-2 text-[#8BA870]">約2,423円</td>
                      <td className="py-2 px-2 text-[#D4AF37]">約2,520円</td>
                      <td className="py-2 px-2 text-[#A64D79]">約2,621円</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-[#8B735B]">
                ※3エリアの平均期待値はどれも約2,400〜2,600円で設計されており、一方的な最強エリアは存在しません。点差・残り回数に応じた駆け引きが勝利の鍵です！
              </p>
            </div>
          )}
        </div>

        {/* AI Participation Instructions */}
        <div className="p-3.5 rounded-2xl bg-[#1B120B] border border-[#4A3728] space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#E6D5B8]">
            <Bot className="w-4 h-4 text-[#D4AF37]" />
            <span>外部AI（ChatGPT / Claude等）との遊び方</span>
          </div>
          <p className="text-xs text-[#8B735B] leading-relaxed">
            ゲーム画面上の「AI用ログをコピー」ボタンを押すと、現在の公開ゲーム情報（順位・スコア・残り回数）がクリップボードにコピーされます。外部AIチャットにそのままペーストするだけで、AIが「手前・中間・奥地」を選んでコメント付きで返信してくれます。
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#3D2B1F] hover:bg-[#4A3728] text-[#E6D5B8] font-bold text-sm transition-colors border border-[#4A3728] cursor-pointer"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

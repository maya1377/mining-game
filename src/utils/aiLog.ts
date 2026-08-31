import { ORE_DATABASE } from '../data/gameData';
import { AreaId, OreId, PlayerState, TurnHistoryItem } from '../types';

export function generateAILog(
  currentPlayer: PlayerState,
  allPlayers: PlayerState[],
  history: TurnHistoryItem[]
): string {
  // Sort players by total score descending to determine rank
  const rankedPlayers = [...allPlayers].sort((a, b) => b.totalValue - a.totalValue);

  const currentAttempt = currentPlayer.completedAttempts + 1;
  const totalAttempts = currentPlayer.totalAttempts;

  // Format Standings / Ranking
  const standingsLines = rankedPlayers.map((p, idx) => {
    const isCurrent = p.id === currentPlayer.id ? ' ★現在手番' : '';
    return `${idx + 1}位: ${p.name} - ${p.totalValue.toLocaleString('ja-JP')}円 (残り${p.attemptsLeft}回)${isCurrent}`;
  });

  // Current Player's inventory summary
  const inventoryEntries = (Object.keys(currentPlayer.inventory) as OreId[])
    .filter((k) => k !== 'miss' && currentPlayer.inventory[k] > 0)
    .map((k) => `${ORE_DATABASE[k].name} ×${currentPlayer.inventory[k]}`);

  const inventoryStr = inventoryEntries.length > 0 ? inventoryEntries.join('、 ') : 'まだ鉱石なし';

  // Last 2-3 recent mining results
  const recentHistory = history.slice(-3);
  const recentHistoryLines =
    recentHistory.length > 0
      ? recentHistory.map((item) => {
          const resStr = item.isMiss
            ? '何も見つからない (0円)'
            : `${item.ore.name} (+${item.value.toLocaleString('ja-JP')}円)`;
          return `- ${item.playerName} (採掘${item.attemptNumber}回目): [${item.areaName}] → ${resStr}`;
        })
      : ['- まだ採掘履歴はありません'];

  return `【ゲーム】みんなで採掘！
【現在の手番】${currentPlayer.name}（第${currentAttempt}回目 / 全${totalAttempts}回）

■ 現在の順位・スコア
${standingsLines.join('\n')}

■ あなた（${currentPlayer.name}）の所持鉱石
${inventoryStr}

■ 直近の採掘ログ
${recentHistoryLines.join('\n')}

■ 選択できる採掘エリア
1. 手前 (高発見率・安定型 / 発見率約82% / リスク低・手堅い収入)
2. 中間 (中発見率・バランス型 / 発見率約55% / リスク中・中レア鉱石も狙える)
3. 奥地 (低発見率・一発逆転型 / 発見率約24% / リスク高・伝説の虹晶石が出現する唯一の場所)

--------------------------------------------------
【指示】
「手前」「中間」「奥地」から1つ選んでください。

回答の1行目には、最終的に選ぶ採掘場所を1つだけ書いてください。

1行目には
「手前」
「中間」
「奥地」
のいずれか以外を書かないでください。

2行目以降では、その場所を選んだ理由や現在の順位へのリアクションなどを短くコメントしてください。

長い分析や詳細な戦略説明は不要です。
ゲームのテンポを保つ程度に簡潔にしてください。

複数候補を最終回答として提示しないでください。
--------------------------------------------------`;
}

/**
 * Copy text to clipboard with fallback
 */
export async function copyToClipboard(text: string): Promise<{ success: boolean; fallbackText?: string }> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return { success: true };
    }
  } catch {
    // Fallback below
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    if (successful) {
      return { success: true };
    }
  } catch {
    // Fallback failed
  }

  return { success: false, fallbackText: text };
}

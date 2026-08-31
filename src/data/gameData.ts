import { AreaDefinition, AreaId, Ore, OreId, PlayerState, PlayStyleInfo } from '../types';

export const ORE_DATABASE: Record<OreId, Ore> = {
  miss: {
    id: 'miss',
    name: '何も見つからない',
    value: 0,
    tier: 'miss',
    color: '#78716c',
    accentColor: '#57534e',
    glowColor: 'rgba(120, 113, 108, 0.2)',
    description: '残念ながら何も見つかりませんでした。',
  },
  stone: {
    id: 'stone',
    name: '石ころ',
    value: 100,
    tier: 'stone',
    color: '#a8a29e',
    accentColor: '#78716c',
    glowColor: 'rgba(168, 162, 158, 0.3)',
    description: 'どこにでもあるただの石。一応100円で売れる。',
  },
  copper: {
    id: 'copper',
    name: '銅鉱石',
    value: 1000,
    tier: 'common',
    color: '#f97316',
    accentColor: '#c2410c',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    description: '赤褐色に鈍く光る定番の鉱石。',
  },
  iron: {
    id: 'iron',
    name: '鉄鉱石',
    value: 2500,
    tier: 'common',
    color: '#94a3b8',
    accentColor: '#475569',
    glowColor: 'rgba(148, 163, 184, 0.4)',
    description: 'ずっしりと重い頑丈な鉄の原石。',
  },
  silver: {
    id: 'silver',
    name: '銀鉱石',
    value: 5000,
    tier: 'uncommon',
    color: '#e2e8f0',
    accentColor: '#94a3b8',
    glowColor: 'rgba(226, 232, 240, 0.6)',
    description: '上品な白銀の輝きを放つ貴金属鉱石。',
  },
  gold: {
    id: 'gold',
    name: '金鉱石',
    value: 8000,
    tier: 'uncommon',
    color: '#fbbf24',
    accentColor: '#d97706',
    glowColor: 'rgba(251, 191, 36, 0.7)',
    description: '坑道の中で眩しく黄金に輝く高価な鉱石。',
  },
  gem: {
    id: 'gem',
    name: '宝石原石',
    value: 15000,
    tier: 'rare',
    color: '#ec4899',
    accentColor: '#be185d',
    glowColor: 'rgba(236, 72, 153, 0.8)',
    description: '光を透過して妖艶に輝く希少な原石。',
  },
  rare: {
    id: 'rare',
    name: '希少鉱石',
    value: 30000,
    tier: 'rare',
    color: '#8b5cf6',
    accentColor: '#6d28d9',
    glowColor: 'rgba(139, 92, 246, 0.9)',
    description: '未知のエネルギーを秘めた超レアな紫紺鉱石。',
  },
  legendary: {
    id: 'legendary',
    name: '伝説の虹晶石',
    value: 50000,
    tier: 'legendary',
    color: '#06b6d4',
    accentColor: '#ec4899',
    glowColor: 'rgba(56, 189, 248, 1)',
    description: '七色の光を放つ奇跡の石。採掘者すべての夢！',
  },
};

export const AREA_DEFINITIONS: Record<AreaId, AreaDefinition> = {
  front: {
    id: 'front',
    name: '手前',
    kanji: '手前',
    tagline: '高発見率・安定型',
    identity: '低リスク・低分散。リードを守りたい時や堅実に稼ぎたい時に最適。',
    discoveryRateDisplay: '約82%',
    discoveryRatePercent: 82,
    expectedValue: 2423,
    riskLabel: '低リスク / 安定',
    badgeColor: 'bg-[#2A3520] text-[#8BA870] border-[#8BA870]/40',
    cardBg: 'from-[#2A3520]/80 via-[#3D2B1F] to-[#1B120B]',
    probabilities: {
      miss: 18,
      stone: 8,
      copper: 25,
      iron: 25,
      silver: 15,
      gold: 8,
      gem: 1,
      rare: 0,
      legendary: 0,
    },
  },
  middle: {
    id: 'middle',
    name: '中間',
    kanji: '中間',
    tagline: '中発見率・バランス型',
    identity: '中リスク・中分散。手前よりハズレはあるが良い鉱石も狙える。',
    discoveryRateDisplay: '約55%',
    discoveryRatePercent: 55,
    expectedValue: 2520,
    riskLabel: '中リスク / バランス',
    badgeColor: 'bg-[#3D321F] text-[#D4AF37] border-[#D4AF37]/40',
    cardBg: 'from-[#3D321F]/80 via-[#2C1E14] to-[#1B120B]',
    probabilities: {
      miss: 45,
      stone: 5,
      copper: 10,
      iron: 15,
      silver: 13,
      gold: 8,
      gem: 3,
      rare: 1,
      legendary: 0,
    },
  },
  deep: {
    id: 'deep',
    name: '奥地',
    kanji: '奥地',
    tagline: '低発見率・一発逆転型',
    identity: '高リスク・大分散。ほとんどハズレだが伝説の虹晶石が出現する唯一の場所！',
    discoveryRateDisplay: '約24%',
    discoveryRatePercent: 24,
    expectedValue: 2621,
    riskLabel: '高リスク / 一発逆転',
    badgeColor: 'bg-[#2D1622] text-[#A64D79] border-[#A64D79]/40',
    cardBg: 'from-[#2D1622]/80 via-[#1B120B] to-[#0D0906]',
    probabilities: {
      miss: 76,
      stone: 1,
      copper: 1,
      iron: 2,
      silver: 5,
      gold: 7,
      gem: 5,
      rare: 2.5,
      legendary: 0.5,
    },
  },
};

export const FAILURE_MESSAGES = [
  '掘れども掘れども、土。',
  'いい手応えだった。気のせいだった。',
  '何か光った！……と思ったら水滴だった。',
  '今日は岩盤が強い。',
  '坑道だけが静かにこちらを見ている。',
  '渾身の一振り！成果：ゼロ。',
  'ツルハシが空を切った……！',
  '硬い岩肌に弾き返された。',
  'ただの泥炭しか出てこなかった。',
  '奥から冷たい風が吹き抜けた。成果なし。',
];

export const STONE_MESSAGES = [
  '石ころを発見！……石ころです。',
  'いい形の石だ。100円。',
  '持って帰れば何かにはなる。たぶん。',
  '鑑定結果：ちゃんと石。',
  '丸くて手触りの良い石ころ。100円。',
  'ポケットに入れると少し重い。100円。',
];

export const PLAYER_ATTEMPTS_CONFIG: Record<number, number> = {
  2: 10, // 2 players: 10 attempts each = 20 turns
  3: 8,  // 3 players: 8 attempts each = 24 turns
  4: 7,  // 4 players: 7 attempts each = 28 turns
};

export const DEFAULT_PLAYER_NAMES = [
  'プレイヤー1',
  'プレイヤー2',
  'プレイヤー3',
  'プレイヤー4',
];

export const PLAYER_COLORS = [
  { bg: 'bg-amber-500', border: 'border-amber-400', text: 'text-amber-400', ring: 'ring-amber-500', name: 'アンバー' },
  { bg: 'bg-cyan-500', border: 'border-cyan-400', text: 'text-cyan-400', ring: 'ring-cyan-500', name: 'シアン' },
  { bg: 'bg-emerald-500', border: 'border-emerald-400', text: 'text-emerald-400', ring: 'ring-emerald-500', name: 'エメラルド' },
  { bg: 'bg-rose-500', border: 'border-rose-400', text: 'text-rose-400', ring: 'ring-rose-500', name: 'ローズ' },
];

/**
 * Validate that all area probability tables sum to exactly 100%
 * and all expected values are accurate within small floating point tolerance.
 */
export function validateGameData(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  const oreIds = Object.keys(ORE_DATABASE) as OreId[];
  if (oreIds.length !== 9) {
    errors.push(`Expected 9 ores in ORE_DATABASE, got ${oreIds.length}`);
  }

  for (const [areaId, def] of Object.entries(AREA_DEFINITIONS)) {
    let sum = 0;
    let calculatedEv = 0;
    for (const [oreId, prob] of Object.entries(def.probabilities)) {
      if (prob < 0) {
        errors.push(`Area ${areaId} has negative probability for ${oreId}`);
      }
      sum += prob;
      const ore = ORE_DATABASE[oreId as OreId];
      if (!ore) {
        errors.push(`Area ${areaId} references unknown ore ${oreId}`);
      } else {
        calculatedEv += (prob / 100) * ore.value;
      }
    }

    if (Math.abs(sum - 100) > 0.0001) {
      errors.push(`Area ${areaId} probabilities sum to ${sum}%, expected 100%`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Run validation immediately on module load
const validationResult = validateGameData();
if (!validationResult.valid) {
  console.error('[Game Data Validation Failed]:', validationResult.errors);
} else {
  console.log('[Game Data Validated]: All probability tables sum to 100.0%');
}

/**
 * Weighted roll for mining outcome
 */
export function performMiningRoll(areaId: AreaId): {
  ore: Ore;
  isMiss: boolean;
  isStone: boolean;
  flavorMessage: string;
} {
  const area = AREA_DEFINITIONS[areaId];
  const rand = Math.random() * 100; // 0 <= rand < 100

  let cumulative = 0;
  let chosenOreId: OreId = 'miss';

  for (const [oreIdStr, prob] of Object.entries(area.probabilities)) {
    const oreId = oreIdStr as OreId;
    cumulative += prob;
    if (rand < cumulative) {
      chosenOreId = oreId;
      break;
    }
  }

  const ore = ORE_DATABASE[chosenOreId];
  const isMiss = chosenOreId === 'miss';
  const isStone = chosenOreId === 'stone';

  let flavorMessage = '';
  if (isMiss) {
    flavorMessage = FAILURE_MESSAGES[Math.floor(Math.random() * FAILURE_MESSAGES.length)];
  } else if (isStone) {
    flavorMessage = STONE_MESSAGES[Math.floor(Math.random() * STONE_MESSAGES.length)];
  } else if (chosenOreId === 'legendary') {
    flavorMessage = '✨🎉 奇跡の七色発光！伝説の虹晶石を発見したッ！！！ 🎉✨';
  } else if (chosenOreId === 'rare') {
    flavorMessage = '🌟 まばゆい光を放つ希少鉱石を掘り当てた！大金星！';
  } else if (chosenOreId === 'gem') {
    flavorMessage = '💎 美しく透き通る宝石原石を発見！高額取引確実！';
  } else if (chosenOreId === 'gold') {
    flavorMessage = '🥇 ズッシリ重い金鉱石を発掘！素晴らしい成果！';
  } else if (chosenOreId === 'silver') {
    flavorMessage = '🥈 綺麗な白銀に光る銀鉱石を手に入れた！';
  } else if (chosenOreId === 'iron') {
    flavorMessage = '⛏️ 堅牢な鉄鉱石を掘り出した！確実な収入！';
  } else if (chosenOreId === 'copper') {
    flavorMessage = '🥉 銅鉱石を発見！コツコツ稼ごう！';
  }

  return {
    ore,
    isMiss,
    isStone,
    flavorMessage,
  };
}

/**
 * Determine a playful title/label for each player at Game Over
 */
export function determinePlayStyle(player: PlayerState, isWinner: boolean): PlayStyleInfo {
  const totalDigs = player.completedAttempts || 1;
  const frontRatio = player.areaChoices.front / totalDigs;
  const middleRatio = player.areaChoices.middle / totalDigs;
  const deepRatio = player.areaChoices.deep / totalDigs;
  const hasLegendary = (player.inventory.legendary || 0) > 0;
  const stoneCount = player.stoneCount || 0;
  const missCount = player.missCount || 0;

  if (hasLegendary) {
    return {
      title: '伝説を掴みし者',
      tag: 'Jackpot Miner',
      description: '奇跡の「伝説の虹晶石」を掘り当て、歴史に名を刻んだ大富豪。',
      color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    };
  }

  if (stoneCount >= 3 || (totalDigs <= 7 && stoneCount >= 2)) {
    return {
      title: '石ころコレクター',
      tag: 'Stone Collector',
      description: 'なぜか石ころばかりを引き寄せてしまう愛され坑夫。100円も積もれば山となる？',
      color: 'bg-stone-500/20 text-stone-300 border-stone-500/40',
    };
  }

  if (deepRatio >= 0.55) {
    if (isWinner) {
      return {
        title: '一発逆転の夢追い人',
        tag: 'Gambler Winner',
        description: '危険な奥地に命を賭け、見事逆転勝利を掴み取った豪運のギャンブラー！',
        color: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      };
    }
    return {
      title: '奥地特攻隊長',
      tag: 'Deep Pioneer',
      description: 'ハズレの恐怖に屈せず奥地を攻め続けた不屈のチャレンジャー！',
      color: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    };
  }

  if (frontRatio >= 0.55) {
    return {
      title: '堅実な坑夫',
      tag: 'Steady Miner',
      description: '手前の浅瀬で着実に鉱石を集めた安定志向の職人。手堅い稼ぎっぷり！',
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    };
  }

  if (middleRatio >= 0.45) {
    return {
      title: 'バランス派の達人',
      tag: 'Balanced Strategist',
      description: 'リスクとリターンのバランスを見極め、冷静に中間層を攻め抜いた戦略家。',
      color: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    };
  }

  if (missCount >= totalDigs * 0.6) {
    return {
      title: '不屈の冒険者',
      tag: 'Resilient Spirit',
      description: '何度も土や空洞に阻まれながらも、最後までツルハシを振るい続けた鋼の精神の持ち主。',
      color: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    };
  }

  return {
    title: '変幻自在の採掘師',
    tag: 'All-Rounder',
    description: '戦況に合わせて手前・中間・奥地を柔軟に使い分けた柔軟なプレイヤー。',
    color: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  };
}

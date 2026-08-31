export type GamePhase = 'setup' | 'areaSelection' | 'miningResult' | 'gameOver';

export type AreaId = 'front' | 'middle' | 'deep';

export type OreId =
  | 'miss'
  | 'stone'
  | 'copper'
  | 'iron'
  | 'silver'
  | 'gold'
  | 'gem'
  | 'rare'
  | 'legendary';

export type RarityTier = 'miss' | 'stone' | 'common' | 'uncommon' | 'rare' | 'legendary';

export interface Ore {
  id: OreId;
  name: string;
  value: number;
  tier: RarityTier;
  color: string;
  accentColor: string;
  glowColor: string;
  description: string;
}

export interface AreaDefinition {
  id: AreaId;
  name: string;
  kanji: string;
  tagline: string;
  identity: string;
  discoveryRateDisplay: string;
  discoveryRatePercent: number;
  expectedValue: number;
  riskLabel: string;
  badgeColor: string;
  cardBg: string;
  probabilities: Record<OreId, number>; // Must sum to 100 (in percentage)
}

export interface PlayerState {
  id: string;
  name: string;
  color: string;
  colorName: string;
  avatarSeed: number;
  totalValue: number;
  attemptsLeft: number;
  totalAttempts: number;
  completedAttempts: number;
  inventory: Record<OreId, number>;
  areaChoices: {
    front: number;
    middle: number;
    deep: number;
  };
  missCount: number;
  stoneCount: number;
  highestOre: Ore | null;
}

export interface TurnHistoryItem {
  turnIndex: number;
  playerId: string;
  playerName: string;
  playerColor: string;
  attemptNumber: number;
  totalAttempts: number;
  areaId: AreaId;
  areaName: string;
  ore: Ore;
  isMiss: boolean;
  isStone: boolean;
  value: number;
  flavorMessage: string;
  playerTotalAfter: number;
  timestamp: number;
}

export interface PlayStyleInfo {
  title: string;
  description: string;
  tag: string;
  color: string;
}

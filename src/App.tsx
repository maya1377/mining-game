import React, { useState, useEffect } from 'react';
import {
  Pickaxe,
  Copy,
  Check,
  History,
  BookOpen,
  Volume2,
  VolumeX,
  Sparkles,
  BarChart3,
  Flame,
} from 'lucide-react';
import {
  AreaId,
  GamePhase,
  PlayerState,
  TurnHistoryItem,
  Ore,
  AreaDefinition,
} from './types';
import {
  AREA_DEFINITIONS,
  DEFAULT_PLAYER_NAMES,
  PLAYER_ATTEMPTS_CONFIG,
  PLAYER_COLORS,
  performMiningRoll,
} from './data/gameData';
import { ScoreBoard } from './components/ScoreBoard';
import { AreaCard } from './components/AreaCard';
import { MiningResultModal } from './components/MiningResultModal';
import { SetupScreen } from './components/SetupScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { RulesModal } from './components/RulesModal';
import { GameHistoryModal } from './components/GameHistoryModal';
import { DevBalanceModal } from './components/DevBalanceModal';
import { generateAILog, copyToClipboard } from './utils/aiLog';
import { sound } from './utils/audio';

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('setup');
  const [players, setPlayers] = useState<PlayerState[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [turnHistory, setTurnHistory] = useState<TurnHistoryItem[]>([]);
  const [isProcessingMining, setIsProcessingMining] = useState<boolean>(false);

  // Result Modal State
  const [activeMiningResult, setActiveMiningResult] = useState<{
    player: PlayerState;
    area: AreaDefinition;
    ore: Ore;
    isMiss: boolean;
    isStone: boolean;
    flavorMessage: string;
    previousTotal: number;
    newTotal: number;
    rank: number;
  } | null>(null);

  // UI Modals
  const [rulesOpen, setRulesOpen] = useState<boolean>(false);
  const [historyOpen, setHistoryOpen] = useState<boolean>(false);
  const [balanceSimOpen, setBalanceSimOpen] = useState<boolean>(false);
  const [fallbackCopyText, setFallbackCopyText] = useState<string | null>(null);
  const [copySuccessToast, setCopySuccessToast] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());

  // Sound toggle
  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  // Start a new game with given names
  const handleStartGame = (playerNames: string[]) => {
    const count = playerNames.length;
    const attempts = PLAYER_ATTEMPTS_CONFIG[count];

    const initialPlayers: PlayerState[] = playerNames.map((name, idx) => ({
      id: `p-${idx + 1}`,
      name: name.trim() || `プレイヤー${idx + 1}`,
      color: PLAYER_COLORS[idx].bg,
      colorName: PLAYER_COLORS[idx].name,
      avatarSeed: idx,
      totalValue: 0,
      attemptsLeft: attempts,
      totalAttempts: attempts,
      completedAttempts: 0,
      inventory: {
        miss: 0,
        stone: 0,
        copper: 0,
        iron: 0,
        silver: 0,
        gold: 0,
        gem: 0,
        rare: 0,
        legendary: 0,
      },
      areaChoices: {
        front: 0,
        middle: 0,
        deep: 0,
      },
      missCount: 0,
      stoneCount: 0,
      highestOre: null,
    }));

    setPlayers(initialPlayers);
    setCurrentPlayerIndex(0);
    setTurnHistory([]);
    setActiveMiningResult(null);
    setIsProcessingMining(false);
    setPhase('areaSelection');
  };

  // Restart with same players
  const handlePlayAgainSamePlayers = () => {
    sound.playPickaxe();
    const names = players.map((p) => p.name);
    handleStartGame(names);
  };

  // Back to setup
  const handleNewGameSetup = () => {
    sound.playClick();
    setPhase('setup');
  };

  // Select mining area
  const handleSelectArea = (areaId: AreaId) => {
    if (isProcessingMining || phase !== 'areaSelection') return;
    setIsProcessingMining(true);
    sound.playPickaxe();

    const currentPlayer = players[currentPlayerIndex];
    const area = AREA_DEFINITIONS[areaId];
    const previousTotal = currentPlayer.totalValue;

    // Perform ONE local weighted mining roll
    const roll = performMiningRoll(areaId);
    const addedValue = roll.ore.value;
    const newTotal = previousTotal + addedValue;

    // Update Player State
    const updatedInventory = {
      ...currentPlayer.inventory,
      [roll.ore.id]: (currentPlayer.inventory[roll.ore.id] || 0) + 1,
    };

    const isHigherOre =
      !currentPlayer.highestOre || roll.ore.value > currentPlayer.highestOre.value;

    const updatedPlayer: PlayerState = {
      ...currentPlayer,
      totalValue: newTotal,
      attemptsLeft: currentPlayer.attemptsLeft - 1,
      completedAttempts: currentPlayer.completedAttempts + 1,
      inventory: updatedInventory,
      areaChoices: {
        ...currentPlayer.areaChoices,
        [areaId]: currentPlayer.areaChoices[areaId] + 1,
      },
      missCount: roll.isMiss ? currentPlayer.missCount + 1 : currentPlayer.missCount,
      stoneCount: roll.isStone ? currentPlayer.stoneCount + 1 : currentPlayer.stoneCount,
      highestOre: isHigherOre ? roll.ore : currentPlayer.highestOre,
    };

    const newPlayers = players.map((p, idx) =>
      idx === currentPlayerIndex ? updatedPlayer : p
    );

    // Calculate updated rank
    const sorted = [...newPlayers].sort((a, b) => b.totalValue - a.totalValue);
    const rank = sorted.findIndex((p) => p.id === updatedPlayer.id) + 1;

    // Record turn in history
    const historyItem: TurnHistoryItem = {
      turnIndex: turnHistory.length + 1,
      playerId: updatedPlayer.id,
      playerName: updatedPlayer.name,
      playerColor: updatedPlayer.color,
      attemptNumber: updatedPlayer.completedAttempts,
      totalAttempts: updatedPlayer.totalAttempts,
      areaId: area.id,
      areaName: area.name,
      ore: roll.ore,
      isMiss: roll.isMiss,
      isStone: roll.isStone,
      value: roll.ore.value,
      flavorMessage: roll.flavorMessage,
      playerTotalAfter: newTotal,
      timestamp: Date.now(),
    };

    setPlayers(newPlayers);
    setTurnHistory((prev) => [...prev, historyItem]);

    // Play appropriate sound effect based on outcome
    if (roll.ore.id === 'legendary') {
      sound.playLegendary();
    } else if (roll.ore.id === 'rare') {
      sound.playRare();
    } else if (roll.ore.id === 'gem') {
      sound.playGem();
    } else if (roll.ore.id === 'silver' || roll.ore.id === 'gold') {
      sound.playSilverGold();
    } else if (roll.isStone) {
      sound.playStone();
    } else if (roll.isMiss) {
      sound.playMiss();
    } else {
      sound.playCommon();
    }

    setActiveMiningResult({
      player: updatedPlayer,
      area,
      ore: roll.ore,
      isMiss: roll.isMiss,
      isStone: roll.isStone,
      flavorMessage: roll.flavorMessage,
      previousTotal,
      newTotal,
      rank,
    });

    setPhase('miningResult');
  };

  // Next Turn Button Action
  const handleAdvanceNextTurn = () => {
    sound.playClick();
    setActiveMiningResult(null);
    setIsProcessingMining(false);

    // Check if all players have completed all attempts
    const isGameFinished = players.every((p) => p.attemptsLeft === 0);

    if (isGameFinished) {
      setPhase('gameOver');
    } else {
      // Advance to next player
      const nextIndex = (currentPlayerIndex + 1) % players.length;
      setCurrentPlayerIndex(nextIndex);
      setPhase('areaSelection');
    }
  };

  // AI Log Copy Functionality
  const handleCopyAILog = async () => {
    if (players.length === 0) return;
    const currentPlayer = players[currentPlayerIndex];
    const logText = generateAILog(currentPlayer, players, turnHistory);

    const result = await copyToClipboard(logText);
    if (result.success) {
      sound.playCopySuccess();
      setCopySuccessToast(true);
      setTimeout(() => {
        setCopySuccessToast(false);
      }, 2500);
    } else if (result.fallbackText) {
      setFallbackCopyText(result.fallbackText);
    }
  };

  const currentPlayer = players[currentPlayerIndex] || null;
  const currentRound = currentPlayer ? currentPlayer.completedAttempts + 1 : 1;
  const totalRounds = currentPlayer ? currentPlayer.totalAttempts : 10;

  return (
    <div className="min-h-screen bg-[#2C1E14] text-[#E6D5B8] flex flex-col justify-between selection:bg-[#D4AF37] selection:text-[#1B120B]">
      {/* Background Radial Glow & Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[radial-gradient(circle_at_center,_#3D2B1F_0%,_#2C1E14_100%)]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#A64D79]/10 rounded-full blur-3xl" />
      </div>

      {/* Main App Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-3 sm:px-4 py-4 md:py-6 flex-1 flex flex-col">
        {/* Navigation Bar */}
        <header className="flex items-center justify-between pb-3 mb-4 bg-[#1B120B] px-4 py-3 rounded-2xl border border-[#4A3728] shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] text-[#1B120B] font-bold">
              <Pickaxe className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-black tracking-tight text-[#D4AF37] flex items-center gap-2">
                <span>みんなで採掘！</span>
                <span className="text-[10px] font-bold text-[#8B735B] bg-[#2C1E14] px-2 py-0.5 rounded-full border border-[#4A3728] hidden sm:inline">
                  v1.0 Local Multiplayer
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {phase !== 'setup' && (
              <button
                onClick={() => setHistoryOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#231810] border border-[#4A3728] hover:border-[#D4AF37] text-xs text-[#E6D5B8] transition-colors"
                title="採掘履歴ログ"
              >
                <History className="w-3.5 h-3.5 text-[#8B735B]" />
                <span className="hidden sm:inline">履歴</span>
                <span className="font-mono text-[10px] text-[#8B735B] bg-[#1B120B] px-1.5 py-0.5 rounded">
                  {turnHistory.length}
                </span>
              </button>
            )}

            <button
              onClick={() => setRulesOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#231810] border border-[#4A3728] hover:border-[#D4AF37] text-xs text-[#E6D5B8] transition-colors"
              title="ルール・確率説明"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">ルール</span>
            </button>

            <button
              onClick={() => setBalanceSimOpen(true)}
              className="p-2 rounded-xl bg-[#231810] border border-[#4A3728] hover:border-[#D4AF37] text-xs text-[#8B735B] hover:text-[#E6D5B8] transition-colors"
              title="確率シミュレータ"
            >
              <BarChart3 className="w-4 h-4 text-[#8B735B]" />
            </button>

            <button
              onClick={handleToggleSound}
              className="p-2 rounded-xl bg-[#231810] border border-[#4A3728] hover:border-[#D4AF37] text-[#E6D5B8] hover:text-[#D4AF37] transition-colors"
              title={isMuted ? 'サウンドON' : 'サウンドOFF'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-[#8B735B]" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#D4AF37]" />
              )}
            </button>
          </div>
        </header>

        {/* Dynamic Main Views */}
        {phase === 'setup' && (
          <SetupScreen
            onStartGame={handleStartGame}
            onOpenRules={() => setRulesOpen(true)}
            onOpenBalanceSim={() => setBalanceSimOpen(true)}
          />
        )}

        {phase === 'gameOver' && (
          <GameOverScreen
            players={players}
            onPlayAgainSamePlayers={handlePlayAgainSamePlayers}
            onNewGameSetup={handleNewGameSetup}
            onOpenHistory={() => setHistoryOpen(true)}
          />
        )}

        {(phase === 'areaSelection' || phase === 'miningResult') && currentPlayer && (
          <main className="flex-1 flex flex-col space-y-4">
            {/* Top Scoreboard */}
            <ScoreBoard
              players={players}
              currentPlayerId={currentPlayer.id}
              roundNumber={currentRound}
              totalRounds={totalRounds}
            />

            {/* Turn Prompt Banner Zone */}
            <div className="bg-[#231810] border border-[#4A3728] rounded-2xl p-5 md:p-6 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div
                  className={`w-14 h-14 rounded-2xl ${currentPlayer.color} flex items-center justify-center text-[#1B120B] font-black shadow-lg ring-2 ring-[#D4AF37] shrink-0`}
                >
                  <Pickaxe className="w-7 h-7 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full border border-[#D4AF37] text-[#D4AF37] text-[10px] font-bold tracking-wider uppercase">
                      現在のプレイヤー
                    </span>
                    <span className="text-[11px] font-mono bg-[#1B120B] text-[#8B735B] px-2.5 py-0.5 rounded-full border border-[#4A3728]">
                      採掘 {currentPlayer.completedAttempts + 1} / {currentPlayer.totalAttempts} 回目
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-[#E6D5B8] flex items-center gap-2">
                    <span>{currentPlayer.name}</span>
                    <span className="text-base md:text-lg font-normal text-[#8B735B]">の番です</span>
                  </h2>
                  <p className="text-xs text-[#8B735B] italic mt-0.5">「どこを掘りますか？」</p>
                </div>
              </div>

              {/* External AI Participation One-Click Copy Button */}
              <div className="w-full md:w-auto flex items-center justify-end">
                <button
                  id="copy-ai-log-button"
                  onClick={handleCopyAILog}
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#4A3728] hover:bg-[#5D4634] active:bg-[#3D2B1F] text-[#E6D5B8] border border-[#4A3728] hover:border-[#D4AF37] shadow-md font-bold text-xs md:text-sm transition-all cursor-pointer"
                  title="ChatGPTやClaudeに状況を渡して選択してもらうためのログをコピー"
                >
                  <Copy className="w-4 h-4 text-[#D4AF37]" />
                  <span>AI用ログをコピー</span>
                </button>
              </div>
            </div>

            {/* Three Mining Areas Selection Grid */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 items-stretch">
              <AreaCard
                area={AREA_DEFINITIONS.front}
                disabled={isProcessingMining || phase === 'miningResult'}
                onSelect={handleSelectArea}
              />
              <AreaCard
                area={AREA_DEFINITIONS.middle}
                disabled={isProcessingMining || phase === 'miningResult'}
                onSelect={handleSelectArea}
              />
              <AreaCard
                area={AREA_DEFINITIONS.deep}
                disabled={isProcessingMining || phase === 'miningResult'}
                onSelect={handleSelectArea}
              />
            </div>
          </main>
        )}
      </div>

      {/* Result Modal */}
      {phase === 'miningResult' && activeMiningResult && (
        <MiningResultModal
          player={activeMiningResult.player}
          area={activeMiningResult.area}
          ore={activeMiningResult.ore}
          isMiss={activeMiningResult.isMiss}
          isStone={activeMiningResult.isStone}
          flavorMessage={activeMiningResult.flavorMessage}
          previousTotal={activeMiningResult.previousTotal}
          newTotal={activeMiningResult.newTotal}
          rank={activeMiningResult.rank}
          onNextTurn={handleAdvanceNextTurn}
        />
      )}

      {/* Rules & Probability Modal */}
      <RulesModal isOpen={rulesOpen} onClose={() => setRulesOpen(false)} />

      {/* Turn History Modal */}
      <GameHistoryModal
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={turnHistory}
      />

      {/* Statistical Balance Tester Modal */}
      <DevBalanceModal
        isOpen={balanceSimOpen}
        onClose={() => setBalanceSimOpen(false)}
      />

      {/* Toast: Copied successfully */}
      {copySuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#8BA870] text-[#1B120B] font-black text-sm px-4 py-2.5 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>AI用ログをコピーしました！</span>
        </div>
      )}

      {/* Fallback Copy Dialog (if navigator.clipboard was denied) */}
      {fallbackCopyText && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#231810] border border-[#4A3728] rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-[#E6D5B8]">
              AI用ログ（手動でコピーしてください）
            </h3>
            <textarea
              readOnly
              value={fallbackCopyText}
              className="w-full h-48 p-2.5 bg-[#1B120B] border border-[#4A3728] rounded-xl text-xs font-mono text-[#E6D5B8] resize-none focus:outline-none"
            />
            <button
              onClick={() => setFallbackCopyText(null)}
              className="w-full py-2 bg-[#4A3728] hover:bg-[#5D4634] text-[#E6D5B8] text-xs font-bold rounded-xl"
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-3 text-[11px] text-[#8B735B] bg-[#1B120B] border-t border-[#4A3728] mt-4">
        <span>© 2024 MINNA DE SAIKUTSU! | 「みんなで採掘！」2〜4人用ローカル対戦採掘パーティゲーム</span>
      </footer>
    </div>
  );
}

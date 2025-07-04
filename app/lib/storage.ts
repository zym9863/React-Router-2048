// 本地存储管理
const STORAGE_KEYS = {
  BEST_SCORE: 'game2048-best-score',
  GAME_STATE: 'game2048-game-state'
} as const;

export function getBestScore(): number {
  if (typeof window === 'undefined') return 0;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.BEST_SCORE);
    return stored ? parseInt(stored, 10) : 0;
  } catch (error) {
    console.warn('无法读取最佳分数:', error);
    return 0;
  }
}

export function setBestScore(score: number): void {
  if (typeof window === 'undefined') return;
  
  try {
    const currentBest = getBestScore();
    if (score > currentBest) {
      localStorage.setItem(STORAGE_KEYS.BEST_SCORE, score.toString());
    }
  } catch (error) {
    console.warn('无法保存最佳分数:', error);
  }
}

export function saveGameState(gameState: any): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(gameState));
  } catch (error) {
    console.warn('无法保存游戏状态:', error);
  }
}

export function loadGameState(): any | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('无法读取游戏状态:', error);
    return null;
  }
}

export function clearGameState(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEYS.GAME_STATE);
  } catch (error) {
    console.warn('无法清除游戏状态:', error);
  }
}

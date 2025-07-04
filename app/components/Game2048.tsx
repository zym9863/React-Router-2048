import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import { initializeGame, makeMove, type GameState, type Direction } from '../lib/game2048';
import { getBestScore, setBestScore, saveGameState, loadGameState, clearGameState } from '../lib/storage';
import Navigation from './Navigation';

interface TileProps {
  value: number;
  position: { row: number; col: number };
}

function Tile({ value, position }: TileProps) {
  if (value === 0) return null;
  
  const getTileColor = (value: number) => {
    const colors: { [key: number]: string } = {
      2: 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 shadow-md',
      4: 'bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 shadow-md',
      8: 'bg-gradient-to-br from-orange-300 to-orange-400 text-white shadow-lg',
      16: 'bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-lg',
      32: 'bg-gradient-to-br from-red-400 to-red-500 text-white shadow-lg',
      64: 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-xl',
      128: 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white shadow-xl',
      256: 'bg-gradient-to-br from-yellow-500 to-amber-500 text-white shadow-xl',
      512: 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-2xl',
      1024: 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-2xl',
      2048: 'bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-2xl animate-pulse',
    };
    return colors[value] || 'bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-2xl animate-bounce';
  };
  
  const getFontSize = (value: number) => {
    if (value < 100) return 'text-2xl';
    if (value < 1000) return 'text-xl';
    return 'text-lg';
  };
  
  return (
    <div
      className={`
        absolute w-16 h-16 rounded-xl flex items-center justify-center
        font-bold transition-all duration-300 ease-out transform
        ${getTileColor(value)} ${getFontSize(value)}
        hover:scale-105 border border-white/20
      `}
      style={{
        top: `${position.row * 72 + 8}px`,
        left: `${position.col * 72 + 8}px`,
      }}
    >
      {value}
    </div>
  );
}

interface BoardProps {
  board: number[][];
}

function Board({ board }: BoardProps) {
  return (
    <div className="relative bg-gradient-to-br from-slate-600 via-slate-500 to-slate-600 rounded-2xl p-3 w-80 h-80 mx-auto shadow-2xl border border-slate-400/30">
      {/* 背景格子 */}
      {Array(4).fill(null).map((_, row) =>
        Array(4).fill(null).map((_, col) => (
          <div
            key={`${row}-${col}`}
            className="absolute w-16 h-16 bg-slate-400/30 rounded-lg backdrop-blur-sm border border-slate-300/20"
            style={{
              top: `${row * 72 + 8}px`,
              left: `${col * 72 + 8}px`,
            }}
          />
        ))
      )}
      
      {/* 数字瓷砖 */}
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <Tile
            key={`${rowIndex}-${colIndex}-${value}`}
            value={value}
            position={{ row: rowIndex, col: colIndex }}
          />
        ))
      )}
    </div>
  );
}

interface GameOverModalProps {
  isVisible: boolean;
  hasWon: boolean;
  score: number;
  onRestart: () => void;
  onContinue?: () => void;
}

function GameOverModal({ isVisible, hasWon, score, onRestart, onContinue }: GameOverModalProps) {
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 text-center max-w-sm mx-4 shadow-2xl border border-white/20 animate-in zoom-in duration-300">
        <div className={`text-6xl mb-4 ${hasWon ? '🎉' : '😔'}`}>
          {hasWon ? '🎉' : '😔'}
        </div>
        <h2 className={`text-3xl font-bold mb-4 ${hasWon ? 'text-emerald-600' : 'text-red-500'}`}>
          {hasWon ? '恭喜！你赢了！' : '游戏结束'}
        </h2>
        <p className="text-xl mb-6 text-slate-700">最终得分: <span className="font-bold text-blue-600">{score}</span></p>
        <div className="space-y-3">
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            重新开始
          </button>
          {hasWon && onContinue && (
            <button
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              继续游戏
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Game2048() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = loadGameState();
    return saved && saved.board ? saved : initializeGame();
  });
  const [showModal, setShowModal] = useState(false);
  const [bestScore, setBestScoreState] = useState(0);
  
  // 初始化最佳分数
  useEffect(() => {
    setBestScoreState(getBestScore());
  }, []);
  
  const handleMove = useCallback((direction: Direction) => {
    setGameState(prevState => {
      const newState = makeMove(prevState, direction);
      
      // 保存游戏状态
      saveGameState(newState);
      
      // 更新最佳分数
      if (newState.score > bestScore) {
        setBestScore(newState.score);
        setBestScoreState(newState.score);
      }
      
      return newState;
    });
  }, [bestScore]);
  
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
      handleMove(event.key as Direction);
    }
  }, [handleMove]);
  
  const handleRestart = () => {
    const newGame = initializeGame();
    setGameState(newGame);
    setShowModal(false);
    clearGameState();
  };
  
  const handleContinue = () => {
    setShowModal(false);
  };
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
  
  useEffect(() => {
    if (gameState.gameOver || (gameState.hasWon && !showModal)) {
      setShowModal(true);
    }
  }, [gameState.gameOver, gameState.hasWon, showModal]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <Navigation />
      <div className="py-8">
        <div className="max-w-md mx-auto">
          {/* 标题和得分 */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 drop-shadow-sm">2048</h1>
            <div className="flex justify-between items-center mb-6 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/50 flex-1">
                <div className="text-sm text-slate-600 font-medium">得分</div>
                <div className="text-2xl font-bold text-slate-800">{gameState.score}</div>
              </div>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl px-6 py-3 shadow-lg flex-1">
                <div className="text-sm text-white/90 font-medium">最佳</div>
                <div className="text-2xl font-bold text-white">{bestScore}</div>
              </div>
            </div>
            <button
              onClick={handleRestart}
              className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🔄 重新开始
            </button>
          </div>
          
          {/* 游戏说明 */}
          <div className="text-center mb-8 bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
            <p className="text-sm text-slate-700 leading-relaxed">
              使用方向键移动瓷砖。当两个相同数字的瓷砖碰撞时，它们会合并为一个！
            </p>
            <p className="mt-2 text-sm font-semibold">
              目标：达到 <span className="bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent font-bold">2048</span> 瓷砖！
            </p>
          </div>
          
          {/* 游戏板 */}
          <Board board={gameState.board} />
          
          {/* 移动端控制按钮 */}
          <div className="mt-8 md:hidden">
            <div className="grid grid-cols-3 gap-3 max-w-48 mx-auto">
              <div></div>
              <button
                onClick={() => handleMove('ArrowUp')}
                className="bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold py-4 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-xl"
              >
                ↑
              </button>
              <div></div>
              <button
                onClick={() => handleMove('ArrowLeft')}
                className="bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold py-4 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-xl"
              >
                ←
              </button>
              <div></div>
              <button
                onClick={() => handleMove('ArrowRight')}
                className="bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold py-4 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-xl"
              >
                →
              </button>
              <div></div>
              <button
                onClick={() => handleMove('ArrowDown')}
                className="bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold py-4 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-xl"
              >
                ↓
              </button>
              <div></div>
            </div>
          </div>
          
          {/* 键盘说明 */}
          <div className="text-center mt-6 bg-white/50 backdrop-blur-sm rounded-xl p-3 shadow-md">
            <p className="text-xs text-slate-600">
              💡 使用方向键或上方按钮来移动瓷砖
            </p>
          </div>
        </div>
      </div>
      
      <GameOverModal
        isVisible={showModal}
        hasWon={gameState.hasWon}
        score={gameState.score}
        onRestart={handleRestart}
        onContinue={gameState.hasWon ? handleContinue : undefined}
      />
    </div>
  );
}

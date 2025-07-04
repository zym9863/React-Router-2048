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
      2: 'bg-gray-100 text-gray-800',
      4: 'bg-gray-200 text-gray-800',
      8: 'bg-orange-200 text-white',
      16: 'bg-orange-300 text-white',
      32: 'bg-orange-400 text-white',
      64: 'bg-orange-500 text-white',
      128: 'bg-yellow-300 text-white',
      256: 'bg-yellow-400 text-white',
      512: 'bg-yellow-500 text-white',
      1024: 'bg-yellow-600 text-white',
      2048: 'bg-yellow-700 text-white',
    };
    return colors[value] || 'bg-red-500 text-white';
  };
  
  const getFontSize = (value: number) => {
    if (value < 100) return 'text-2xl';
    if (value < 1000) return 'text-xl';
    return 'text-lg';
  };
  
  return (
    <div
      className={`
        absolute w-16 h-16 rounded-lg flex items-center justify-center
        font-bold transition-all duration-200 ease-in-out
        ${getTileColor(value)} ${getFontSize(value)}
        shadow-md
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
    <div className="relative bg-gray-300 rounded-lg p-2 w-80 h-80 mx-auto">
      {/* 背景格子 */}
      {Array(4).fill(null).map((_, row) =>
        Array(4).fill(null).map((_, col) => (
          <div
            key={`${row}-${col}`}
            className="absolute w-16 h-16 bg-gray-200 rounded-md"
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 text-center max-w-sm mx-4">
        <h2 className={`text-3xl font-bold mb-4 ${hasWon ? 'text-green-600' : 'text-red-600'}`}>
          {hasWon ? '恭喜！你赢了！' : '游戏结束'}
        </h2>
        <p className="text-xl mb-6">最终得分: {score}</p>
        <div className="space-y-3">
          <button
            onClick={onRestart}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            重新开始
          </button>
          {hasWon && onContinue && (
            <button
              onClick={onContinue}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
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
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="py-8">
        <div className="max-w-md mx-auto">
          {/* 标题和得分 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">2048</h1>
            <div className="flex justify-between items-center mb-4">
              <div className="bg-gray-200 rounded-lg px-4 py-2">
                <div className="text-sm text-gray-600">得分</div>
                <div className="text-xl font-bold">{gameState.score}</div>
              </div>
              <div className="bg-yellow-200 rounded-lg px-4 py-2">
                <div className="text-sm text-gray-600">最佳</div>
                <div className="text-xl font-bold">{bestScore}</div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={handleRestart}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm"
                >
                  重新开始
                </button>
              </div>
            </div>
          </div>
          
          {/* 游戏说明 */}
          <div className="text-center mb-6 text-sm text-gray-600">
            <p>使用方向键移动瓷砖。当两个相同数字的瓷砖碰撞时，它们会合并为一个！</p>
            <p className="mt-1">目标：达到 <strong>2048</strong> 瓷砖！</p>
          </div>
          
          {/* 游戏板 */}
          <Board board={gameState.board} />
          
          {/* 移动端控制按钮 */}
          <div className="mt-8 md:hidden">
            <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto">
              <div></div>
              <button
                onClick={() => handleMove('ArrowUp')}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                ↑
              </button>
              <div></div>
              <button
                onClick={() => handleMove('ArrowLeft')}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                ←
              </button>
              <div></div>
              <button
                onClick={() => handleMove('ArrowRight')}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                →
              </button>
              <div></div>
              <button
                onClick={() => handleMove('ArrowDown')}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                ↓
              </button>
              <div></div>
            </div>
          </div>
          
          {/* 键盘说明 */}
          <div className="text-center mt-6 text-xs text-gray-500">
            <p>使用方向键或上方按钮来移动瓷砖</p>
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

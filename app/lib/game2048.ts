export type Board = number[][];
export type Direction = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

export interface GameState {
  board: Board;
  score: number;
  gameOver: boolean;
  hasWon: boolean;
}

// 初始化4x4空棋盘
export function initializeBoard(): Board {
  return Array(4).fill(null).map(() => Array(4).fill(0));
}

// 随机添加新数字(2或4)
export function addRandomTile(board: Board): Board {
  const emptyCells: [number, number][] = [];
  
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        emptyCells.push([i, j]);
      }
    }
  }
  
  if (emptyCells.length === 0) return board;
  
  const newBoard = board.map(row => [...row]);
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const [row, col] = emptyCells[randomIndex];
  
  // 90%概率生成2，10%概率生成4
  newBoard[row][col] = Math.random() < 0.9 ? 2 : 4;
  
  return newBoard;
}

// 初始化游戏状态
export function initializeGame(): GameState {
  let board = initializeBoard();
  board = addRandomTile(board);
  board = addRandomTile(board);
  
  return {
    board,
    score: 0,
    gameOver: false,
    hasWon: false
  };
}

// 向左移动并合并行
function moveRowLeft(row: number[]): { row: number[], score: number } {
  // 移除0
  const filtered = row.filter(val => val !== 0);
  const moved: number[] = [];
  let score = 0;
  let i = 0;
  
  while (i < filtered.length) {
    if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
      // 合并相同数字
      const mergedValue = filtered[i] * 2;
      moved.push(mergedValue);
      score += mergedValue;
      i += 2;
    } else {
      moved.push(filtered[i]);
      i += 1;
    }
  }
  
  // 用0填充到长度4
  while (moved.length < 4) {
    moved.push(0);
  }
  
  return { row: moved, score };
}

// 向右移动行
function moveRowRight(row: number[]): { row: number[], score: number } {
  const reversed = [...row].reverse();
  const { row: movedReversed, score } = moveRowLeft(reversed);
  return { row: movedReversed.reverse(), score };
}

// 转置矩阵
function transpose(board: Board): Board {
  return board[0].map((_, colIndex) => board.map(row => row[colIndex]));
}

// 检查两个棋盘是否相同
function boardsEqual(board1: Board, board2: Board): boolean {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board1[i][j] !== board2[i][j]) {
        return false;
      }
    }
  }
  return true;
}

// 检查是否有可能的移动
function canMove(board: Board): boolean {
  // 检查是否有空格
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) return true;
    }
  }
  
  // 检查是否可以合并
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const current = board[i][j];
      // 检查右边
      if (j < 3 && board[i][j + 1] === current) return true;
      // 检查下面
      if (i < 3 && board[i + 1][j] === current) return true;
    }
  }
  
  return false;
}

// 检查是否获胜(达到2048)
function hasWon(board: Board): boolean {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 2048) return true;
    }
  }
  return false;
}

// 移动棋盘
export function moveBoard(board: Board, direction: Direction): { board: Board, score: number, moved: boolean } {
  let newBoard: Board;
  let totalScore = 0;
  
  switch (direction) {
    case 'ArrowLeft':
      newBoard = board.map(row => {
        const { row: movedRow, score } = moveRowLeft(row);
        totalScore += score;
        return movedRow;
      });
      break;
      
    case 'ArrowRight':
      newBoard = board.map(row => {
        const { row: movedRow, score } = moveRowRight(row);
        totalScore += score;
        return movedRow;
      });
      break;
      
    case 'ArrowUp':
      const transposed = transpose(board);
      const movedTransposed = transposed.map(row => {
        const { row: movedRow, score } = moveRowLeft(row);
        totalScore += score;
        return movedRow;
      });
      newBoard = transpose(movedTransposed);
      break;
      
    case 'ArrowDown':
      const transposedDown = transpose(board);
      const movedTransposedDown = transposedDown.map(row => {
        const { row: movedRow, score } = moveRowRight(row);
        totalScore += score;
        return movedRow;
      });
      newBoard = transpose(movedTransposedDown);
      break;
      
    default:
      return { board, score: 0, moved: false };
  }
  
  const moved = !boardsEqual(board, newBoard);
  
  return { board: newBoard, score: totalScore, moved };
}

// 执行游戏移动
export function makeMove(gameState: GameState, direction: Direction): GameState {
  if (gameState.gameOver) return gameState;
  
  const { board: newBoard, score: moveScore, moved } = moveBoard(gameState.board, direction);
  
  if (!moved) return gameState;
  
  const boardWithNewTile = addRandomTile(newBoard);
  const newScore = gameState.score + moveScore;
  const won = hasWon(boardWithNewTile);
  const gameOver = !canMove(boardWithNewTile);
  
  return {
    board: boardWithNewTile,
    score: newScore,
    gameOver,
    hasWon: won || gameState.hasWon
  };
}

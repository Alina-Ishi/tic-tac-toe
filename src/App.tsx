import React, { useState } from 'react';
import Square from './components/Square';
import { Board, WinnerInfo, Player } from './types/game';

const App: React.FC = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [winnerInfo, setWinnerInfo] = useState<WinnerInfo | null>(null);

  const WINNING_LINES: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const calculateWinner = (newBoard: Board): WinnerInfo | null => {
    for (const line of WINNING_LINES) {
      const [a, b, c] = line;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return { winner: newBoard[a] as Player, line };
      }
    }
    return null;
  };

  const isDraw = (board: Board): boolean => {
    return board.every(cell => cell !== null) && !winnerInfo;
  };

  const handleClick = (index: number): void => {
    if (winnerInfo || board[index]) return;

    const newBoard: Board = [...board];
    const currentPlayer: Player = xIsNext ? 'X' : 'O';
    newBoard[index] = currentPlayer;
    
    const winner = calculateWinner(newBoard);
    
    if (winner) {
      setWinnerInfo(winner);
    } else {
      setXIsNext(!xIsNext);
    }
    
    setBoard(newBoard);
  };

  const resetGame = (): void => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinnerInfo(null);
  };

  const getGameStatus = (): string => {
    if (winnerInfo) {
      return `Победитель: ${winnerInfo.winner}! 🎉`;
    }
    if (isDraw(board)) {
      return 'Ничья! 🤝';
    }
    return `Следующий ход: ${xIsNext ? 'X' : 'O'}`;
  };

  const renderSquare = (index: number): React.ReactElement => {
    const isWinning: boolean = winnerInfo?.line.includes(index) || false;
    return (
      <Square 
        value={board[index]} 
        onSquareClick={() => handleClick(index)}
        isWinning={isWinning}
      />
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-800 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="backdrop-blur-sm bg-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl">
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xl">
          {/* Статус игры */}
          <div className={`
            mb-6 text-center text-xl sm:text-2xl font-bold py-3 px-4 rounded-lg
            ${winnerInfo 
              ? 'bg-green-100 text-green-700' 
              : isDraw(board) 
                ? 'bg-yellow-100 text-yellow-700' 
                : 'bg-blue-100 text-blue-700'
            }
          `}>
            {getGameStatus()}
          </div>

          {/* Игровое поле */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="flex gap-1">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="flex gap-1">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>

          {/* Кнопка сброса */}
          <button
            className="mt-8 w-full py-3 px-6 bg-linear-to-r from-indigo-600 to-purple-600 
                       text-white font-bold text-lg rounded-lg
                       hover:from-indigo-700 hover:to-purple-700 
                       transform hover:scale-105 transition-all duration-200
                       shadow-lg hover:shadow-xl
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            onClick={resetGame}
          >
            🔄 Начать заново
          </button>

          {/* Информация об игроках */}
          <div className="mt-6 flex justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-blue-600 font-bold text-xl">X</span>
              <span>- Игрок 1</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-600 font-bold text-xl">O</span>
              <span>- Игрок 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
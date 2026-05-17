import React, { useState } from 'react';
import Square from './components/Square';
import { Board, WinnerInfo, Player, Move } from './types/game';

const App: React.FC = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [winnerInfo, setWinnerInfo] = useState<WinnerInfo | null>(null);
  const [moves, setMoves] = useState<Move[]>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(-1);

  const WINNING_LINES: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const getPositionName = (index: number): string => {
    const positions = [
      'верхний левый', 'верхний средний', 'верхний правый',
      'средний левый', 'центр', 'средний правый',
      'нижний левый', 'нижний средний', 'нижний правый'
    ];
    return positions[index];
  };

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
    
    // Добавляем ход в историю
    const newMove: Move = {
      index: moves.length,
      player: currentPlayer,
      position: getPositionName(index)
    };
    
    if (winner) {
      setWinnerInfo(winner);
      setMoves([...moves, newMove]);
      setCurrentMoveIndex(moves.length);
    } else {
      setMoves([...moves, newMove]);
      setCurrentMoveIndex(moves.length);
      setXIsNext(!xIsNext);
    }
    
    setBoard(newBoard);
  };

  const goToMove = (moveIndex: number): void => {
    if (moveIndex === -1) {
      // Вернуться к началу
      setBoard(Array(9).fill(null));
      setXIsNext(true);
      setWinnerInfo(null);
      setCurrentMoveIndex(-1);
      return;
    }

    // Восстанавливаем доску до указанного хода
    const newBoard: Board = Array(9).fill(null);
    for (let i = 0; i <= moveIndex; i++) {
      const move = moves[i];
      newBoard[move.index] = move.player;
    }
    
    setBoard(newBoard);
    setXIsNext(moves[moveIndex].player === 'X');
    setWinnerInfo(calculateWinner(newBoard));
    setCurrentMoveIndex(moveIndex);
  };

  const resetGame = (): void => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinnerInfo(null);
    setMoves([]);
    setCurrentMoveIndex(-1);
  };

  const getGameStatus = (): string => {
    if (winnerInfo) {
      const winnerName = winnerInfo.winner === 'X' ? 'Крестики' : 'Нолики';
      return `${winnerName} победили! 🎉`;
    }
    if (isDraw(board)) {
      return 'Ничья! 🤝';
    }
    return `${xIsNext ? 'Крестики (X)' : 'Нолики (O)'} ходят`;
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Заголовок */}
      <div className="text-center py-8">
        <h1 className="text-5xl sm:text-7xl font-bold text-white mb-2 tracking-wider">
          ✨ Крестики-Нолики ✨
        </h1>
        <p className="text-indigo-200 text-lg">Классическая игра с историей ходов</p>
      </div>

      {/* Основной контент */}
      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
          
          {/* Левая часть - игровое поле */}
          <div className="flex-1 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl">
              {/* Статус игры */}
              <div className={`
                mb-6 text-center text-xl sm:text-2xl font-bold py-3 px-6 rounded-xl
                ${winnerInfo 
                  ? 'bg-green-500 text-white' 
                  : isDraw(board) 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-indigo-500 text-white'
                }
              `}>
                {getGameStatus()}
              </div>

              {/* Игровое поле */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-2">
                  {renderSquare(0)}
                  {renderSquare(1)}
                  {renderSquare(2)}
                </div>
                <div className="flex gap-2">
                  {renderSquare(3)}
                  {renderSquare(4)}
                  {renderSquare(5)}
                </div>
                <div className="flex gap-2">
                  {renderSquare(6)}
                  {renderSquare(7)}
                  {renderSquare(8)}
                </div>
              </div>

              {/* Кнопка новой игры */}
              <button
                className="mt-8 w-full py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 
                           text-white font-bold text-lg rounded-xl
                           hover:from-green-600 hover:to-emerald-700 
                           transform hover:scale-105 transition-all duration-200
                           shadow-lg hover:shadow-xl"
                onClick={resetGame}
              >
                🎮 Новая игра
              </button>
            </div>
          </div>

          {/* Правая часть - история ходов */}
          <div className="lg:w-96 w-full">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                📜 История ходов
                <span className="text-sm bg-indigo-600 px-2 py-1 rounded-full">
                  {moves.length} ходов
                </span>
              </h2>
              
              {moves.length === 0 ? (
                <div className="text-center py-8 text-indigo-200">
                  <p>🤔 Пока нет ходов</p>
                  <p className="text-sm mt-2">Нажмите на клетку, чтобы начать игру</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                  {moves.map((move, idx) => (
                    <div
                      key={idx}
                      className={`
                        p-3 rounded-lg cursor-pointer transition-all duration-200
                        flex items-center justify-between
                        ${currentMoveIndex === idx 
                          ? 'bg-indigo-600 text-white shadow-lg' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                        }
                      `}
                      onClick={() => goToMove(idx)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg">#{idx + 1}</span>
                        <span className={move.player === 'X' ? 'text-red-300' : 'text-green-300'}>
                          {move.player === 'X' ? '❌ Крестики' : '⭕ Нолики'}
                        </span>
                      </div>
                      <span className="text-sm">
                        {move.position}
                      </span>
                    </div>
                  ))}
                  
                  {/* Кнопка сброса к началу */}
                  <button
                    className="w-full mt-4 py-2 px-4 bg-yellow-500 hover:bg-yellow-600 
                               text-white font-semibold rounded-lg transition-all duration-200
                               flex items-center justify-center gap-2"
                    onClick={() => goToMove(-1)}
                  >
                    🔄 Начать сначала
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
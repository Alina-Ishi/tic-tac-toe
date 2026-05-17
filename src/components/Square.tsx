import React from 'react';
import { CellValue } from '../types/game';

interface SquareProps {
  value: CellValue;
  onSquareClick: () => void;
  isWinning: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onSquareClick, isWinning }) => {
  const getColor = () => {
    if (value === 'X') return 'text-red-600';
    if (value === 'O') return 'text-green-600';
    return 'text-gray-800';
  };

  return (
    <button
      className={`
        w-24 h-24 sm:w-28 sm:h-28 
        border-4 border-indigo-300 
        text-5xl sm:text-6xl font-bold 
        flex items-center justify-center
        transition-all duration-200 
        hover:bg-indigo-50 hover:scale-105
        focus:outline-none focus:ring-4 focus:ring-indigo-400
        rounded-xl shadow-md
        ${getColor()}
        ${isWinning ? 'winning-cell animate-win-pulse' : 'bg-white'}
      `}
      onClick={onSquareClick}
      aria-label={`Клетка ${value || 'пустая'}`}
    >
      {value}
    </button>
  );
};

export default Square;
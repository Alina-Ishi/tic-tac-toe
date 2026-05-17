import React from 'react';
import { CellValue } from '../types/game';

interface SquareProps {
  value: CellValue;
  onSquareClick: () => void;
  isWinning: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onSquareClick, isWinning }) => {
  return (
    <button
      className={`
        w-20 h-20 sm:w-24 sm:h-24 
        border-2 border-gray-700 
        text-4xl sm:text-5xl font-bold 
        flex items-center justify-center
        transition-all duration-200 
        hover:bg-gray-100 hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-blue-400
        ${isWinning 
          ? 'bg-yellow-300 text-orange-700 border-orange-600 shadow-lg shadow-yellow-500/50' 
          : 'bg-gray-50 text-gray-800'
        }
        ${value === 'X' ? 'text-blue-600' : 'text-red-600'}
      `}
      onClick={onSquareClick}
      aria-label={`Клетка ${value || 'пустая'}`}
    >
      {value}
    </button>
  );
};

export default Square;
import React, { useState } from 'react';
import './App.css'; // Подключим стили ниже

// Компонент одной клетки
const Square = ({ value, onSquareClick, isWinning }) => {
  return (
    <button 
      className={`square ${isWinning ? 'winning' : ''}`} 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

// Основной компонент игры
const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState(null); // { winner, line }

  // Функция для определения победителя
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // строки
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // колонки
      [0, 4, 8], [2, 4, 6]             // диагонали
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  // Обработка клика по клетке
  const handleClick = (i) => {
    // Если уже есть победитель или клетка занята — игнорируем
    if (winnerInfo || squares[i]) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    
    const winner = calculateWinner(newSquares);
    if (winner) {
      setWinnerInfo(winner);
    } else {
      setXIsNext(!xIsNext);
    }
  };

  // Сброс игры
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinnerInfo(null);
  };

  // Определяем статус игры
  let status;
  if (winnerInfo) {
    status = `Победитель: ${winnerInfo.winner}! 🎉`;
  } else if (squares.every(sq => sq !== null)) {
    status = 'Ничья! 🤝';
  } else {
    status = `Следующий ход: ${xIsNext ? 'X' : 'O'}`;
  }

  // Рендер игрового поля с подсветкой выигрышной линии
  const renderSquare = (i) => {
    const isWinning = winnerInfo && winnerInfo.line.includes(i);
    return (
      <Square 
        value={squares[i]} 
        onSquareClick={() => handleClick(i)}
        isWinning={isWinning}
      />
    );
  };

  return (
    <div className="game">
      <div className="game-board">
        <div className="status">{status}</div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <button className="reset-btn" onClick={resetGame}>Начать заново</button>
      </div>
    </div>
  );
};

export default App;
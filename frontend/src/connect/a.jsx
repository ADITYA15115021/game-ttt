


import { useState } from 'react';

const ConnectFour = () => {
  const rows = 6;
  const cols = 7;
  const [board, setBoard] = useState(Array(rows).fill().map(() => Array(cols).fill(null)));
  const [isRedTurn, setIsRedTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const dropDisc = (col) => {
    if (winner) return;

    const boardCopy = board.map(row => [...row]);
    for (let row = rows - 1; row >= 0; row--) {
      if (!boardCopy[row][col]) {
        boardCopy[row][col] = isRedTurn ? 'Red' : 'Yellow';
        setBoard(boardCopy);
        checkWinner(boardCopy, row, col);
        setIsRedTurn(!isRedTurn);
        return;
      }
    }
  };

  const checkWinner = (board, row, col) => {
    const directions = [
      [[0, 1], [0, -1]], // Horizontal
      [[1, 0], [-1, 0]], // Vertical
      [[1, 1], [-1, -1]], // Diagonal (\)
      [[1, -1], [-1, 1]], // Diagonal (/)
    ];

    const currentPlayer = isRedTurn ? 'Red' : 'Yellow';

    for (let [dir1, dir2] of directions) {
      let count = 1;
      for (let [dx, dy] of [dir1, dir2]) {
        let r = row, c = col;
        while (true) {
          r += dx;
          c += dy;
          if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== currentPlayer) break;
          count++;
        }
      }
      if (count >= 4) {
        setWinner(currentPlayer);
        return;
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(rows).fill().map(() => Array(cols).fill(null)));
    setIsRedTurn(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Connect Four</h1>
      {winner && <h2 className="text-lg font-bold text-green-500 mb-4">{winner} wins!</h2>}

      <div className="grid grid-rows-6 grid-cols-7 gap-2 bg-blue-500 p-2 rounded-lg">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => dropDisc(colIndex)}
              className={`w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center 
              ${cell === 'Red' ? 'bg-red-500' : cell === 'Yellow' ? 'bg-yellow-500' : ''} cursor-pointer`}
            ></div>
          ))
        )}
      </div>

      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Restart Game
      </button>
    </div>
  );
};

export default ConnectFour;

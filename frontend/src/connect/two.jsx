

import { useState, useEffect } from 'react';

const ConnectFour = () => {
  const rows = 6;
  const cols = 7;
  
  const [board, setBoard] = useState(Array(rows).fill().map(() => Array(cols).fill(null)));
  const [player, setPlayer] = useState(null); // Will be 'Red' or 'Yellow'
  const [currentTurn, setCurrentTurn] = useState('Red');
  const [winner, setWinner] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket('wss://ak-backend1.xyz/connect4');
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'start') {
        setPlayer(data.player); // Assign player (Red or Yellow)
      } else if (data.type === 'move') {
        // Update board with opponent's move
        makeMove(data.col, data.player);
      }
    };

    return () => ws.close();
  }, []);

  const makeMove = (col, playerColor) => {
    setBoard(prevBoard => {
      const boardCopy = prevBoard.map(row => [...row]);
      // Find lowest empty row in the selected column
      for (let row = rows - 1; row >= 0; row--) {
        if (!boardCopy[row][col]) {
          boardCopy[row][col] = playerColor;
          checkWinner(boardCopy, row, col);
          return boardCopy;
        }
      }
      return boardCopy;
    });
    
    setCurrentTurn(current => current === 'Red' ? 'Yellow' : 'Red');
  };

  const handleColumnClick = (col) => {
    if (currentTurn !== player || winner) return;
    
    // Check if column is full
    if (board[0][col]) return;

    // Make move and send to server
    makeMove(col, player);
    socket.send(JSON.stringify({
      type: 'move',
      col: col,
      player: player
    }));
  };

  const checkWinner = (board, row, col) => {
    const directions = [
      [[0, 1], [0, -1]], // Horizontal
      [[1, 0], [-1, 0]], // Vertical
      [[1, 1], [-1, -1]], // Diagonal (\)
      [[1, -1], [-1, 1]], // Diagonal (/)
    ];

    const currentPlayer = board[row][col];

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

  const getGameStatus = () => {
    if (winner) {
      return winner === player ? 
        "Congratulations! You Won! 🎉" : 
        "Game Over - You Lost!";
    } else if (board[0].every(cell => cell !== null)) {
      return "Game Draw!";
    } else {
      return currentTurn === player ? 
        "Your turn" : 
        "Opponent's turn";
    }
  };

  const resetGame = () => {
    setBoard(Array(rows).fill().map(() => Array(cols).fill(null)));
    setCurrentTurn('Red');
    setWinner(null);
    // Notify server about reset
    socket.send(JSON.stringify({ type: 'reset' }));
  };

  if (!player) {
    return (
      <div className="h-screen bg-gray-900 flex flex-col justify-center items-center">
        <div className="text-white text-xl">
          Waiting for second player to join...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-white">Connect Four</h1>
      <div className="text-xl font-bold mb-4 text-white">
        {getGameStatus()}
      </div>

      <div className="grid grid-rows-6 grid-cols-7 gap-2 bg-blue-600 p-4 rounded-lg">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleColumnClick(colIndex)}
              className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer
                ${!cell ? 'bg-gray-200' : 
                  cell === 'Red' ? 'bg-red-500' : 'bg-yellow-500'} 
                ${currentTurn === player && !cell && !winner ? 'hover:bg-gray-300' : ''}`}
            />
          ))
        )}
      </div>

      {winner && (
        <button
          onClick={resetGame}
          className="mt-8 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default ConnectFour;
import { useState, useEffect } from 'react';

const OnlineGame = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(null);
  const [currentTurn, setCurrentTurn] = useState('X');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'start') {
        setPlayer(data.player); // Assign player (X or O)
      } else if (data.type === 'move') {
        // Update board with opponent's move
        const updatedBoard = [...board];
        updatedBoard[data.move] = data.player;
        setBoard(updatedBoard);
        setCurrentTurn(data.player === 'X' ? 'O' : 'X');
      }
    };

    setSocket(ws);

    return () => ws.close();
  }, [board]);

  const handleClick = (index) => {
    if (!board[index] && currentTurn === player) {
      const updatedBoard = [...board];
      updatedBoard[index] = player;
      setBoard(updatedBoard);
      setCurrentTurn(player === 'X' ? 'O' : 'X');

      // Send move to server
      socket.send(JSON.stringify({ type: 'move', move: index, player }));
    }
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '5px' }}>
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: '100px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ddd',
              fontSize: '24px',
              cursor: 'pointer',
            }}
          >
            {cell}
          </div>
        ))}
      </div>
      <h2>{player ? `You are: ${player}` : 'Waiting for an opponent...'}</h2>
    </div>
  );
};

export default OnlineGame;

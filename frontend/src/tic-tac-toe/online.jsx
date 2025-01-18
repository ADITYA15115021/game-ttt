import { useState, useEffect } from 'react';

const OnlineGame = () => {

  const [board, setBoard] = useState(Array(9).fill(null));
const [player, setPlayer] = useState(null);
const [currentTurn, setCurrentTurn] = useState('X');
const [socket, setSocket] = useState(null);
const [winner, setWinner] = useState(null);

useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket('wss://ak-backend1.xyz/tictactoe');
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'start') {
        setPlayer(data.player); // Assign player (X or O)
      }else if (data.type === 'move'){
        // Update board with opponent's move
        setBoard(prevBoard => {
          const updatedBoard = [...prevBoard];
          updatedBoard[data.move] = data.player_name;
          
          const gameWinner = checkWinner(updatedBoard);
          if (gameWinner) {
            setWinner(gameWinner);
          }
          
          return updatedBoard;
        });
        setCurrentTurn(prevTurn => prevTurn === 'X' ? 'O' : 'X');
      }
    };

    return () => ws.close();
}, []); // Empty dependency array

const handleClick = (index) => {
    if (!board[index] && currentTurn === player && !winner){

      const updatedBoard = [...board];
      updatedBoard[index] = player;

      const gameWinner = checkWinner(updatedBoard);
      if (gameWinner) {
        setWinner(gameWinner);
      }

      setBoard(updatedBoard);

      setCurrentTurn(currentTurn === 'X' ? 'O' : 'X');

      // Send move to server
      socket.send(JSON.stringify({ type: 'move', move: index, player_name: player }));
    }
};

const checkWinner = (squares) => {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6]
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const getGameStatus = () => {
  if (winner) {
    return winner === player ? 
      "Congratulations! You Won! 🎉" : 
      "Game Over - You Lost!";
  } else if (board.every(cell => cell !== null)) {
    return "Game Draw!";
  } else {
    return currentTurn === player ? 
      "Your turn" : 
      "Opponent's turn";
  }
};


  



  if( !player ){

    return (
    <>

      <div className='h-screen bg-black flex flex-col justify-center'>
        <div className='flex flex-row justify-center'>
          <div className='text-white text-xl'>
              waiting for second player to join .....
          </div>
           
        </div>
        
        
      </div>
         
     
      </>
    )
  }else{

    return (
      
      <>

      <div className='h-screen bg-black flex flex-col justify-center '>
        
        <div className='h-12 mb-16  text-white text-4xl flex justify-center items-center'>
          {getGameStatus()}
        </div>
        
        <div className=' flex flex-row justify-center'>
           <div className='grid grid-cols-3 grid-rows-3 gap-1 w-64 h-64'>
              
              {board.map((cell, index) => (
                <div className='bg-gray-200 flex items-center justify-center h-full border rounded-lg border-gray-400'
                  key={index}
                  onClick={() => handleClick(index)}
                  disabled={winner || cell !== null}
                >
                 {cell}
                 </div> ) ) }
           </div>

          

        </div>

        {winner && (
          <div className=' flex justify-center'>
             <button className='w-28 mt-8  rounded-full h-12 bg-green-900 text-white' >PLAY AGAIN</button>
          </div>  
           
           )}

    </div>
        
        
    </>
            
        

      
    );


  }

  
};

export default OnlineGame;






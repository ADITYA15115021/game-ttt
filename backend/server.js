// import WebSocket, { WebSocketServer } from 'ws';
// import http from 'http';

// const server = http.createServer(function(request,response) {
//     console.log((new Date()) + ' Received request for ' + request.url);
//     response.end("hi there");
// });

// const wss = new WebSocketServer({ server });

// let players = [];

// wss.on('connection', (socket) => {
//   // Add the new player
//   players.push(socket);

//   if (players.length === 2) {
//     // Notify both players that the game can start
//     players.forEach((player, index) => {
//       player.send(JSON.stringify({ type: 'start', player: index === 0 ? 'X' : 'O' }));
//     });
//   }

//   socket.on('message', (message) => {

//     const data = JSON.parse(message);

//     if (data.type === 'move') {
//       // Broadcast the move to the other player
//       console.log("player : ",data.player_name, " move :",data.move);
//       players.forEach((player) => {
//         if (player !== socket) {
//           player.send(JSON.stringify({ type: 'move', move: data.move, player_name: data.player_name }));
//         }
//       });
//     }
//   });

//   socket.on('close', () => {
//     // Remove disconnected player
//     players = players.filter((player) => player !== socket);
//   });
// });

// server.listen(8080, function() {
//     console.log(' Server is listening on port 8080');
// });



import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';
import url from 'url';

const server = http.createServer((request, response) => {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.end("Game server running");
});

const wss = new WebSocketServer({ server });

// Separate rooms for different games
const gameRooms = {
    tictactoe: {},
    connect4: {}
};

let roomCounter = 1;

function createRoom(gameType) {
    const roomId = `${gameType}-${roomCounter++}`;
    gameRooms[gameType][roomId] = {
        players: [],
        currentTurn: gameType === 'tictactoe' ? 'X' : 'Red'
    };
    return roomId;
}

function findAvailableRoom(gameType) {
    for (const roomId in gameRooms[gameType]) {
        if (gameRooms[gameType][roomId].players.length < 2) {
            return roomId;
        }
    }
    return createRoom(gameType);
}

function handleTicTacToe(ws, roomId) {
    const room = gameRooms.tictactoe[roomId];
    const playerSymbol = room.players.length === 0 ? 'X' : 'O';
    
    room.players.push({
        socket: ws,
        symbol: playerSymbol
    });

    if (room.players.length === 2) {
        // Start the game
        room.players.forEach((player, index) => {
            player.socket.send(JSON.stringify({
                type: 'start',
                player: player.symbol
            }));
        });
    }

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        
        if (data.type === 'move') {
            // Broadcast move to other player
            const otherPlayer = room.players.find(p => p.socket !== ws);
            if (otherPlayer) {
                otherPlayer.socket.send(JSON.stringify({
                    type: 'move',
                    move: data.move,
                    player_name: data.player_name
                }));
            }
        }
    });

    ws.on('close', () => {
        room.players = room.players.filter(player => player.socket !== ws);
        if (room.players.length === 0) {
            delete gameRooms.tictactoe[roomId];
        } else {
            // Notify remaining player
            room.players[0].socket.send(JSON.stringify({
                type: 'playerDisconnected'
            }));
        }
    });
}

function handleConnect4(ws, roomId) {
    const room = gameRooms.connect4[roomId];
    const playerColor = room.players.length === 0 ? 'Red' : 'Yellow';
    
    room.players.push({
        socket: ws,
        color: playerColor
    });

    if (room.players.length === 2) {
        // Start the game
        room.players.forEach((player) => {
            player.socket.send(JSON.stringify({
                type: 'start',
                player: player.color
            }));
        });
    }

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        
        if (data.type === 'move') {
            // Update current turn
            room.currentTurn = room.currentTurn === 'Red' ? 'Yellow' : 'Red';
            
            // Broadcast move to other player
            const otherPlayer = room.players.find(p => p.socket !== ws);
            if (otherPlayer) {
                otherPlayer.socket.send(JSON.stringify({
                    type: 'move',
                    col: data.col,
                    player: data.player
                }));
            }
        } else if (data.type === 'reset') {
            // Handle game reset
            room.currentTurn = 'Red';
            room.players.forEach(player => {
                if (player.socket !== ws) {
                    player.socket.send(JSON.stringify({ type: 'reset' }));
                }
            });
        }
    });

    ws.on('close', () => {
        room.players = room.players.filter(player => player.socket !== ws);
        if (room.players.length === 0) {
            delete gameRooms.connect4[roomId];
        } else {
            // Notify remaining player
            room.players[0].socket.send(JSON.stringify({
                type: 'playerDisconnected'
            }));
        }
    });
}

wss.on('connection', (ws, req) => {
    // Parse URL to determine game type
    const pathname = url.parse(req.url).pathname;
    const gameType = pathname.split('/')[1]; // 'tictactoe' or 'connect4'
    
    console.log(`New connection for ${gameType}`);
    
    if (gameType !== 'tictactoe' && gameType !== 'connect4') {
        ws.send(JSON.stringify({ type: 'error', message: 'Invalid game type' }));
        ws.close();
        return;
    }

    // Find or create a room
    const roomId = findAvailableRoom(gameType);
    
    // Handle game based on type
    if (gameType === 'tictactoe') {
        handleTicTacToe(ws, roomId);
    } else {
        handleConnect4(ws, roomId);
    }
});

server.listen(3000, () => {
    console.log('Game server is listening on port 3000');
});
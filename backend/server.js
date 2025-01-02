import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';

const server = http.createServer(function(request,response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.end("hi there");
});

const wss = new WebSocketServer({ server });

let players = [];

wss.on('connection', (socket) => {
  // Add the new player
  players.push(socket);

  if (players.length === 2) {
    // Notify both players that the game can start
    players.forEach((player, index) => {
      player.send(JSON.stringify({ type: 'start', player: index === 0 ? 'X' : 'O' }));
    });
  }

  socket.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'move') {
      // Broadcast the move to the other player
      players.forEach((player) => {
        if (player !== socket) {
          player.send(JSON.stringify({ type: 'move', move: data.move, player: data.player }));
        }
      });
    }
  });

  socket.on('close', () => {
    // Remove disconnected player
    players = players.filter((player) => player !== socket);
  });
});

server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});
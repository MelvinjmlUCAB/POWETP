const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Broadcast the word to all connected clients
  socket.on('startGame', (word) => {
    io.emit('startGame', word);
  });

  // Broadcast the guessed letter to all connected clients
  socket.on('guessLetter', (letter) => {
    io.emit('guessLetter', letter);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

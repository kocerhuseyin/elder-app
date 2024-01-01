const express = require("express");
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);
const mongoose = require("mongoose");
const cors = require('cors');
const { Server } = require('socket.io');

// Use cors middleware for Socket.IO connections
const ioWithOptions = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Replace with your React app's URL
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

ioWithOptions.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for chat messages
  socket.on('chat message', (msg) => {
    console.log('Received message:', msg);
    ioWithOptions.emit('chat message', msg); // Broadcast the message to all connected clients
  });

  // Clean up on disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

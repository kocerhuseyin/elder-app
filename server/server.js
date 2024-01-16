require('dotenv').config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require("mongoose");
const userRoutes = require('./routes');

// Middleware to parse JSON bodies
app.use(express.json());

// Use the user routes
app.use('/api', userRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

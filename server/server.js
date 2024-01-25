require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require("mongoose");
const routes = require("./routes");
const Chat = require("./models/Chat");
const cors = require("cors");

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Use the user routes
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

io.on("connection", (socket) => {
  console.log("a user connected: " + socket.id);

  // Event for sending a message
  socket.on("sendMessage", async (data) => {
    const { senderId, receiverId, message } = data;

    // Save the message to the database
    let chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!chat) {
      chat = new Chat({ participants: [senderId, receiverId], messages: [] });
      await chat.save();
    }
    const newMessage = {
      sender: senderId,
      message: message,
      timestamp: new Date(),
    };
    chat.messages.push(newMessage);
    await chat.save();

    // Emit the message to both the sender and receiver
    // Assuming each user connects with a socket room named after their user ID
    io.to(senderId).emit("receiveMessage", newMessage);
    io.to(receiverId).emit("receiveMessage", newMessage);
  });

  // Handling user joining their own room with their user ID
  // This requires that the client sends their userID when they connect
  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room: ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected: " + socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

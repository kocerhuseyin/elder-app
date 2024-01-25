const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profileInfo: {
    gender: String,
    age: Number,
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  friendRequests: {
    sent: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    received: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
});

userSchema.add({
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);

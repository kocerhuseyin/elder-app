const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Chat = require("./models/Chat");
const Alarm = require("./models/Alarm");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const router = express.Router();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Validate User ID
const isValidUser = async (userId) => {
  const user = await User.findById(userId);
  return !!user;
};

// User Registration Route
router.post("/register", async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user instance
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      profileInfo: {
        gender: req.body.profileInfo?.gender,
        age: req.body.profileInfo?.age,
      },
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with the created user (excluding the password)
    res.status(201).json({
      username: savedUser.username,
      email: savedUser.email,
      profileInfo: savedUser.profileInfo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Update User Route
router.put("/user/update", async (req, res) => {
  try {
    // Check if the authorization header is set
    if (!req.headers.authorization) {
      return res.status(401).send("Authorization header is missing");
    }

    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send("No token provided");
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).send("Invalid token");
    }

    // Find user by ID from token and update
    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { $set: { profileInfo: req.body.profileInfo } },
      { new: true }
    );

    // Exclude password from the response
    updatedUser.password = undefined;

    res.json(updatedUser);
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      res.status(401).send("Invalid token");
    } else {
      res.status(500).send(error.message);
    }
  }
});

// Add Friend Route
router.post("/user/:userId/addFriend/:friendId", async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    // Add friendId to the user's friends list
    await User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } });
    // Optionally, add userId to the friend's friends list
    await User.findByIdAndUpdate(friendId, { $addToSet: { friends: userId } });

    res.status(200).send("Friend added successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get Users Route
router.get("/get-users", async (req, res) => {
  try {
    const { name } = req.query;
    const users = await User.find({
      "profileInfo.name": new RegExp(name, "i"),
    });
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get Friend List Route
router.get("/friends", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from JWT

    // Find the user and retrieve their friends list
    const user = await User.findById(userId).populate(
      "friends",
      "username profileInfo"
    );
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Respond with the friends list
    res.json(user.friends);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Send Friend Request Route
router.post(
  "/send-friend-request/:receiver",
  authenticateToken,
  asyncHandler(async (req, res) => {
    try {
      const senderId = req.user.id; // Extract sender ID from JWT
      const { receiver } = req.params;

      // Find the receiver's user data by username
      const receiverUser = await User.findOne({ username: receiver });

      // Validate user IDs
      if (!(await isValidUser(senderId)) || !receiverUser) {
        return res.status(404).send("User not found");
      }

      // Check if the sender is not sending a request to themselves
      if (senderId === receiverUser._id.toString()) {
        return res.status(400).send("Cannot send a friend request to yourself");
      }

      // Convert receiverUser._id to a valid ObjectId
      const receiverUserId = new mongoose.Types.ObjectId(
        receiverUser._id.toString()
      );

      // Update sent and received friend requests for both sender and receiver
      await User.findByIdAndUpdate(senderId, {
        $push: { "friendRequests.sent": receiverUserId },
      });

      await User.findByIdAndUpdate(receiverUserId, {
        $push: { "friendRequests.received": senderId },
      });

      res.status(200).send("Friend request sent");
    } catch (error) {
      console.error("Error sending friend request:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  })
);
// Get Received Friend Requests Route
router.get(
  "/get-received-friend-requests",
  authenticateToken,
  async (req, res) => {
    try {
      const userId = req.user.id; // Extract user ID from JWT

      // Find the user and retrieve their received friend requests
      const user = await User.findById(userId).populate(
        "friendRequests.received",
        "username profileInfo"
      );
      if (!user) {
        return res.status(404).send("User not found");
      }

      // Respond with the received friend requests
      res.json(user.friendRequests.received);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// Accept Friend Request Route
router.post(
  "/accept-friend-request/:sender",
  authenticateToken,
  async (req, res) => {
    try {
      const receiverId = req.user.id; // Extract receiver ID from JWT
      const { sender } = req.params;

      // Fetch the receiver's user data
      const receiverUser = await User.findById(receiverId);

      // Validate user IDs and check if the receiver has received a request from the sender
      if (
        !(await isValidUser(sender)) ||
        !receiverUser ||
        !receiverUser.friendRequests.received.includes(sender)
      ) {
        return res.status(404).send("User not found or no request received");
      }

      // Update friends list for both sender and receiver
      await User.findByIdAndUpdate(sender, {
        $push: { friends: receiverId },
        $pull: { "friendRequests.sent": receiverId },
      });
      await User.findByIdAndUpdate(receiverId, {
        $push: { friends: sender },
        $pull: { "friendRequests.received": sender },
      });

      res.status(200).send("Friend request accepted");
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// Send Message Route
// Send Message Route
router.post(
  "/send-message/:receiverUsername",
  authenticateToken,
  async (req, res) => {
    try {
      const senderId = req.user.id; // Extract sender ID from JWT
      const receiverUsername = req.params.receiverUsername;
      const { message } = req.body;

      // Find the receiver's user data
      const receiverUser = await User.findOne({ username: receiverUsername });

      if (!receiverUser) {
        return res.status(404).send("Receiver not found");
      }

      // Check for an existing chat between sender and receiver
      let chat = await Chat.findOne({
        participants: { $all: [senderId, receiverUser.id] },
      });

      // If no chat exists, create a new one
      if (!chat) {
        chat = new Chat({
          participants: [senderId, receiverUser.id],
          messages: [],
        });
      }

      // Add new message to chat
      const newMessage = {
        sender: senderId,
        message: message,
      };
      chat.messages.push(newMessage);
      await chat.save();

      res.status(200).send("Message sent");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Fetch Messages Route
router.get(
  "/fetch-messages/:receiverUsername",
  authenticateToken,
  async (req, res) => {
    try {
      const senderId = req.user.id; // Extract sender ID from JWT
      const receiverUsername = req.params.receiverUsername;

      // Find the receiver's user data by username
      const receiverUser = await User.findOne({ username: receiverUsername });

      if (!receiverUser) {
        return res.status(404).send("Receiver not found");
      }
      // Find the chat between sender and receiver
      const chat = await Chat.findOne({
        participants: { $all: [senderId, receiverUser._id] },
      }).populate("messages.sender", "username"); // Populate sender details in each message
      console.log("Sender ID:", senderId);
      console.log("Receiver User ID:", receiverUser._id);
      console.log("Chat found:", chat);
      if (!chat) {
        return res.status(404).send("Chat not found");
      }
      console.log("Receiver Username:", receiverUsername);

      // Return the entire chat including all messages
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

// Create an alarm
router.post("/alarms", authenticateToken, async (req, res) => {
  try {
    const newAlarm = new Alarm({ ...req.body, userId: req.user.id });
    const savedAlarm = await newAlarm.save();
    res.status(201).json(savedAlarm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an alarm
router.put("/update-alarm/:alarmId", authenticateToken, async (req, res) => {
  try {
    const updatedAlarm = await Alarm.findByIdAndUpdate(
      req.params.alarmId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAlarm) {
      return res.status(404).send("Alarm not found");
    }
    res.json(updatedAlarm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an alarm
router.delete("/delete-alarm/:alarmId", authenticateToken, async (req, res) => {
  try {
    const deletedAlarm = await Alarm.findByIdAndDelete(req.params.alarmId);
    if (!deletedAlarm) {
      return res.status(404).send("Alarm not found");
    }
    res.status(200).send("Alarm deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch all alarms for a user
router.get("/get-alarms", authenticateToken, async (req, res) => {
  try {
    const alarms = await Alarm.find({ userId: req.user.id });
    res.json(alarms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

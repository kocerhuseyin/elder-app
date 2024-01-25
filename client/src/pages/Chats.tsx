import React, { useState, useEffect } from "react";
import LogoutIcon from "../images/logout.svg";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import ChatCard from "../components/chatCard/ChatCard";
import axios, { AxiosResponse } from "axios";
import Friend1 from "./friend1.svg";
import { useNavigate } from "react-router-dom";

interface Friend {
  _id: string;
  username: string;
  profileInfo: {
    gender: 'Erkek' | 'Kadın';
    age: number;
  };
}

interface Chat {
  _id: string;
  participants: string[];
  messages: {
    _id: string;
    sender: {
      _id: string;
      username: string;
    };
    content: string;
    timestamp: string;
  }[];
}

const Chats: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState<string>('');
  const navigate = useNavigate();

  const fetchFriends = async () => {
    try {
      const response: AxiosResponse<Friend[]> = await axios.get(
        "http://localhost:5000/api/friends",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setFriends(response.data);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  const fetchChats = async () => {
    try {
      const response: AxiosResponse<Chat[]> = await axios.get(
        `http://localhost:5000/api/fetch-messages/${selectedFriendId || ''}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const handleSendMessage = async () => {
    try {
      if (!selectedFriendId || !messageInput.trim()) {
        return;
      }

      const selectedFriend = friends.find((friend) => friend._id === selectedFriendId);

      if (!selectedFriend) {
        console.error("Selected friend not found");
        return;
      }

      await axios.post(
        `http://localhost:5000/api/send-message/${selectedFriend.username}`,
        { message: messageInput },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      // Clear the message input after sending
      setMessageInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    fetchFriends();
    fetchChats();
  }, [selectedFriendId]); // Update chats when selectedFriendId changes

  return (
    <>
      <Navbar />
      <button
        onClick={() => navigate("/login")}
        style={{
          backgroundColor: "transparent",
          border: "none",
          position: "absolute",
          top: "5%",
          right: "5%",
          transform: "translate(-50%, -50%)",
          cursor: "pointer",
        }}
      >
        <img src={LogoutIcon} alt="LogoutIcon" />
      </button>
      <div className="row h-100" style={{ backgroundColor: "#F1EFEF" }}>
        <Sidebar />
        <div className="col-8 ms-5">
          <div className="row mx-auto mt-5">
            {selectedFriendId ? (
              // Render chat for the selected friend
              <>
                {Array.isArray(chats) && chats.length > 0 ? (
                  chats.map((chat) => {
                    const friendId = chat.participants.find(
                      (participant) => participant !== localStorage.getItem("userId")
                    );
                    const friend = friends.find((f) => f._id === friendId);
                    if (!friend) return null;

                    return (
                      <ChatCard
                        key={chat._id}
                        image={Friend1}
                        name={friend.username}
                        message={chat.messages.length > 0 ? chat.messages[0].content : ""}
                      />
                    );
                  })
                ) : (
                  <p>No messages to display.</p>
                )}
                {/* Chatbox for writing messages */}
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Write a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="form-control mr-2"
                    style={{ width: "80%", borderRadius: "5px", padding: "8px" }}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="btn btn-primary"
                    style={{ borderRadius: "5px", padding: "8px" }}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              // Render friends list
              friends.map((friend) => (
                <div
                  key={friend._id}
                  onClick={() => setSelectedFriendId(friend._id)}
                  style={{ cursor: "pointer" }}
                >
                  <ChatCard
                    key={friend._id}
                    image={Friend1}
                    name={friend.username}
                    message={
                      Array.isArray(chats) && chats.length > 0 && chats[0].messages.length > 0
                        ? chats[0].messages[0].content
                        : ""
                    }
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Chats;

// Chats.tsx
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
    gender: "Erkek" | "Kadın";
    age: number;
  };
}

interface Message {
  _id: string;
  sender: {
    _id: string;
    username: string;
  };
  message: string;
  timestamp: string;
}

interface Chat {
  _id: string;
  participants: string[];
  messages: Message[];
}

const Chats: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState<string>("");
  const [loadingChats, setLoadingChats] = useState<boolean>(false);
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
    if (!selectedFriendId) return;

    try {
      const selectedFriend = friends.find(
        (friend) => friend._id === selectedFriendId
      );
      if (!selectedFriend) {
        console.error("Selected friend not found");
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/fetch-messages/${selectedFriend.username}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("API Response:", response.data);
      setChats([response.data]); // Tek bir chat nesnesi dizi olarak ayarlanÄ±r
      console.log("Updated chats state:", chats);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const handleSendMessage = async () => {
    try {
      if (!selectedFriendId || !messageInput.trim()) {
        return;
      }

      const selectedFriend = friends.find(
        (friend) => friend._id === selectedFriendId
      );

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
      // Refetch chats after sending a message
      fetchChats();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []); // Fetch friends only once on component mount

  useEffect(() => {
    if (selectedFriendId) {
      fetchChats();
    }
  }, [selectedFriendId]); // Fetch chats when selectedFriendId changes

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
              <>
                {loadingChats && <div>Loading chats...</div>}
                {chats.length === 0 && !loadingChats && (
                  <div>No chats found</div>
                )}
                {chats.length > 0 &&
                  chats.map((chat) => (
                    <div key={chat._id}>
                      {chat.messages.map((message) => (
                        <div key={message._id}>
                          <ChatCard
                            key={message._id}
                            image={Friend1}
                            name={message.sender.username}
                            messages={[message]}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Write a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="form-control mr-2"
                    style={{
                      width: "80%",
                      borderRadius: "5px",
                      padding: "8px",
                    }}
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
                    messages={[]}
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

import React from "react";
import LogoutIcon from "../images/logout.svg";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import ChatCard from "../components/chatCard/ChatCard";
import Friend1 from "../images/friend1.svg";
import Friend2 from "../images/friend2.svg";

const Chats: React.FC = () => {
  const chats = [
    {
      image: Friend1,
      name: "John Doe",
      message: "Hello, how are you?",
    },
    {
      image: Friend2,
      name: "Sara Doe",
      message: "I`m fine, thank you. And you?",
    },
    {
      image: Friend1,
      name: "Will Smith",
      message: "I`m fine too.",
    },
  ];
  return (
    <>
      <Navbar />
      <img
        src={LogoutIcon}
        alt="LogoutIcon"
        style={{
          position: "absolute",
          top: "5%",
          right: "5%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div className="row h-100" style={{ backgroundColor: "#F1EFEF" }}>
        <Sidebar />
        <div className="col-8 ms-5">
          <div className="row mx-auto mt-5">
            {chats.map((chat, index) => (
              <ChatCard
                key={index}
                image={chat.image}
                name={chat.name}
                message={chat.message}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Chats;

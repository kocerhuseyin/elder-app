import React from "react";
import Navbar from "../components/navbar/Navbar";
import LogoutIcon from "../images/logout.svg";
import Footer from "../components/footer/Footer";
import Sidebar from "../components/sidebar/Sidebar";
import FriendCard from "../components/friendCard/FriendCard";
import Friend1 from "../images/friend1.svg";
import Friend2 from "../images/friend2.svg";
import { useNavigate } from "react-router-dom";

const Friends: React.FC = () => {
  const navigate = useNavigate();

  const friends = [
    {
      image: Friend1,
      name: "John Doe",
    },
    {
      image: Friend2,
      name: "Sara Doe",
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
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/");
          localStorage.clear();
        }}
      />
      <div className="row h-100" style={{ backgroundColor: "#F1EFEF" }}>
        <Sidebar />
        <div className="col-8 ms-5">
          <div className="row mx-auto">
            {friends.map((friend, index) => (
              <FriendCard key={index} image={friend.image} name={friend.name} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Friends;

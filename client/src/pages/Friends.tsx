import React from "react";
import Navbar from "../components/navbar/Navbar";
import LogoutIcon from "../images/logout.svg";
import Footer from "../components/footer/Footer";
import Sidebar from "../components/sidebar/Sidebar";
import Card from "../components/card/Card";
import Friend1 from "../images/friend1.svg";
import Friend2 from "../images/friend2.svg";

const Friends: React.FC = () => {
  const friends = [
    {
      image: Friend1,
      name: "John Doe",
    },
    {
      image: Friend2,
      name: "Sara Doe",
    },
    {
      image: Friend1,
      name: "Will Smith",
    },
    {
      image: Friend1,
      name: "Denzel Washington",
    },
    {
      image: Friend2,
      name: "Angelina Jolie",
    },
    {
      image: Friend1,
      name: "Brad Pitt",
    },
    {
      image: Friend2,
      name: "Jennifer Aniston",
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
        <div className="col-9 ms-5">
          <div className="row mx-auto">
            {friends.map((friend, index) => (
              <Card key={index} image={friend.image} name={friend.name} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Friends;

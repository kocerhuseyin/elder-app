import React from "react";
import Navbar from "../components/navbar/Navbar";
import LogoutIcon from "../images/logout.svg";
import Footer from "../components/footer/Footer";
import Sidebar from "../components/sidebar/Sidebar";

const Friends: React.FC = () => {
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
      <Sidebar />
      <Footer />
    </>
  );
};

export default Friends;

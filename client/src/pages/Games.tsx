import React from "react";
import Navbar from "../components/navbar/Navbar";
import LogoutIcon from "../images/logout.svg";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";

const Games: React.FC = () => {
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

export default Games;

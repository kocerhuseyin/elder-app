import React from "react";
import "./Landing.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import JoinUs from "../components/joinUs/JoinUs";
import Discover from "../components/discover/Discover";
import Works from "../components/works/Works";
import AboutUs from "../components/aboutUs/AboutUs";
import Chat from "../pages/Chats";

const Landing: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="box">
        <JoinUs />
      </div>
      <div className="box bg-light">
        <Discover />
      </div>
      <div className="box bg-lighter">
        <Works />
      </div>
      <div className="box bg-light">
        <AboutUs />
      </div>
      <div className="box bg-lighter">
        <Chat />
      </div>
      <Footer />
    </>
  );
};

export default Landing;

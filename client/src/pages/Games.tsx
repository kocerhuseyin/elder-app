import React from "react";
import Navbar from "../components/navbar/Navbar";
import LogoutIcon from "../images/logout.svg";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import Game1 from "../images/blackjack.svg";
import GameCard from "../components/gameCard/GameCard";
import { useNavigate } from "react-router-dom";

const Games: React.FC = () => {
  const navigate = useNavigate();
  const handleImageClick = () => {
    navigate("/login");
    console.log('logout');
  };
  const games = [
    {
      image: Game1,
      name: "BlackJack",
    }
  ];
  return (
    <>
      <Navbar />
      <button
      onClick={handleImageClick}
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
      <img
        src={LogoutIcon}
        alt="LogoutIcon"
      />
      </button>
      <div className="row h-100" style={{ backgroundColor: "#F1EFEF" }}>
        <Sidebar />
        <div className="col-9 ms-5">
          <div className="row mx-auto">
            {games.map((game, index) => (
              <GameCard key={index} image={game.image} name={game.name} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Games;

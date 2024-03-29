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

  const games = [
    {
      image: Game1,
      name: "BlackJack",
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

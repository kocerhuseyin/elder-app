import React from "react";
import "./Sidebar.css";
import FriendsIcon from "../../images/friends.svg";
import ChatsIcon from "../../images/chats.svg";
import GamesIcon from "../../images/games.svg";
import RemindersIcon from "../../images/reminders.svg";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="d-block sidebar col-2 px-3 pt-4 h-100">
      <div className="list-group">
        <button
          className="list-group-item list-group-item-action py-2 custom-item"
          onClick={() => navigate("/friends")}
        >
          <img src={FriendsIcon} alt="Friends" className="me-3" />
          <span className="align-self-center">Arkadaşlar</span>
        </button>
        <button
          className="list-group-item list-group-item-action py-2 custom-item"
          onClick={() => navigate("/chats")}
        >
          <img src={ChatsIcon} alt="Friends" className="me-3" />
          <span className="align-self-center">Sohbetler</span>
        </button>
        <button
          className="list-group-item list-group-item-action py-2 custom-item"
          onClick={() => navigate("/games")}
        >
          <img src={GamesIcon} alt="Friends" className="me-3" />
          <span className="align-self-center">Oyunlar</span>
        </button>
        <button
          className="list-group-item list-group-item-action py-2 custom-item"
          onClick={() => navigate("/reminders")}
        >
          <img src={RemindersIcon} alt="Friends" className="me-3" />
          <span className="align-self-center">Anımsatıcılar</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

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
    <div className="d-block sidebar col-2 pt-4 h-100">
      <div className="list-group mx-4">
        <button
          className={
            "list-group-item list-group-item-action py-2 custom-item ps-5" +
            (window.location.pathname === "/friends" ? " active" : "")
          }
          onClick={() => navigate("/friends")}
        >
          <img src={FriendsIcon} alt="FriendsIcon" className="me-3 ps-5" />
          <span className="align-self-center">Arkadaşlar</span>
        </button>
        <button
          className={
            "list-group-item list-group-item-action py-2 custom-item ps-5" +
            (window.location.pathname === "/chats" ? " active" : "")
          }
          onClick={() => navigate("/chats")}
        >
          <img src={ChatsIcon} alt="ChatsIcon" className="me-3 ps-5" />
          <span className="align-self-center">Sohbetler</span>
        </button>
        <button
          className={
            "list-group-item list-group-item-action py-2 custom-item ps-5" +
            (window.location.pathname === "/games" ? " active" : "")
          }
          onClick={() => navigate("/games")}
        >
          <img src={GamesIcon} alt="GamesIcon" className="me-5 ps-5" />
          <span className="align-self-center">Oyunlar</span>
        </button>
        <button
          className={
            "list-group-item list-group-item-action py-2 custom-item ps-5" +
            (window.location.pathname === "/reminders" ? " active" : "")
          }
          onClick={() => navigate("/reminders")}
        >
          <img src={RemindersIcon} alt="RemindersIcon" className="me-3 ps-5" />
          <span className="align-self-center">Anımsatıcılar</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

import React from "react";
import "./ChatCard.css";
import Close from "../../images/close.svg";

interface Message {
  sender: {
    _id: string;
    username: string;
  };
  message: string;
  _id: string;
  timestamp: string;
}

interface ChatCardProps {
  image: string;
  name: string;
  messages: Message[];
}

const ChatCard: React.FC<ChatCardProps> = ({ image, name, messages }) => {
  return (
    <div className="card col-10 mb-5">
      <div className="row my-3 ms-2">
        <div className="col-1 text-center">
          <img
            width="100%"
            className="rounded-circle mx-auto"
            alt={image}
            src={image}
          />
        </div>
        <div className="col-7 card-body">
          <h5 className="card-title fw-bolder">{name}</h5>
          {messages.map((message) => (
            <p key={message._id} className="card-text">
              {message.message}
            </p>
          ))}
        </div>
        <button className="col-1 my-auto close-button">
          <img width="40%" alt="Close" src={Close} />
        </button>
      </div>
    </div>
  );
};

export default ChatCard;

import React from "react";
import "./GameCard.css";

const GameCard = ({ image, name }: { image: string; name: string }) => {
  const switchToBlackJack = () => {
    window.location.href = 'http://localhost:3001';
  };
  return (
    <div className="card col-2 m-5">
      <img width="75%" className="mx-auto mt-3" alt={image} src={image} />
      <div className="card-body">
        <h5 className="card-title text-center">{name}</h5>
        <button
          type="button"
          className="display-6 fw-bold mt-5 p-3 button"
          onClick={switchToBlackJack}
        >
          Oyna
        </button>
      </div>
    </div>
  );
};

export default GameCard;

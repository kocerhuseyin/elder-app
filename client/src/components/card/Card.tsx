import React from "react";
import "./Card.css";

const Card = ({ image, name }: { image: string; name: string }) => {
  return (
    <div className="card col-2 m-5">
      <img
        width="75%"
        height="75%"
        className="rounded-circle mx-auto"
        alt={image}
        src={image}
      />
      <div className="card-body">
        <h5 className="card-title text-center">{name}</h5>
      </div>
    </div>
  );
};

export default Card;

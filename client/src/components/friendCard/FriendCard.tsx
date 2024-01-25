import React from "react";
import "./FriendCard.css";
import Friend1 from "./friend1.svg"
import Friend2 from "./friend2.svg"

const FriendCard = ({ gender, name }: { gender: string; name: string }) => {
  return (
    <div className="card col-2 m-5">
      {gender === 'Erkek' ? (
            <img
        width="75%"
        className="rounded-circle mx-auto"
        alt={Friend1}
        src={Friend1}
      />
          ) : (
            <img
        width="75%"
        className="rounded-circle mx-auto"
        alt={Friend2}
        src={Friend2}
      />
          )}
      <div className="card-body">
        <h5 className="card-title text-center">{name}</h5>
      </div>
    </div>
  );
};

export default FriendCard;

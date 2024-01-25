import React from "react";
import "./ReminderCard.css";
import ReminderCompleted from "../../images/reminderCompleted.svg";
import ReminderNotCompleted from "../../images/reminderNotCompleted.svg";

const ReminderCard = ({
  image,
  days,
  time,
  description,
  completed,
}: {
  image: string;
  days: string[];
  time: string;
  description: string;
  completed: boolean;
}) => {
  return (
    <div className="card col-4 m-5">
      <div className="card-body">
        <div className="p-4">
          <h5 className="card-title fw-bolder">{description}</h5>
          <p className="card-text">{days.join(", ")}</p>
          <p className="card-text">{time}</p>
        </div>
        <button
          type="button"
          className="display-6 fw-bold mt-5 p-3 button ps-5 pe-5"
        >
          {completed ? (
            <img width="20%" alt="ReminderCompleted" src={ReminderCompleted} />
          ) : (
            <img
              width="20%"
              alt="ReminderNotCompleted"
              src={ReminderNotCompleted}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default ReminderCard;

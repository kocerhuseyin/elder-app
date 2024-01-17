import React from "react";
import "./ReminderCard.css";
import ReminderCompleted from "../../images/reminderCompleted.svg";
import ReminderNotCompleted from "../../images/reminderNotCompleted.svg";

const ReminderCard = ({
  image,
  description,
  completed,
}: {
  image: string;
  description: string;
  completed: boolean;
}) => {
  return (
    <div className="card col-2 m-5">
      <div className="h-100 text-center mt-5">
        <img width="75%" alt={image} src={image} />
      </div>
      <div className="card-body">
        <h5 className="card-title text-center">{description}</h5>
        <button
          type="button"
          className="display-6 fw-bold mt-5 p-3 button ps-5 pe-5"
        >
          {completed ? (
            <img width="40%" alt="ReminderCompleted" src={ReminderCompleted} />
          ) : (
            <img
              width="40%"
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

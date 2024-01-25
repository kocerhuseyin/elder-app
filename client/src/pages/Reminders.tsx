import React from "react";
import LogoutIcon from "../images/logout.svg";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import ReminderForMedicine from "../images/reminderForMedicine.svg";
import ReminderForWater from "../images/reminderForWater.svg";
import ReminderCard from "../components/reminderCard/ReminderCard";
import { useNavigate } from "react-router-dom";

const Reminders: React.FC = () => {
  const navigate = useNavigate();
  const handleImageClick = () => {
    navigate("/login");
    console.log("logout");
  };
  const reminders = [
    {
      image: ReminderForMedicine,
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      time: "10:00",
      description: "Take your medicine. Should be taken 3 times a day.",
      completed: true,
    },
    {
      image: ReminderForWater,
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      time: "10:00",
      description: "Drink water",
      completed: false,
    },
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
        <img src={LogoutIcon} alt="LogoutIcon" />
      </button>
      <div className="row h-100" style={{ backgroundColor: "#F1EFEF" }}>
        <Sidebar />
        <div className="col-9 ms-5">
          <div className="row mx-auto">
            {reminders.map((reminder, index) => (
              <ReminderCard
                key={index}
                image={reminder.image}
                days={reminder.days}
                time={reminder.time}
                description={reminder.description}
                completed={reminder.completed}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Reminders;

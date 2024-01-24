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

  const reminders = [
    {
      image: ReminderForMedicine,
      description: "Take your medicine. Should be taken 3 times a day.",
      completed: true,
    },
    {
      image: ReminderForWater,
      description: "Drink water",
      completed: false,
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
            {reminders.map((reminder, index) => (
              <ReminderCard
                key={index}
                image={reminder.image}
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

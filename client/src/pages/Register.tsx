import React from "react";
import LoginRegisterBackground from "../images/loginRegisterBackground.png";
import RegisterForm from "../components/form/RegisterForm";
import Navbar from "../components/navbar/Navbar";

const Register: React.FC = () => {
  // TODO - Fix image css
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Navbar />
      <img
        src={LoginRegisterBackground}
        alt="LoginRegisterBackground"
        style={{
          opacity: "0.5",
          position: "relative",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          width: "100vw",
          height: "100vh",
        }}
      />
      <RegisterForm />
    </div>
  );
};

export default Register;

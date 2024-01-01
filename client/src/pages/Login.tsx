import React from "react";
import Navbar from "../components/navbar/Navbar";
import LoginRegisterBackground from "../images/loginRegisterBackground.png";
import LoginForm from "../components/form/LoginForm";

const Login: React.FC = () => {
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
      <LoginForm />
    </div>
  );
};

export default Login;

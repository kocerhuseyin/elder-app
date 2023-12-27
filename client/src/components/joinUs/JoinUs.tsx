import React from "react";
import JoinUsImage from "../../images/joinUs.png";
import "./JoinUs.css";
import { useNavigate } from "react-router-dom";

const JoinUs = () => {
  const navigate = useNavigate();

  return (
    <div>
      <img
        src={JoinUsImage}
        alt="JoinUs"
        style={{
          width: "100%",
          objectFit: "cover",
          opacity: "0.5",
        }}
      />
      <div className="join-us-content-box">
        <h1 className="display-1 fw-bold">İlgi Çekici Aktiviteleri Keşfedin</h1>
        <p className="display-6 mt-5">
          Zamanınızın tadını çıkarmak için etkileşimli ve anlamlı aktivitelerle
          dolu bir platformu deneyimleyin.
        </p>
        <button
          type="button"
          className="display-6 fw-bold mt-5 p-3 button ps-5 pe-5"
          onClick={() => navigate("/register")}
        >
          Şimdi Katıl
        </button>
      </div>
    </div>
  );
};

export default JoinUs;

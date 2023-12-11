import React from "react";
import Social from "../../images/social.png";
import FreeTime from "../../images/freeTime.png";
import ActiveLifeStyle from "../../images/activeLifeStyle.png";
import "./Works.css";

const Works = () => {
  return (
    <div className="works-content-box display-6">
      <h1 className="fw-bold">Çalışmalarımız</h1>
      <div className="row justify-content-between mt-5">
        <div className="col">
          <div className="card">
            <img
              style={{
                width: "100%",
                objectFit: "cover",
                opacity: "0.3",
                borderRadius: "5rem",
              }}
              src={Social}
              alt="Social"
            />
            <p className="works-content-box">
              Sosyal Bağlantıların Geliştirilmesi
            </p>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <img
              style={{
                width: "100%",
                objectFit: "cover",
                opacity: "0.3",
                borderRadius: "5rem",
              }}
              src={FreeTime}
              alt="FreeTime"
            />
            <p className="works-content-box">
              Boş Zaman Aktivitelerinin Zenginleştirilmesi
            </p>
          </div>
        </div>

        <div className="col">
          <div className="card">
            <img
              style={{
                width: "100%",
                objectFit: "cover",
                opacity: "0.3",
                borderRadius: "5rem",
              }}
              src={ActiveLifeStyle}
              alt="ActiveLifeStyle"
            />
            <p className="works-content-box">
              Hareketli Yaşam Tarzlarını Teşvik Etmek
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;

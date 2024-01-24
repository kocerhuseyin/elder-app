import React from "react";
import "./RegisterForm.css";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  return (
    <form className="col-3 form">
      <div data-mdb-input-init className="form-outline mb-4">
        <input
          type="email"
          id="email"
          className="form-control p-3 rounded-5 border-0"
          placeholder="E-posta"
        />
      </div>

      <div data-mdb-input-init className="form-outline mb-4">
        <input
          type="password"
          id="password"
          className="form-control p-3 rounded-5 border-0"
          placeholder="Şifre"
        />
      </div>

      <div data-mdb-input-init className="form-outline mb-4">
        <div className="d-md-flex justify-content-center align-items-center mb-4 py-2">
          <h6 id="gender" className="mb-0 me-4">
            Cinsiyet:{" "}
          </h6>
          <select className="gender col-3">
            <option>Kadın</option>
            <option>Erkek</option>
          </select>
        </div>
      </div>

      <div data-mdb-input-init className="form-outline mb-4">
        <div className="d-md-flex justify-content-center align-items-center mb-4 py-2">
          <h6 className="mb-0 me-4">Yaş: </h6>
          <div className="col-3">
            <input type="number" id="age" className="form-control age" />
          </div>
        </div>
      </div>

      <button
        data-mdb-ripple-init
        type="button"
        className="col-12 btn btn-block mb-4 p-3 rounded-5"
      >
        Kayıt ol
      </button>

      <div className="text-center">
        <p>
          Hesabınız var mı?{" "}
          <button
            className="login-button fw-bold"
            onClick={() => navigate("/login")}
          >
            Giriş yap
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;

import React from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
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

      <button
        data-mdb-ripple-init
        type="button"
        className="col-12 btn btn-block mb-4 p-3 rounded-5"
      >
        Giriş yap
      </button>

      <div className="text-center">
        <p>
          Hesabınız yok mu?{" "}
          <button
            className="register-button fw-bold"
            onClick={() => navigate("/register")}
          >
            Kayıt ol
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;

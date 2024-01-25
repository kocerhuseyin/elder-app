import React from "react";
import "./RegisterForm.css";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RegistrationData {
  username: string;
  email: string;
  password: string;
  profileInfo?: {
    gender?: string;
    age?: number;
  };
}

interface ApiResponse {
  username: string;
  email: string;
  profileInfo?: {
    gender?: string;
    age?: number;
  };
}

const RegisterForm = () => {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = React.useState<RegistrationData>({
    username: "",
    email: "",
    password: "",
    profileInfo: {
      gender: "Kadın", // Default gender
      age: undefined,
    },
  });
  const [responseUser, setResponseUser] = React.useState<ApiResponse | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleRegister = async () => {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(
        "http://localhost:5000/api/register",
        registrationData
      );
      setResponseUser(response.data);
      console.log(response.data);
      setErrorMessage(null); // Clear any previous error message
      toast.success("Kayıt Başarılı!");
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      setResponseUser(null); // Clear any previous response
      setErrorMessage(
        "Registration failed. Please fill out all required fields and try again."
      ); // Handle error response from the server
      toast.error("Kayıt Başarısız!");
    }
  };
  const [selectedGender, setSelectedGender] = React.useState<string>('Kadın');
  return (
    <form className="col-3 form">
      <div className="form-outline mb-4">
        <input
          type="username"
          id="userName"
          className="form-control p-3 rounded-5 border-0"
          placeholder="Kullanıcı adı"
          value={registrationData.username}
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              username: e.target.value,
            })
          }
        />
      </div>
      <div className="form-outline mb-4">
        <input
          type="email"
          id="email"
          className="form-control p-3 rounded-5 border-0"
          placeholder="E-posta"
          value={registrationData.email}
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              email: e.target.value,
            })
          }
        />
      </div>

      <div className="form-outline mb-4">
        <input
          type="password"
          id="password"
          className="form-control p-3 rounded-5 border-0"
          placeholder="Şifre"
          value={registrationData.password}
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              password: e.target.value,
            })
          }
        />
      </div>
            <div data-mdb-input-init className="form-outline mb-4 row">
        <div className="d-md-flex justify-content-center align-items-center mb-4 py-2 col-6">
          <label htmlFor="gender" className="mb-0 me-4">
            Cinsiyet:
          </label>
          <select
            id="gender"
            className="form-select"
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="Kadın">Kadın</option>
            <option value="Erkek">Erkek</option>
          </select>
        </div>


        <div className="d-md-flex justify-content-center align-items-center mb-4 py-2 col-6">
          <label htmlFor="age" className="mb-0 me-4">
            Yaş:
          </label>
          <input
            type="number"
            id="age"
            className="form-control"
            value={registrationData.profileInfo?.age || ""}
            onChange={(e) =>
              setRegistrationData({
                ...registrationData,
                profileInfo: {
                  ...registrationData.profileInfo,
                  age: parseInt(e.target.value, 10) || undefined,
                },
              })
            }
          />
        </div>
      </div>

      <button
        type="button"
        className="col-12 btn btn-block mb-4 p-3 rounded-5"
        onClick={handleRegister}
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
      <ToastContainer />
    </form>
  );
};

export default RegisterForm;

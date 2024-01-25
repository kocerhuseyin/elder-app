import React from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UserData {
  // Define the structure of your user data
  // For example, if your API returns an object like { token: string, user: { id: string, username: string, ... } }
  token: string;
  user: {
    id: string;
    username: string;
    // Add other properties as needed
  };
  // Add other properties as needed
}


const LoginForm = () => {
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response: AxiosResponse<UserData> = await axios.post('http://localhost:5000/api/login', {
        username: email,
        password: password,
      });

      const receivedUserData: UserData = response.data;

      // Store the token in localStorage
      localStorage.setItem('accessToken', receivedUserData.token);

      // Set user data in your state or context as needed
      setUserData(receivedUserData);

      console.log(response.data);
      toast.success('Giriş Başarılı!');
      navigate('/friends');
    } catch (error) {
      console.error('Error during login:', error);
      setUserData(null); // Clear any previous response
      toast.error('Giriş Başarısız!');
    }
  };
  return (
    <form className="col-3 form">
      <div data-mdb-input-init className="form-outline mb-4">
        <input
          type="email"
          id="email"
          className="form-control p-3 rounded-5 border-0"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div data-mdb-input-init className="form-outline mb-4">
        <input
          type="password"
          id="password"
          className="form-control p-3 rounded-5 border-0"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        data-mdb-ripple-init
        type="button"
        className="col-12 btn btn-block mb-4 p-3 rounded-5"
        onClick={handleLogin}
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

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserForm, UserData } from "./types";
import { Context } from "../../context/AuthContext";
import api from "../../api";
import "./loginRegister.css";

function Login() {
  const { userForm, setUserForm, setAuthenticated, authenticated } =
    useContext(Context);
  const { email, password } = userForm;
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated === true) {
      navigate("/");
    }
  }, [authenticated]);

  const handleLogin = async () => {
    await api
      .post("/users/login", {
        email,
        password,
      })
      .then((res) => {
        const data: UserData = res.data;

        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("userId", data._id);
        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        setAuthenticated(true);

        navigate("/");
      })
      .catch((error) => alert(error.response.data));
  };

  const loginAsGuest = () => {
    localStorage.setItem("token", "guest");
    localStorage.setItem("userId", "guest");
    setAuthenticated(true);
    navigate("/");
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please add all fields");
    }

    handleLogin();
  };

  return (
    <div className="loginregisterContainer">
      <div className="loginregister">
        <h1>Isn'tagram</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="emailLogin"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) =>
                setUserForm((prevState: UserForm) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="passwordLogin"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) =>
                setUserForm((prevState: UserForm) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="form-group">
            {password ? (
              <button type="submit">Log in</button>
            ) : (
              <button disabled type="submit">
                Log in
              </button>
            )}
          </div>
          <div className="or">
            <p>OR</p>
            <p className="lines line1"></p>
            <p className="lines line2"></p>
          </div>
          <p onClick={loginAsGuest} className="guest">
            Log in as guest
          </p>
        </form>
      </div>
      <div className="signup">
        <p>
          Don't have an account?{" "}
          <a href="/register">
            <span>Sign up</span>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;

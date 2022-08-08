import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserForm, UserData } from "./types";
import { Context } from "../../context/AuthContext";
import api from "../../api";

function Register() {
  const { userForm, setUserForm, authenticated } = useContext(Context);
  const { name, email, password, password2 } = userForm;

  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated === true) {
      navigate("/");
    }
  }, [authenticated]);

  const handleRegister = async () => {
    await api
      .post("/users/register", {
        name,
        email,
        password,
      })
      .then((res) => {
        const data: UserData = res.data;

        localStorage.setItem("token", JSON.stringify(data.token));
        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        navigate("/login");
      })
      .catch((error) => alert(error.response.data));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (password !== password2) {
      alert("Passwords don't match!");
    } else {
      handleRegister();
    }
  };

  return (
    <div className="loginregisterContainer">
      <div className="loginregister">
        <h1>Isn'tagram</h1>
        <p className="signupP">
          Sign up to see photos and videos from your friends.
        </p>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="name"
              className="name"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={(e) =>
                setUserForm((prevState: UserForm) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="email"
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
              className="password"
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
            <input
              type="password"
              className="password2"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={(e) =>
                setUserForm((prevState: UserForm) => ({
                  ...prevState,
                  password2: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="form-group">
            {password2 ? (
              <button type="submit">Register</button>
            ) : (
              <button disabled type="submit">
                Sign up
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="signup">
        <p>
          Have an account?{" "}
          <a href="/login">
            <span>Log in</span>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;

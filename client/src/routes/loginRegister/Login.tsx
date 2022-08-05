import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserForm, UserData } from "./types";
import { Context } from "../../context/AuthContext";
import api from "../../api";

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

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please add all fields");
    }

    handleLogin();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;

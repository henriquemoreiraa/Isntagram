import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from "./routes/loginRegister/Login";
import Register from "./routes/loginRegister/Register";
import Home from "./routes/home/Home";
import User from "./routes/user/User";
import Explore from "./routes/explore/Explore";
import { Contexts } from "./context/Context";

function App() {
  return (
    <Contexts>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/user/:id" element={<User />} />
          </Routes>
        </div>
      </Router>
    </Contexts>
  );
}

export default App;

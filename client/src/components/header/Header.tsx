import { Link } from "react-router-dom";
import { Context } from "../../context/AuthContext";
import { useContext } from "react";
import Notification from "./Notification";
import "./header.css";
import {
  IoCompassOutline,
  IoHomeOutline,
  IoHomeSharp,
  IoCompassSharp,
} from "react-icons/io5";
import { User } from "../../routes/home/types";

type Props = {
  user: User | undefined;
  page: string;
};

function Header({ user, page }: Props) {
  const { handleLogout } = useContext(Context);

  return (
    <header>
      <div className="header">
        <div className="headerItems">
          <div className="SiteName">Cringegram</div>
          <div>
            {/* <input className="search" type="text" placeholder="Search" /> */}
          </div>
          <ul>
            <Link to={"/"}>
              <li>
                {page === "home" ? (
                  <IoHomeSharp size={"1.7em"} color={"#212121"} />
                ) : (
                  <IoHomeOutline size={"1.7em"} />
                )}
              </li>
            </Link>
            <Link to={"/explore"}>
              <li>
                {page === "explore" ? (
                  <IoCompassSharp size={"1.7em"} color={"#212121"} />
                ) : (
                  <IoCompassOutline size={"1.7em"} />
                )}
              </li>
            </Link>
            <li>
              <Notification />
            </li>
            {user ? (
              <li>
                <div className="divImg2">
                  <img
                    src={`${process.env.REACT_APP_API_URL}${user.user_img.key}`}
                    alt=""
                  />
                </div>
              </li>
            ) : (
              ""
            )}
            {/* <li>
              <Link onClick={() => handleLogout()} to={"/login"}>
                Logout
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;

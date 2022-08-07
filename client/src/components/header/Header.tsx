import { Link } from "react-router-dom";
import { Context } from "../../context/AuthContext";
import { useContext, useState } from "react";
import Notification from "./Notification";
import "./header.css";
import {
  IoCompassOutline,
  IoHomeOutline,
  IoHomeSharp,
  IoCompassSharp,
  IoSearchOutline,
} from "react-icons/io5";
import { User } from "../../routes/home/types";
import SearchUsers from "./SearchUsers";

type Props = {
  user: User | undefined;
  page: string;
};

function Header({ user, page }: Props) {
  const { handleLogout } = useContext(Context);
  const [search, setSearch] = useState(false);

  return (
    <header>
      {search && <SearchUsers setSearch={setSearch} user={user} />}
      <div className="header">
        <div className="headerItems">
          <Link to={"/"} className="SiteName">
            Cringegram
          </Link>
          <ul>
            <li>
              <IoSearchOutline size={"1.7em"} onClick={() => setSearch(true)} />
            </li>
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

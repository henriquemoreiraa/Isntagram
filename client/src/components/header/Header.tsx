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
  IoPersonCircleOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { User } from "../../routes/home/types";
import SearchUsers from "./SearchUsers";
import CreatePost from "./CreatePost";
import { BsPlusSquare } from "react-icons/bs";

type Props = {
  user: User | undefined;
  page: string;
};

function Header({ user, page }: Props) {
  const { handleLogout } = useContext(Context);
  const [search, setSearch] = useState(false);
  const [createPost, setCreatePost] = useState(false);
  const [profileLogout, setProfileLogout] = useState(false);
  return (
    <header>
      {search && <SearchUsers setSearch={setSearch} user={user} />}
      {createPost && <CreatePost setCreatePost={setCreatePost} user={user} />}
      <div className="header">
        <div className="headerItems">
          <Link to={"/"} className="SiteName">
            Isn'tagram
          </Link>
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
            <li>
              <IoSearchOutline size={"1.7em"} onClick={() => setSearch(true)} />
            </li>
            <li>
              <BsPlusSquare
                size={"1.5em"}
                onClick={() => setCreatePost(true)}
              />
            </li>
            <Link to={"/explore"}>
              <li>
                {page === "explore" ? (
                  <IoCompassSharp size={"1.9em"} color={"#212121"} />
                ) : (
                  <IoCompassOutline size={"1.9em"} />
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
                    onClick={() => setProfileLogout(!profileLogout)}
                    src={`${process.env.REACT_APP_API_URL}${user.user_img.key}`}
                    alt=""
                  />
                  {profileLogout && (
                    <div className="profileLogoutDiv">
                      <Link className="divsPL" to={`/user/${user._id}`}>
                        <IoPersonCircleOutline size={"1.5em"} />
                        <p>Profile</p>
                      </Link>
                      <Link
                        onClick={() => handleLogout()}
                        to={"/login"}
                        className="divsPL"
                      >
                        <IoLogOutOutline size={"1.5em"} />
                        <p>Logout</p>
                      </Link>
                    </div>
                  )}
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

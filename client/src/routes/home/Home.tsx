import api from "../../api";
import "./home.css";
import { useEffect, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../../context/Context";
import Header from "../../components/header/Header";
import { User } from "./types";
import Posts from "../../components/posts/Posts";

function Home() {
  const [user, setUser] = useState<User>();

  const { authenticated, handleUnfollow, handleFollow, updateData } =
    useContext(Context);
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");

  useEffect(() => {
    if (authenticated) {
      (async () => {
        const { data } = await api.get(`/users/user/${id}`);

        setUser(data);
      })();
    }
  }, [updateData]);

  useEffect(() => {
    if (authenticated === false) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="container">
        <Header user={user} page={"home"} />
        <div className="containerPosts-userFollowing">
          <Posts user={user} page={"home"} />

          {user ? (
            <div className="userFollowing">
              <div className="fixedUserFollowing">
                <div className="user">
                  <div className="userImg-name">
                    <div className="divImg">
                      <Link to={`/user/${user._id}`}>
                        <img
                          className=""
                          src={`${process.env.REACT_APP_API_URL}${user.user_img}`}
                          alt=""
                        />
                      </Link>
                    </div>
                    <Link to={`/user/${user._id}`}>
                      <p className="userName">{user.name}</p>
                    </Link>
                  </div>
                </div>
                <div className="">
                  <p className="followedUsers">Your followed users</p>
                  {user.following.map((user) => (
                    <div className="user">
                      <Link className="userImg-name" to={`/user/${user._id}`}>
                        <>
                          <div className="divImg1">
                            <img
                              className=""
                              src={`${process.env.REACT_APP_API_URL}${user.user_img}`}
                              alt=""
                            />
                          </div>
                          <p>{user.name}</p>
                        </>
                      </Link>
                      <p
                        onClick={() => handleUnfollow(user._id, id)}
                        className="unfollowFollow"
                      >
                        Unfollow
                      </p>
                    </div>
                  ))}
                </div>
                <p className="followedUsers">Your Followers</p>
                {user.followers.map((userf) => (
                  <div className="user">
                    <Link className="userImg-name" to={`/user/${userf._id}`}>
                      <>
                        <div className="divImg1">
                          <img
                            className=""
                            src={`${process.env.REACT_APP_API_URL}${userf.user_img}`}
                            alt=""
                          />
                        </div>
                        <p>{userf.name}</p>
                      </>
                    </Link>
                    {user.following.length === 0 ? (
                      <p
                        onClick={() => handleFollow(userf._id, id)}
                        className="unfollowFollow"
                      >
                        Follow
                      </p>
                    ) : user.following.some(
                        (userfo) => userfo._id === userf._id
                      ) === true ? (
                      <p
                        onClick={() => handleUnfollow(userf._id, id)}
                        className="unfollowFollow"
                      >
                        Following
                      </p>
                    ) : (
                      <p
                        onClick={() => handleFollow(userf._id, id)}
                        className="unfollowFollow"
                      >
                        Follow
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="center">
              <div className="spinner"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;

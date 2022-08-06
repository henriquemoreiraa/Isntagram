import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import { Context } from "../../context/AuthContext";
import api from "../../api";
import { PostsType, User } from "../home/types";
import AllPosts from "../../components/allPosts/AllPosts";
import "./user.css";
import {
  IoGridOutline,
  IoIdCardOutline,
  IoPaperPlaneOutline,
} from "react-icons/io5";

function UserProfile() {
  const [userProfileData, setUserProfileData] = useState<User>();
  const [posts, setPosts] = useState<PostsType>([]);
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const {
    user,
    authenticated,
    commentPost,
    like,
    handleUnfollow,
    handleFollow,
    followUnfUser,
  } = useContext(Context);

  useEffect(() => {
    if (authenticated) {
      (async () => {
        const { data } = await api.get(`/users/user/${id}`);

        setUserProfileData(data);
      })();

      (async () => {
        const { data } = await api.get(`/posts/user/${id}`);

        setPosts(data);
      })();
    }
  }, [authenticated, commentPost, like, followUnfUser]);

  const getPosts = async (url: string) => {
    const { data } = await api.get(`${url}${id}`);

    setPosts(data);
  };

  return (
    <div className="container">
      <Header user={user} page={"user"} />

      <div className="userProfile">
        {userProfileData ? (
          <div className="userInfo">
            <div className="userImgDiv">
              <img
                className="userImg5"
                src={`${process.env.REACT_APP_API_URL}${userProfileData?.user_img.key}`}
                alt=""
              />
            </div>
            <div className="userInfo2">
              <div className="name-Followbtn">
                <h2>{userProfileData?.name}</h2>
                {user?.following.length === 0 ? (
                  <button
                    onClick={() => handleFollow(userProfileData._id, userId)}
                  >
                    Follow
                  </button>
                ) : userProfileData?.followers.some(
                    (userfo: any) => userfo.user_id === userId
                  ) === true ? (
                  <button
                    onClick={() => handleUnfollow(userProfileData._id, userId)}
                  >
                    Following
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollow(userProfileData._id, userId)}
                  >
                    Follow
                  </button>
                )}
              </div>

              <div className="followersFollowing">
                <p>
                  <strong>{posts.length}</strong>posts
                </p>
                <p>
                  <strong>{userProfileData?.followers.length}</strong>followers
                </p>
                <p>
                  <strong>{userProfileData?.following.length}</strong>following
                </p>
              </div>

              <div>
                <p>{userProfileData?.bio}</p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="followersFollowing followersFollowingCel">
          <p>
            <strong>{posts.length}</strong>posts
          </p>
          <p>
            <strong>{userProfileData?.followers.length}</strong>followes
          </p>
          <p>
            <strong>{userProfileData?.following.length}</strong>following
          </p>
        </div>

        <div className="postsfilters">
          <div
            onClick={() => getPosts("/posts/user/")}
            className="filteroptions"
          >
            {<IoGridOutline size={"1.5em"} />}
            <p>POSTS</p>
          </div>
          <div
            onClick={() => getPosts("/posts/user/tagged/")}
            className="filteroptions"
          >
            {<IoIdCardOutline size={"1.5em"} />}
            <p>TAGGED</p>
          </div>
          <div
            onClick={() => getPosts("/posts/user/shared/")}
            className="filteroptions"
          >
            {<IoPaperPlaneOutline size={"1.5em"} />}
            <p>SHARED</p>
          </div>
        </div>
        {posts ? <AllPosts user={user} posts={posts} /> : ""}
      </div>
    </div>
  );
}

export default UserProfile;

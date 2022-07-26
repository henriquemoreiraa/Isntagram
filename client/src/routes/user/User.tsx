import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import { Context } from "../../context/Context";
import api from "../../api";
import { PostsType, User, Users } from "../home/types";
import AllPosts from "../../components/allPosts/AllPosts";
import FollowingFollowers from "../../components/followingFollowers/FollowingFollowers";
import EditProfile from "../../components/editProfile/EditProfile";
import "./user.css";
import {
  IoGridOutline,
  IoIdCardOutline,
  IoPaperPlaneOutline,
} from "react-icons/io5";

function UserProfile() {
  const [userProfileData, setUserProfileData] = useState<User>();
  const [posts, setPosts] = useState<PostsType>([]);
  const [user, setUser] = useState<User>();
  const [userFol, setUserFol] = useState(false);
  const [folUsers, setFolUsers] = useState<Users>([]);
  const [isFolwedWers, setIsFolwedWers] = useState("");
  const [editProfile, setEditProfile] = useState(false);
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const { authenticated, handleUnfollow, handleFollow, updateData } =
    useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (id === "62f121e7acbf1d857de14254") {
      navigate("/");
      return;
    }

    if (authenticated) {
      (async () => {
        const { data } = await api.get(`/users/user/${id}`);

        setUserProfileData(data);
      })();

      (async () => {
        const { data } = await api.get(`/posts/user/${id}`);

        setPosts(data);
      })();

      (async () => {
        const { data } = await api.get(`/users/user/${userId}`);

        setUser(data);
      })();
    }
  }, [authenticated, updateData]);

  const getPosts = async (url: string) => {
    const { data } = await api.get(`${url}${id}`);

    setPosts(data);
  };

  return (
    <div className="container">
      <Header user={user} page={"user"} />
      {userFol && (
        <FollowingFollowers
          userFol={userFol}
          setUserFol={setUserFol}
          folUsers={folUsers}
          user={userProfileData?.name}
          isFolwedWers={isFolwedWers}
        />
      )}
      {editProfile && (
        <EditProfile setEditProfile={setEditProfile} user={user} />
      )}
      <div className="userProfile">
        {userProfileData ? (
          <div className="userInfo">
            <div className="userImgDiv">
              <img
                className="userImg5"
                src={`${process.env.REACT_APP_API_URL}${userProfileData?.user_img}`}
                alt=""
              />
            </div>
            <div className="userInfo2">
              <div className="name-Followbtn">
                <h2>{userProfileData?.name}</h2>
                {id === userId ? (
                  <button onClick={() => setEditProfile(true)}>
                    Edit Profile
                  </button>
                ) : user?.following.length === 0 ? (
                  <button
                    onClick={() => handleFollow(userProfileData._id, userId)}
                  >
                    Follow
                  </button>
                ) : userProfileData?.followers.some(
                    (userfo: any) => userfo._id === userId
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
                <p
                  onClick={() => (
                    setUserFol(true),
                    setFolUsers(userProfileData.followers),
                    setIsFolwedWers("followers")
                  )}
                >
                  <strong>{userProfileData?.followers.length}</strong>followers
                </p>
                <p
                  onClick={() => (
                    setUserFol(true),
                    setFolUsers(userProfileData.following),
                    setIsFolwedWers("followed")
                  )}
                >
                  <strong>{userProfileData?.following.length}</strong>following
                </p>
              </div>

              <div>
                <p>{userProfileData?.bio}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="center">
            <div className="spinner"></div>
          </div>
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
            onClick={() => getPosts("/posts/user/shared/")}
            className="filteroptions"
          >
            {<IoPaperPlaneOutline size={"1.5em"} />}
            <p>SHARED</p>
          </div>
        </div>
        {posts ? <AllPosts posts={posts} user={user} /> : ""}
      </div>
    </div>
  );
}

export default UserProfile;

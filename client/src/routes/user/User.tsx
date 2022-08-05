import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import { Context } from "../../context/AuthContext";
import api from "../../api";
import { PostsType, User } from "../home/types";
import AllPosts from "../../components/allPosts/AllPosts";

function UserProfile() {
  const [userProfileData, setUserProfileData] = useState<User>();
  const [posts, setPosts] = useState<PostsType>([]);
  const { id } = useParams();
  const { user, authenticated, commentPost, like } = useContext(Context);

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
  }, [authenticated, commentPost, like]);

  return (
    <div className="container">
      <Header user={user} page={"user"} />

      <div>
        {userProfileData ? (
          <div>
            <div>
              <img
                src={`${process.env.REACT_APP_API_URL}${userProfileData?.user_img.key}`}
                alt=""
              />
            </div>

            <div>
              <div>
                <h2>{userProfileData?.name}</h2>

                <button>Follow</button>
              </div>

              <div>
                <p>
                  <strong>{userProfileData?.followers.length}</strong>followes
                </p>
                <p>
                  <strong>{userProfileData?.following.length}</strong>following
                </p>
              </div>

              <div>
                <p>{userProfileData?.bio}</p>

                <p>Followed by...</p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div>
          <p>POSTS</p>
          <p>SHARES</p>
          <p>TAGGED</p>
        </div>

        {posts ? <AllPosts user={user} posts={posts} /> : ""}
      </div>
    </div>
  );
}

export default UserProfile;

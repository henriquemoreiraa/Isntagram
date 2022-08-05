import { useState, useEffect, useContext } from "react";
import api from "../../api";
import { PostsType, User } from "../home/types";
import { Context } from "../../context/AuthContext";
import AllPosts from "../../components/allPosts/AllPosts";
import Header from "../../components/header/Header";

function Explore() {
  const [posts, setPosts] = useState<PostsType>([]);
  // const [user, setUser] = useState<User>()
  const { authenticated, commentPost, like, user } = useContext(Context);
  const id = localStorage.getItem("userId");

  useEffect(() => {
    if (authenticated) {
      (async () => {
        const { data } = await api.get(`/posts/`);
        setPosts(data);
      })();
    }
  }, [authenticated, commentPost, like]);

  return (
    <div className="container">
      <Header user={user} page={"explore"} />

      <AllPosts user={user} posts={posts} />
    </div>
  );
}

export default Explore;

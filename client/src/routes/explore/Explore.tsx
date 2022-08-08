import { useState, useEffect, useContext } from "react";
import api from "../../api";
import { PostsType, User } from "../home/types";
import { Context } from "../../context/Context";
import AllPosts from "../../components/allPosts/AllPosts";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";

function Explore() {
  const [posts, setPosts] = useState<PostsType>([]);
  const [user, setUser] = useState<User>();
  const { authenticated, updateData } = useContext(Context);
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
      return;
    }

    if (authenticated) {
      (async () => {
        const { data } = await api.get(`/posts/`);
        setPosts(data);
      })();

      (async () => {
        const { data } = await api.get(`/users/user/${id}`);

        setUser(data);
      })();
    }
  }, [authenticated, updateData]);

  return (
    <div className="container">
      <Header user={user} page={"explore"} />

      <AllPosts posts={posts} user={user} />
    </div>
  );
}

export default Explore;

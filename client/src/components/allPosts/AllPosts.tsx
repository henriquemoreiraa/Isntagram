import { useState, useContext } from "react";
import { PostsType, User } from "../../routes/home/types";
import "./allPosts.css";
import Post from "../posts/Post";
import { Context } from "../../context/AuthContext";

type Props = {
  posts: PostsType;
  user: User | undefined;
};

function AllPosts({ posts, user }: Props) {
  const [singlePost, setSinglePost] = useState(false);
  const [postId, setPostId] = useState("");

  const {
    followUnfUser,
    authenticated,
    handleLike,
    removeLike,
    commentPost,
    setCommentPost,
    setLike,
    like,
  } = useContext(Context);

  return (
    <div className="allPostsImgs">
      {singlePost && (
        <Post
          postId={postId}
          posts={posts}
          user={user}
          page={"explore"}
          setSinglePost={setSinglePost}
          commentPost={commentPost}
          setCommentPost={setCommentPost}
          like={like}
          setLike={setLike}
          handleLike={handleLike}
          removeLike={removeLike}
        />
      )}

      {posts
        ? posts.map((post) => (
            <div
              onClick={() => (setSinglePost(true), setPostId(post._id))}
              className="allPostsImgsDiv"
            >
              <img
                src={`${process.env.REACT_APP_API_URL}${post.post_img.key}`}
                alt=""
              />
            </div>
          ))
        : ""}
    </div>
  );
}

export default AllPosts;

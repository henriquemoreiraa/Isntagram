import { useState, useContext } from "react";
import { PostsType, User } from "../../routes/home/types";
import "./allPosts.css";
import Post from "../posts/Post";
import { Context } from "../../context/Context";

type Props = {
  posts: PostsType;
};

function AllPosts({ posts }: Props) {
  const [singlePost, setSinglePost] = useState(false);
  const [postId, setPostId] = useState("");

  return (
    <div className="allPostsImgs">
      {singlePost && (
        <Post postId={postId} posts={posts} setSinglePost={setSinglePost} />
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

import { Comments, PostsType, User } from "../../routes/home/types";
import {
  IoEllipsisHorizontalSharp,
  IoHeartOutline,
  IoHeartSharp,
  IoChatbubbleOutline,
  IoPaperPlaneOutline,
  IoPaperPlaneSharp,
} from "react-icons/io5";
import { useEffect, useState, useContext } from "react";
import Post from "./Post";
import api from "../../api";
import { Context } from "../../context/Context";
import Comment from "../comment/Comment";
import { Link } from "react-router-dom";

type Props = {
  user: User | undefined;
  page: string;
};

function Posts({ user }: Props) {
  const [posts, setPosts] = useState<PostsType>();
  const [comments, setComments] = useState<Comments>([]);
  const [singlePost, setSinglePost] = useState(false);
  const [postId, setPostId] = useState("");
  const userId = localStorage.getItem("userId");

  const {
    authenticated,
    handleLike,
    removeLike,
    updateData,
    handleShare,
    removeShare,
  } = useContext(Context);

  useEffect(() => {
    if (authenticated) {
      (async () => {
        const { data } = await api.get(`/posts/post/${userId}`);
        setPosts(data);
      })();
      (async () => {
        const { data } = await api.get(`/comments`);

        setComments(data);
      })();
    }
  }, [updateData]);

  return (
    <div>
      {singlePost && (
        <Post
          postId={postId}
          posts={posts}
          setSinglePost={setSinglePost}
          user={user}
        />
      )}
      {posts
        ? posts?.map((post) => (
            <div className="post">
              <div className="user">
                <Link className="userImg-name" to={`/user/${post.user._id}`}>
                  <>
                    <div className="divImg1">
                      <img
                        src={`${process.env.REACT_APP_API_URL}${post.user.user_img}`}
                        alt=""
                      />
                    </div>
                    <p>{post.user.name}</p>
                  </>
                </Link>
                {userId === post.user._id && (
                  <div>
                    <IoEllipsisHorizontalSharp size={"1.2em"} />
                  </div>
                )}
              </div>
              <div
                onClick={() => (setSinglePost(true), setPostId(post._id))}
                className="postImg"
              >
                <img
                  src={`${process.env.REACT_APP_API_URL}${post.post_img.key}`}
                  alt=""
                />
              </div>
              <div className="postTitle">
                <div className="postLikeCommShare">
                  <div>
                    {post.likes.length === 0 ? (
                      <IoHeartOutline
                        size={"1.9em"}
                        onClick={() =>
                          handleLike(post._id, userId, post.user._id)
                        }
                      />
                    ) : post?.likes.some(
                        (postLike) => postLike._id === userId
                      ) === true ? (
                      <IoHeartSharp
                        size={"1.9em"}
                        color={"e84040"}
                        onClick={() => removeLike(post._id, userId)}
                      />
                    ) : (
                      <IoHeartOutline
                        size={"1.9em"}
                        onClick={() =>
                          handleLike(post._id, userId, post.user._id)
                        }
                      />
                    )}
                  </div>
                  <div
                    onClick={() => (setSinglePost(true), setPostId(post._id))}
                  >
                    <IoChatbubbleOutline size={"1.8em"} />
                  </div>
                  <div>
                    {post.shares.length === 0 ? (
                      <IoPaperPlaneOutline
                        size={"1.8em"}
                        onClick={() =>
                          handleShare(post._id, userId, post.user._id)
                        }
                      />
                    ) : post.shares.some(
                        (postShare) => postShare._id === userId
                      ) === true ? (
                      <IoPaperPlaneSharp
                        color="212121"
                        size={"1.8em"}
                        onClick={() => removeShare(post._id, userId)}
                      />
                    ) : (
                      <IoPaperPlaneOutline
                        size={"1.8em"}
                        onClick={() =>
                          handleShare(post._id, userId, post.user._id)
                        }
                      />
                    )}
                  </div>
                </div>
                {post.likes.length > 0 && (
                  <div className="likes">
                    <IoHeartSharp color="e84040" />

                    <p>
                      Liked by{" "}
                      <strong>
                        <Link to={`/user/${post.likes[0]._id}`}>
                          {post.likes[0].name}
                        </Link>
                      </strong>
                      {post.likes.length > 1 &&
                        `and ${post.likes.length - 1} more 
                        ${post.likes.length - 1 > 1 ? "users" : "user"}`}
                    </p>
                  </div>
                )}

                <p>
                  <strong>
                    <Link to={`/user/${post.user._id}`}>{post.user.name}</Link>
                  </strong>
                  {post.title}
                </p>

                {comments.some((comm) => comm.post === post._id) === true ? (
                  <>
                    <p
                      className="viewComments"
                      onClick={() => (setSinglePost(true), setPostId(post._id))}
                    >
                      View all comments
                    </p>
                    {comments.map(
                      (comm) =>
                        comm.user._id === userId && (
                          <p>
                            <strong>{comm.user.name}</strong>
                            {comm.comment}
                          </p>
                        )
                    )}
                  </>
                ) : (
                  ""
                )}

                <p className="postDate">
                  {new Date(post.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <Comment
                postId={post._id}
                postUser={post.user._id}
                userName={user?.name}
                userImg={user?.user_img}
                userId={user?._id}
              />
            </div>
          ))
        : "ssdsfsdfs"}
    </div>
  );
}

export default Posts;

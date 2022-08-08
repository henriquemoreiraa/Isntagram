import { useEffect, useState, useContext } from "react";
import { PostsType, User } from "../../routes/home/types";
import "./post.css";
import {
  IoEllipsisHorizontalSharp,
  IoClose,
  IoHeartOutline,
  IoHeartSharp,
  IoPaperPlaneOutline,
} from "react-icons/io5";
import { BsDot } from "react-icons/bs";
import { Context } from "../../context/Context";
import Comment from "../comment/Comment";
import api from "../../api";
import { Link } from "react-router-dom";
import Delete from "../delete/Delete";

type Props = {
  postId: string;
  posts: PostsType | undefined;
  setSinglePost: (e: boolean) => void;
};

function Post({ postId, posts, setSinglePost }: Props) {
  const [post, setPost] = useState<PostsType>();
  const [deleteP, setDeleteP] = useState(false);
  const [deletePdata, setDeletePdata] = useState({ id: "", url: "" });
  const id = localStorage.getItem("userId");
  const { handleFollow, handleUnfollow, sendNotification } =
    useContext(Context);
  const { handleLike, removeLike, updateData, setUpdateData, user } =
    useContext(Context);

  useEffect(() => {
    const filterPost = posts?.filter((post) => post._id === postId);
    setPost(filterPost);
  }, [posts]);

  const commentHandleLike = async (
    commentId: string,
    userId: string | null,
    postUserId: string
  ) => {
    await api.put(`/comments/like/${commentId}`, {
      id: userId,
    });
    setUpdateData(!updateData);
    sendNotification(
      postUserId,
      user?.name,
      user?.user_img,
      user?._id,
      "liked your comment"
    );
  };

  const commentRemoveLike = async (
    commentId: string,
    userId: string | null
  ) => {
    await api.put(`/comments/removeLike/${commentId}`, {
      id: userId,
    });
    setUpdateData(!updateData);
  };

  return (
    <div className="singlePostContainer">
      <div className="closePost" onClick={() => setSinglePost(false)}>
        <IoClose size={"1.7em"} color={"fff"} />
      </div>
      {deleteP && post && (
        <Delete setDeleteP={setDeleteP} deletePdata={deletePdata} />
      )}
      {post
        ? post.map((post) => (
            <div className="singlePostDiv">
              <div className="imgDiv3 imgSinglePostDiv">
                <img
                  src={`${process.env.REACT_APP_API_URL}${post.post_img.key}`}
                  alt=""
                />
              </div>
              <div className="testq">
                <div className="commentsDiv">
                  <div className="user uimgName-comment">
                    <div className="userImg-name">
                      <div className="divImg1">
                        <Link to={`/user/${post.user._id}`}>
                          <img
                            className=""
                            src={`${process.env.REACT_APP_API_URL}${post.user.user_img}`}
                            alt=""
                          />
                        </Link>
                      </div>
                      <p>
                        <Link to={`/user/${post.user._id}`}>
                          {post.user.name}
                        </Link>
                      </p>
                      <>
                        <BsDot size={"1.3em"} />
                        {user?._id === post.user._id ? (
                          "You"
                        ) : user?.following.length === 0 ? (
                          <p
                            onClick={() => handleFollow(post.user._id, id)}
                            className="unfollowFollow"
                          >
                            Follow
                          </p>
                        ) : user?.following.some(
                            (userfo: User) => userfo._id === post.user._id
                          ) === true ? (
                          <p
                            onClick={() => handleUnfollow(post.user._id, id)}
                            className="unfollowFollow"
                          >
                            Following
                          </p>
                        ) : (
                          <p
                            onClick={() => handleFollow(post.user._id, id)}
                            className="unfollowFollow"
                          >
                            Follow
                          </p>
                        )}
                      </>
                    </div>

                    {id === post.user._id && (
                      <div
                        onClick={() => (
                          setDeleteP(true),
                          setDeletePdata({ id: post._id, url: "/posts" })
                        )}
                      >
                        <IoEllipsisHorizontalSharp
                          className="dots"
                          size={"1.2em"}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="comments">
                  {/* <div></div> */}
                  <div className="userTitleComments">
                    <div className="userImg-name postUser">
                      <div className="divImg4">
                        <a href={`/user/${post.user._id}`}>
                          <img
                            src={`${process.env.REACT_APP_API_URL}${post.user.user_img}`}
                            alt=""
                          />
                        </a>
                      </div>
                      <p>
                        <strong>
                          <Link to={`/user/${post.user._id}`}>
                            {post.user.name}
                          </Link>
                        </strong>
                        {post.title}
                      </p>
                    </div>
                    {/* {post.comments.map((comment) => (
                      <div className="testeeeeeeeeee">
                        <div className="divCommentsOptions">
                          <div className="userImg-name">
                            <div className="divImg4">
                              <Link to={`/user/${comment.user._id}`}>
                                <img
                                  src={`${process.env.REACT_APP_API_URL}${comment.user.user_img}`}
                                  alt=""
                                />
                              </Link>
                            </div>
                            <p>
                              <strong>
                                <Link to={`/user/${comment.user._id}`}>
                                  {comment.user.name}
                                </Link>
                              </strong>
                              {comment.comment}
                            </p>
                          </div>
                          <div className="commentsOptions">
                            <p className="postDate">
                              {new Date(comment.createdAt).toLocaleString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                            {comment.user._id === id && (
                              <IoEllipsisHorizontalSharp
                                onClick={() => (
                                  setDeleteP(true),
                                  setDeletePdata({
                                    id: comment._id,
                                    url: "/comments",
                                  })
                                )}
                                className="dots"
                                color="474747"
                              />
                            )}
                            <p className="commentLikes">
                              {comment.likes.length >= 1 &&
                                `${comment.likes.length}
                                            ${
                                              comment.likes.length > 1
                                                ? "likes"
                                                : "like"
                                            }`}
                            </p>
                          </div>
                        </div>

                        <div className="heartComments">
                          {comment.likes.length === 0 ? (
                            <IoHeartOutline
                              onClick={() =>
                                commentHandleLike(
                                  comment._id,
                                  id,
                                  comment.user._id
                                )
                              }
                            />
                          ) : user ? (
                            comment.likes.indexOf(user._id) === -1 ? (
                              <IoHeartOutline
                                onClick={() =>
                                  commentHandleLike(
                                    comment._id,
                                    id,
                                    comment.user._id
                                  )
                                }
                              />
                            ) : (
                              <IoHeartSharp
                                color={"e84040"}
                                onClick={() =>
                                  commentRemoveLike(comment._id, id)
                                }
                              />
                            )
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ))} */}
                  </div>
                  <div className="postLikeComment SinglePostplc">
                    <div className="postTitle">
                      <div className="postLikeCommShare">
                        <div>
                          {post.likes.length === 0 ? (
                            <IoHeartOutline
                              size={"1.9em"}
                              onClick={() =>
                                handleLike(post._id, id, post.user._id)
                              }
                            />
                          ) : post?.likes.some(
                              (postLike) => postLike._id === id
                            ) === true ? (
                            <IoHeartSharp
                              size={"1.9em"}
                              color={"e84040"}
                              onClick={() => removeLike(post._id, id)}
                            />
                          ) : (
                            <IoHeartOutline
                              size={"1.9em"}
                              onClick={() =>
                                handleLike(post._id, id, post.user._id)
                              }
                            />
                          )}
                        </div>
                        <div>
                          <IoPaperPlaneOutline size={"1.8em"} />
                        </div>
                      </div>
                      {post.likes.length > 0 && (
                        <div className="likes">
                          <IoHeartSharp color="e84040" />

                          <p>
                            Liked by <strong>{post.likes[0].name}</strong>
                            {post.likes.length > 1 &&
                              `and ${post.likes.length - 1} more 
                        ${post.likes.length - 1 > 1 ? "users" : "user"}`}
                          </p>
                        </div>
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
                      userImg={user?.user_img.key}
                      userId={user?._id}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
}

export default Post;

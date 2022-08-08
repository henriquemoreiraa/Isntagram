import { useState, useContext } from "react";
import "./comment.css";
import api from "../../api";
import { Context } from "../../context/AuthContext";

type Props = {
  postId: string;
  commentPost: boolean;
  setCommentPost: (e: boolean) => void;
  postUser: string;
  userName: string | undefined;
  userImg: string | undefined;
  userId: string | undefined;
};

function Comment({
  postId,
  commentPost,
  setCommentPost,
  postUser,
  userName,
  userImg,
  userId,
}: Props) {
  const [comment, setComment] = useState("");
  const id = localStorage.getItem("userId");
  const { sendNotification } = useContext(Context);

  const handleComment = async () => {
    await api.post(`/comments/post/${postId}`, {
      id,
      comment,
    });
    setCommentPost(!commentPost);
    setComment("");
    sendNotification(
      postUser,
      userName,
      userImg,
      userId,
      "commented your post"
    );
  };

  return (
    <>
      <div className="commentInputDiv">
        <input
          className="commentInput"
          placeholder="Add a comment..."
          type="text"
          id="comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {comment.length < 1 ? (
          <button
            onClick={handleComment}
            type="submit"
            className="commentBtn"
            disabled
          >
            {" "}
            Post{" "}
          </button>
        ) : (
          <button onClick={handleComment} type="submit" className="commentBtn">
            {" "}
            Post{" "}
          </button>
        )}
      </div>
    </>
  );
}

export default Comment;

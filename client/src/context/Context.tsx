import { createContext, useState, useEffect, ReactNode } from "react";
import api from "../api";
import { User } from "../routes/home/types";
import { UserForm } from "../routes/loginRegister/types";
import io from "socket.io-client";
const url = `${process.env.REACT_APP_API_URL}` || "http://localhost:5000";
const socket = io(url);

const Context = createContext<any | undefined>(undefined);

type FormProviderProps = {
  children: ReactNode;
};

function Contexts({ children }: FormProviderProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [userForm, setUserForm] = useState<UserForm>({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [user, setUser] = useState<User>();
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
        token
      )}`;
      setAuthenticated(true);

      (async () => {
        const { data } = await api.get(`/users/user/${id}`);

        setUser(data);
      })();
    }
  }, [updateData, authenticated]);

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(undefined);
  };

  const handleUnfollow = async (unfollowedId: string, unfollowerId: string) => {
    await api.put(`/users/unfollow/${unfollowedId}`, {
      id: unfollowerId,
    });
    setUpdateData(!updateData);
  };

  const handleFollow = async (followedId: string, followerId: string) => {
    await api.put(`/users/follow/${followedId}`, {
      id: followerId,
    });
    setUpdateData(!updateData);
    sendNotification(
      followedId,
      user?.name,
      user?.user_img,
      user?._id,
      "started following you"
    );
  };

  const handleLike = async (
    postId: string,
    userId: string | null,
    postUserId: string
  ) => {
    await api.put(`/posts/like/${postId}`, {
      id: userId,
    });
    setUpdateData(!updateData);
    sendNotification(
      postUserId,
      user?.name,
      user?.user_img,
      user?._id,
      "liked your post"
    );
  };

  const removeLike = async (postId: string, userId: string | null) => {
    await api.put(`/posts/removeLike/${postId}`, {
      id: userId,
    });
    setUpdateData(!updateData);
  };

  const sendNotification = (
    postUserId: string,
    userName: string | undefined,
    userImg: string | undefined,
    userId: string | undefined,
    message: string
  ) => {
    if (user?._id !== postUserId) {
      socket.emit("notification", postUserId);
      socket.emit("notification_send", {
        id: postUserId,
        userName,
        userImg,
        userId,
        message,
      });
    }
  };

  return (
    <Context.Provider
      value={{
        userForm,
        setUserForm,
        authenticated,
        setAuthenticated,
        handleLogout,
        handleUnfollow,
        handleFollow,
        updateData,
        handleLike,
        removeLike,
        sendNotification,
        user,
        setUpdateData,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, Contexts };

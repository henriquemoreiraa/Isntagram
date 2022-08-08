import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import api from "../../api";
import { Link } from "react-router-dom";
import { Users } from "../../routes/home/types";

type Props = {
  setNotification: (e: boolean) => void;
};

type User = {
  name: string;
  user_img: string;
  _id: string;
};

type Notifications = {
  user: string;
  message: string;
  userId: User;
}[];

function Notifications({ setNotification }: Props) {
  const [notifications, setNotifications] = useState<Notifications>([]);
  const id = localStorage.getItem("userId");

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/users/user/notification/${id}`);

      setNotifications(data);
    })();
  }, []);

  return (
    <div className="singlePostContainer">
      <div className="closePost" onClick={() => setNotification(false)}>
        <IoClose size={"1.7em"} color={"fff"} />
      </div>
      {notifications ? (
        <div className="notificationsDiv">
          {notifications.map((not) => (
            <Link
              key={not.userId._id}
              to={`/user/${not.userId._id}`}
              className="userImg-name2"
            >
              <div className="divImg1">
                <img
                  src={`${process.env.REACT_APP_API_URL}${not.userId.user_img}`}
                  alt=""
                />
              </div>
              <p>
                <strong>{not.userId.name}</strong>
              </p>
              <p>{not?.message}</p>
            </Link>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Notifications;

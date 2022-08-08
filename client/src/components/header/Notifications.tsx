import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import api from "../../api";
import { Link } from "react-router-dom";

type Props = {
  setNotification: (e: boolean) => void;
};

type Notifications = {
  user: string;
  userName: string;
  userImg: string;
  message: string;
  userId: string;
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
            <Link to={`/user/${not.userId}`} className="userImg-name2">
              <div className="divImg1">
                <img
                  src={`${process.env.REACT_APP_API_URL}${not?.userImg}`}
                  alt=""
                />
              </div>
              <p>
                <strong>{not?.userName}</strong>
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

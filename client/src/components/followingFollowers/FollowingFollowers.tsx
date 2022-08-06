import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FollowersFollowing } from "../../routes/home/types";
import "./folwingWers.css";

type Props = {
  userFol: boolean;
  setUserFol: (e: boolean) => void;
  folUsers: FollowersFollowing;
  user: string | undefined;
  isFolwedWers: string;
};

function FollowingFollowers({
  setUserFol,
  folUsers,
  user,
  isFolwedWers,
}: Props) {
  return (
    <div className="singlePostContainer">
      <div className="closePost" onClick={() => setUserFol(false)}>
        <IoClose size={"1.7em"} color={"fff"} />
      </div>
      <div className="folDiv">
        <div className="userFolwingWed">
          <h3>{`${user} ${isFolwedWers} users`}</h3>
        </div>
        {folUsers.map((user) => (
          <div className="user">
            <a className="userImg-name" href={`/user/${user.user_id}`}>
              <div className="divImg1">
                <img
                  src={`${process.env.REACT_APP_API_URL}${user.user_img}`}
                  alt=""
                />
              </div>
              <p>{user.name}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FollowingFollowers;

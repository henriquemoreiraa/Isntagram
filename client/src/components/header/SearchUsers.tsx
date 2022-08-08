import React, { useEffect, useState, useContext } from "react";
import { IoClose } from "react-icons/io5";
import api from "../../api";
import { Context } from "../../context/Context";
import { Users } from "../../routes/home/types";

type Props = {
  setSearch: (e: boolean) => void;
  user: any;
};

function SearchUsers({ setSearch, user }: Props) {
  const [users, setUsers] = useState<Users>([]);
  const [searchUser, setSearchUser] = useState("");
  const { handleFollow, handleUnfollow, followUnfUser } = useContext(Context);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/users");

      setUsers(data);
    })();
  }, [followUnfUser]);

  const filteredUsers =
    searchUser.length > 0
      ? users.filter((user) =>
          user.name.toLowerCase().includes(searchUser.toLowerCase())
        )
      : [];

  return (
    <div className="singlePostContainer">
      <div className="closePost" onClick={() => setSearch(false)}>
        <IoClose size={"1.7em"} color={"fff"} />
      </div>
      <div className="searchUsersDiv">
        <div className="searchInput">
          <input
            type="text"
            name="search"
            onChange={(e) => setSearchUser(e.target.value)}
            value={searchUser}
            placeholder="Search for a user"
            autoFocus
          />
        </div>
        <div>
          {searchUser.length > 0
            ? filteredUsers.map((userS) => (
                <div className="user">
                  <a className="userImg-name" href={`/user/${userS._id}`}>
                    <div className="divImg1">
                      <img
                        src={`${process.env.REACT_APP_API_URL}${userS.user_img}`}
                        alt=""
                      />
                    </div>
                    <p>{userS.name}</p>
                  </a>
                  {user?._id === userS._id ? (
                    "You"
                  ) : user?.following.length === 0 ? (
                    <p
                      onClick={() => handleFollow(userS._id, user._id)}
                      className="unfollowFollow"
                    >
                      Follow
                    </p>
                  ) : user?.following.some(
                      (userfo: any) => userfo.user_id === userS._id
                    ) === true ? (
                    <p
                      onClick={() => handleUnfollow(userS._id, user._id)}
                      className="unfollowFollow"
                    >
                      Following
                    </p>
                  ) : (
                    <p
                      onClick={() => handleFollow(userS._id, user._id)}
                      className="unfollowFollow"
                    >
                      Follow
                    </p>
                  )}
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default SearchUsers;

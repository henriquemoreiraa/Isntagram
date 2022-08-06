import { useState, useContext } from "react";
import { IoClose } from "react-icons/io5";
import api from "../../api";
import "./editProfile.css";
import { Context } from "../../context/AuthContext";

type Props = {
  setEditProfile: (e: boolean) => void;
  user: any;
};

type UserData = {
  name: string;
  email: string;
  bio: string;
  oldPassword: string;
  newPassword: string;
  confirNewPass: string;
};

function EditProfile({ setEditProfile, user }: Props) {
  const [file, setFile] = useState<any>();
  const [changePass, setChangePass] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: user.name,
    email: user.email,
    bio: user.bio,
    oldPassword: "",
    newPassword: "",
    confirNewPass: "",
  });

  const { setUploadData, uploadData, handleLogout } = useContext(Context);

  function handleChange(e: any) {
    setFile(e.target.files[0]);
  }

  function handleSubmitPhoto(e: any) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    api.put(`/users/img/${user._id}`, formData, config).then((response) => {
      console.log(response.data);
      setUploadData(!uploadData);
      setFile(undefined);
    });
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    if (userData.newPassword) {
      if (userData.newPassword !== userData.confirNewPass) {
        alert("Passwords don't match!");
      } else {
        api
          .put(`/users/${user._id}`, {
            name: userData.name,
            email: userData.email,
            bio: userData.bio,
            password: userData.newPassword,
          })
          .then((response) => {
            console.log(response.data);
            setUploadData(!uploadData);
          });
      }
    } else {
      api
        .put(`/users/${user._id}`, {
          name: userData.name,
          email: userData.email,
          bio: userData.bio,
        })
        .then((response) => {
          console.log(response.data);
          setUploadData(!uploadData);
        });
    }
  }

  return (
    <div className="singlePostContainer">
      <div className="closePost" onClick={() => setEditProfile(false)}>
        <IoClose size={"1.7em"} color={"fff"} />
      </div>
      <div className="editProfileDiv">
        <div className="editContainer">
          <div className="userImg-name1">
            <div className="divImg3">
              <img
                src={`${process.env.REACT_APP_API_URL}${user.user_img.key}`}
                alt=""
              />
            </div>
            <div className="nameChangeProfPhoto">
              <h3>{user.name}</h3>
              <form onSubmit={handleSubmitPhoto}>
                {!file ? (
                  <label htmlFor="file">Change profile photo</label>
                ) : (
                  <label>{file.name}</label>
                )}
                <input
                  type="file"
                  name="file"
                  id="file"
                  accept="image/*"
                  onChange={handleChange}
                />
                {file && (
                  <button className="uploadImg" type="submit">
                    Upload
                  </button>
                )}
              </form>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="formUserData">
            <div>
              <span className="spans">Name </span>
              <input
                className="name"
                id="name"
                name="name"
                placeholder="Name"
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prevState: UserData) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <span className="spans">Email </span>
              <input
                className="email"
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData((prevState: UserData) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <span className="spans">Bio</span>
              <textarea
                className="email"
                id="bio"
                name="bio"
                placeholder="Bio"
                value={userData.bio}
                rows={4}
                onChange={(e) =>
                  setUserData((prevState: UserData) => ({
                    ...prevState,
                    bio: e.target.value,
                  }))
                }
              ></textarea>
            </div>
            {!changePass && (
              <p onClick={() => setChangePass(true)} className="changePass">
                Change password?
              </p>
            )}
            {changePass && (
              <>
                <div>
                  <span className="spans">New password</span>
                  <input
                    className="password"
                    name="password"
                    placeholder="New password"
                    type="password"
                    value={userData.newPassword}
                    onChange={(e) =>
                      setUserData((prevState: UserData) => ({
                        ...prevState,
                        newPassword: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <span className="spans">Confirm password</span>
                  <input
                    className="password"
                    name="password"
                    placeholder="Confirm password"
                    type="password"
                    value={userData.confirNewPass}
                    onChange={(e) =>
                      setUserData((prevState: UserData) => ({
                        ...prevState,
                        confirNewPass: e.target.value,
                      }))
                    }
                  />
                </div>
              </>
            )}
            <div className="btnSubmitDiv">
              <button type="submit">SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;

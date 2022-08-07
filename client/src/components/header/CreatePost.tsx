import { useState, useEffect, useContext } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { Context } from "../../context/AuthContext";

type Props = {
  setCreatePost: (e: boolean) => void;
  user: any;
};

type UserData = {
  id: string;
  title: string;
};

function CreatePost({ setCreatePost, user }: Props) {
  const [file, setFile] = useState<any>();
  const [preview, setPreview] = useState<string | undefined>();
  const [userData, setUserData] = useState<UserData>({
    id: user._id,
    title: "",
  });
  const { setUploadData, uploadData } = useContext(Context);

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append("title", userData.title);
      formData.append("id", userData.id);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      api.post(`/posts/create`, formData, config).then((response) => {
        console.log(response.data);
        setFile(undefined);
        setCreatePost(false);
        setUploadData(!uploadData);
      });
    } else {
      alert("Add a photo!");
    }
  };

  return (
    <div className="singlePostContainer">
      <div className="closePost" onClick={() => setCreatePost(false)}>
        <IoClose className="close" size={"1.7em"} color={"fff"} />
      </div>
      <div className="createPostDiv">
        <div className="postDivContainer">
          <div className="nameChangeProfPhoto">
            <form onSubmit={handleSubmit} action={`/user/${user._id}`}>
              {!file ? (
                <label htmlFor="file" className="postImgInput">
                  Choose a photo
                </label>
              ) : (
                <div>
                  <label htmlFor="file" className="postImgInput">
                    Change photo
                  </label>
                </div>
              )}
              {file && (
                <div className="previewPostImg">
                  {" "}
                  <img src={preview} />
                </div>
              )}
              <div>
                <input
                  type="file"
                  name="file"
                  id="file"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
              <div>
                <textarea
                  cols={40}
                  rows={6}
                  className="title"
                  name="title"
                  placeholder="Write a caption..."
                  value={userData.title}
                  onChange={(e) =>
                    setUserData((prevState: UserData) => ({
                      ...prevState,
                      title: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
              <div className="btnSubmitDiv2">
                <button type="submit">SHARE</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;

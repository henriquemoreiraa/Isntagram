import { useContext } from "react";
import { IoClose } from "react-icons/io5";
import api from "../../api";
import { PostsType } from "../../routes/home/types";
import "./delete.css";
import { Context } from "../../context/Context";

type Props = {
  setDeleteP: (e: boolean) => void;
  deletePdata: { id: string; url: string };
};

function Delete({ setDeleteP, deletePdata }: Props) {
  const handleDelete = () => {
    api.delete(`${deletePdata.url}/${deletePdata.id}`);
    setUpdateData(!updateData);
    setDeleteP(false);
  };

  const { setUpdateData, updateData } = useContext(Context);

  return (
    <div className="singlePostContainer">
      <div className="closePost" onClick={() => setDeleteP(false)}>
        <IoClose className="close" size={"1.7em"} color={"fff"} />
      </div>
      <div className="deleteContainer">
        <p onClick={handleDelete} className="pDelete">
          Delete
        </p>
        <p onClick={() => setDeleteP(false)}>Cancel</p>
      </div>
    </div>
  );
}

export default Delete;

import axios from "axios";

const url =
  `${process.env.REACT_APP_API_URL}api` || "http://localhost:5000/api";

export default axios.create({
  baseURL: `${url}`,
});

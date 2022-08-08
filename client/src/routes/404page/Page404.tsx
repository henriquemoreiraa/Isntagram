import "./page404.css";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <div className="container">
      <div className="page404message">
        <h1>Sorry, this page isn't available.</h1>
        <p>
          The link you followed may be broken, or the page may have been
          removed.{" "}
          <Link to={"/"}>
            <span>Go back to Isn'tagram</span>
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default Page404;

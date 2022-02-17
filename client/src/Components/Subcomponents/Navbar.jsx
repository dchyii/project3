import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../App";
import axios from "axios";

export const PublicNavbarButtons = () => {
  return (
    <div id="publicButtons" className="w-1/2 xl:w-1/3 text-base">
      <div className="w-1/3 inline-block"></div>
      <div className="w-1/3 inline-block">
        <Link to="/signin">Sign In</Link>
      </div>
      <div className="w-1/3 inline-block">
        <Link to="signup">Sign Up</Link>
      </div>
    </div>
  );
};

export const LoggedInNavbarButtons = (props) => {
  const navigate = useNavigate();
  const [userContext, setUserContext] = useContext(DataContext);

  const handleSignout = async (e) => {
    e.preventDefault();
    axios({
      method: "delete",
      url: "/api/users",
    }).then(() => {
      localStorage.removeItem("userContext");
      setUserContext({
        userID: "",
        username: "",
        password: "",
        profilePhoto: "",
        isLoggedIn: false,
        isSuperAdmin: false,
      });
      navigate("/", { replace: false });
    });
  };

  return (
    <div id="publicButtons" className="w-1/2 xl:w-1/3 text-base">
      <div className="w-1/3 inline-block">
        <Link to={`/${props.userID}/posts/new`}>Post</Link>
      </div>
      <div className="w-1/3 inline-block">
        <Link to={`/${props.userID}/posts`}>{props.userID}</Link>
      </div>
      <div className="w-1/3 inline-block">
        {/* <Link to="/">Sign Out</Link> add form to destroy cookie */}
        <form onSubmit={handleSignout}>
          <input type="submit" value="Sign Out" />
        </form>
      </div>
    </div>
  );
};

export const NavbarButtons = () => {
  const [userContext, setUserContext] = useContext(DataContext);
  if (userContext.isLoggedIn) {
    return <LoggedInNavbarButtons userID={userContext.username} />;
  } else {
    return <PublicNavbarButtons />;
  }
};

function Navbar() {
  return (
    <div className="bg-gray-800 fixed w-full top-0 z-30">
      <nav>
        <div className="w-full md:w-10/12 h-9 mx-auto px-5 text-slate-100 flex justify-between items-center">
          <div id="logo" className="text-xl">
            <Link to="/">
              <div className="flex">
                <p>OTOF</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </Link>
          </div>
          <NavbarButtons />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

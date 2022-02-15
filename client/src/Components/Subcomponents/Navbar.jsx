import React, { useContext } from "react";
import { Link } from "react-router-dom";
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "/api/users/logout?method=DELETE",
    }).then((response) => {
      console.log(response);
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
        <form onSubmit={handleSubmit}>
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
            <Link to="/">Logo</Link>
          </div>
          <NavbarButtons />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

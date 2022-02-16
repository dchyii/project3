import React from "react";
import Avatar from "../Subcomponents/Avatar";
import UserPostDisplay from "../Subcomponents/UserPostDisplay";

const UserPosts = (props) => {
  return (
    <div>
      <Avatar />
      <UserPostDisplay photos={props.photos} />
    </div>
  );
};

export default UserPosts;

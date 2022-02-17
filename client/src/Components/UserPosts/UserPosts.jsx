import React from "react";
import Avatar from "../Subcomponents/Avatar";
import UserPostDisplay from "../Subcomponents/UserPostDisplay";
import { DataContext } from "../../App";

const UserPosts = (props) => {
  return (
    <div>
      <Avatar photos={props.photos} />
      <UserPostDisplay photos={props.photos} />
    </div>
  );
};

export default UserPosts;

import React from "react";
import Avatar from "../../Subcomponents/Avatar";
import PhotographerCard from "../../Subcomponents/PhotographerCard";

const Photographers = (props) => {
  // console.log(props.users);
  const allUsers = props.users;

  const mappedUsers = allUsers.map((user, index) => {
    return <Avatar user={user} key={index} height={"h-96"} />;
  });

  return (
    <div className="bg-slate-100 w-full flex flex-wrap">{mappedUsers}</div>
  );
};

export default Photographers;

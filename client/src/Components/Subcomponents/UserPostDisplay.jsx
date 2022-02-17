import { React, useState, useContext } from "react";
import LikeButton from "./LikeButton";

const UserPostDisplay = (props) => {

  return (
    <div className=" inline-block rounded overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-slate-100 mx-3 md:mx-0 lg:mx-0">
      <a href={`/${props?.photo.username}/posts/${props?.photo._id}`}>
        <img
          src={props?.photo?.imgPath}
          alt={props?.photo?.description}
          className="w-full bg-cover bg-slate-100 inline-block"
        />
      </a>
      <div className="px-3 pb-2 ">
        <div className="pt-2 bg-white ">
          <h2>{props?.photo?.description}</h2>
          <LikeButton properties={properties} />
        </div>
      </div>
    </div>
  );
};

export default UserPostDisplay;

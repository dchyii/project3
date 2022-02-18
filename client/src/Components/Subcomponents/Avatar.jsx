import { React, useState, useContext } from "react";
import { DataContext } from "../../App";
import SuperAdminDelete from "./SuperAdminDelete";

const Avatar = (props) => {
  // console.log(props?.user);

  return (
    <div className={`w-96 ${props.height} border m-5 py-5 rounded-lg`}>
      <div className={`absolute`}>
        <SuperAdminDelete type={"users"} id={props?.user?.userid} />
      </div>
      <a href={`/${props?.user?.username}/posts`}>
        <div className="px-10">
          <img
            alt={""}
            // className={props?.user?.profilePhoto ? "" : " hidden"}
            src={
              props?.user?.profilePhoto
                ? props?.user?.profilePhoto
                : "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
            }
            className="shadow-lg rounded-full mx-auto aspect-square bg-cover"
          />
          <div className="pt-6 text-center">
            <h5 className="text-xl font-bold text-blueGray-700">
              {props?.user?.username}
            </h5>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Avatar;

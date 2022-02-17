import { React, useState, useContext } from "react";
import { DataContext } from "../../App";

const Avatar = (props) => {
  // console.log(props?.user?.profilePhoto);
  return (
    <div className="w-96 h-96 m-5 py-5 rounded-lg">
      <div className="px-10">
        <img
          alt={""}
          // className={props?.user?.profilePhoto ? "" : " hidden"}
          src={
            props?.user?.profilePhoto
              ? props?.user?.profilePhoto
              : "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
          }
          className="shadow-lg rounded-full mx-auto max-w-120-px"
        />
        <div className="pt-6 text-center">
          <h5 className="text-xl font-bold text-blueGray-700">
            {props?.user?.username}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Avatar;

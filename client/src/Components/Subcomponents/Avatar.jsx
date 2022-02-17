import { React, useState, useContext } from "react";
import { DataContext } from "../../App";

const Avatar = (props) => {
  // console.log(props?.user?.profilePhoto);
  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-10">
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
    </div>
  );
};

export default Avatar;

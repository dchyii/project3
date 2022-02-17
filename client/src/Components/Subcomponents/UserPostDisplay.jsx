import { React, useState, useContext } from "react";

const UserPostDisplay = (props) => {
  return (
    <div className="relative text-black w-1/2 p-2 inline-block">
      <div className=" bg-white w-full">
        {/* <p className="p-6 text-xs font-medium leading-3 absolute top-0 right-0">
          {props?.photo.createdAt}
        </p> */}
      </div>
      <div className=" w-full">
        <div className="absolute bottom-0 p-4 text-left w-3/4">
          <h2 className="text-xl text-pink-700 font-semibold 5">
            {props?.photo?.description}
          </h2>
        </div>

        <div className=" absolute bottom-0 right-0 p-3 text-pink-300"></div>

        <img
          className="object-fill aspect-auto "
          src={props?.photo?.imgPath}
          alt={props?.photo?.description}
        />
      </div>
    </div>
  );
};

export default UserPostDisplay;

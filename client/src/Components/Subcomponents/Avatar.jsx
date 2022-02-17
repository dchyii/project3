import React from "react";

const Avatar = (props) => {
  // console.log(props?.photos);
  // const filteredUSer = props?.photos?.profilePhoto.filter();
  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-10">
        <div className="px-10">
          <img
            alt={props?.photos?.description}
            className={props?.photos?.profilePhoto ? "" : " hidden"}
            src={props?.photos?.profilePhoto}
            className="shadow-lg rounded-full mx-auto max-w-120-px"
          />
          <div className="pt-6 text-center">
            <h5 className="text-xl font-bold text-blueGray-700">DCHYII</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar;

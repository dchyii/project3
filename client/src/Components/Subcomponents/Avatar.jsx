import React from "react";

const Avatar = () => {
  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-10">
        <div className="px-10">
          <img
            alt="..."
            src="https://demos.creative-tim.com/notus-js/assets/img/team-1-800x800.jpg"
            className="shadow-lg rounded-full mx-auto max-w-120-px"
          />
          <div className="pt-6 text-center">
            <h5 className="text-xl font-bold text-blueGray-700">DCHYII</h5>
            <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
              {" "}
              Web Developer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar;

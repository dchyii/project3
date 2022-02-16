import React from "react";

const PhotographerCard = (props) => {
  // const filteredAuthor = props.photos.map((author) => {
  //   return author.ImageAuthor;
  // });

  return (
    <div className=" rounded overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0">
      <div className="w-full flex justify-between p-3">
        <div className="flex">
          <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
            <img
              src="https://avatars0.githubusercontent.com/u/38799309?v=4"
              alt="profilepic"
            />
          </div>
          <span className="pt-1 ml-2 font-bold text-sm">DEMENTED DARSH</span>
        </div>
        <span className="px-2 hover:bg-gray-300 cursor-pointer rounded">
          <i className="fas fa-ellipsis-h pt-2 text-lg"></i>
        </span>
      </div>
      <img
        className="w-full bg-cover"
        src="https://3.bp.blogspot.com/-Chu20FDi9Ek/WoOD-ehQ29I/AAAAAAAAK7U/mc4CAiTYOY8VzOFzBKdR52aLRiyjqu0MwCLcBGAs/s1600/DSC04596%2B%25282%2529.JPG"
        // src={filteredAuthor}
        alt="img"
      />
    </div>
  );
};

export default PhotographerCard;

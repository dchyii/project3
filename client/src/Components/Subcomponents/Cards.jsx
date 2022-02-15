import React from "react";

const Cards = () => {
  return (
    <div class=" rounded overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0">
      <div class="w-full flex justify-between p-3">
        <div class="flex">
          <div class="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
            <img
              src="https://avatars0.githubusercontent.com/u/38799309?v=4"
              alt="profilepic"
            />
          </div>
          <span class="pt-1 ml-2 font-bold text-sm">braydoncoyer</span>
        </div>
        <span class="px-2 hover:bg-gray-300 cursor-pointer rounded">
          <i class="fas fa-ellipsis-h pt-2 text-lg"></i>
        </span>
      </div>
      <img
        class="w-full bg-cover"
        src="https://3.bp.blogspot.com/-Chu20FDi9Ek/WoOD-ehQ29I/AAAAAAAAK7U/mc4CAiTYOY8VzOFzBKdR52aLRiyjqu0MwCLcBGAs/s1600/DSC04596%2B%25282%2529.JPG"
        alt="img"
      />
      <div class="px-3 pb-2">
        <div class="pt-2">
          <i class="far fa-heart cursor-pointer"></i>
          <span class="text-sm text-gray-400 font-medium">12 likes</span>
        </div>
      </div>
    </div>
  );
};

export default Cards;

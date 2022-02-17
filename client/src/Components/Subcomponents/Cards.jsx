import { useState } from "react";
import LikeButton from "./LikeButton";

const Cards = (props) => {
  // const [L, setL] = useState([]);
  // const [liked, SetLiked] = useState(false);
  // const allLiked = props?.photos?.imageLikes;
  const properties = props?.photos;
  // console.log(properties);
  return (
    <div className=" inline-block rounded overflow-hidden border w-96 h-96 m-5 bg-white mx-3 rounded-lg">
      <div className="w-full flex justify-between p-3">
        <a href={`/${properties.username}/posts`}>
          <div className="flex">
            <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
              <img
                className={props?.photos?.profilePhoto ? "" : " hidden"}
                src={props?.photos?.profilePhoto}
                alt="profilepic"
              />
            </div>
            <span className="pt-1 ml-2 font-bold text-sm">
              {" "}
              {props?.photos?.username}{" "}
            </span>
          </div>
        </a>
      </div>
      <div className="w-full h-64">
        <a href={`/${properties?.username}/posts/${properties?._id}`}>
          <img
            src={properties?.imgPath}
            alt={properties?.description}
            // className="object-cover h-5/6 aspect-auto box-border w-96"
            className="w-full h-56 bg-cover bg-slate-100"
          />
        </a>
      </div>

      <div className="px-3 pb-2">
        <div className="pt-2">
          <LikeButton properties={properties} />
        </div>
      </div>
    </div>
  );
};

export default Cards;

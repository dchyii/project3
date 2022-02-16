import { useContext } from "react";
import LikeButton from "./LikeButton";
import { DataContext } from "../../App";

const UserPostDisplay = (props) => {
  const [userContext, setUserContext] = useContext(DataContext);

  const displayPosts = props.photos.map((photo, key) => {
    return (
      <div className="relative text-black w-1/2 p-2 inline-block" key={key}>
        <div className=" bg-white w-full">
          <p className="p-6 text-xs font-medium leading-3 absolute top-0 right-0">
            Date Uploaded
          </p>
        </div>
        <div className=" w-full">
          <div className="absolute bottom-0 p-4 text-left w-3/4">
            <h2 className="text-xl font-semibold 5">Description</h2>
          </div>

          <div className=" absolute bottom-0 right-0 p-3 text-white">
            <LikeButton />
          </div>

          <img
            className="object-fill aspect-auto "
            src={photo.imgPath}
            alt={photo.description}
          />
        </div>
      </div>
    );
  });
  console.log(displayPosts);

  return <div className=" w-full">{displayPosts}</div>;
};

export default UserPostDisplay;

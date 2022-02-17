import { useContext } from "react";
import { DataContext } from "../../App";

const UserPostDisplay = (props) => {
  const [userContext, setUserContext] = useContext(DataContext);
  const properties = props?.photos;
  console.log(properties);
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
            <h2 className="text-xl text-pink-700 font-semibold 5">
              {photo.description}
            </h2>
          </div>

          <div className=" absolute bottom-0 right-0 p-3 text-pink-300"></div>

          <img
            className="object-fill aspect-auto "
            src={photo.imgPath}
            alt={photo.description}
          />
        </div>
      </div>
    );
  });

  return <div className=" w-full">{displayPosts}</div>;
};

export default UserPostDisplay;

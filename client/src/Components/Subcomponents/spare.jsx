import { useContext } from "react";
import LikeButton from "./LikeButton";
import { DataContext } from "../../App";

const UserPostDisplay = (props) => {
  const [userContext, setUserContext] = useContext(DataContext);

  const displayPosts = props.photos.map((photo, key) => {
    return <img src={photo.imgPath} alt={photo.description} />;
  });
  console.log(displayPosts);

  return (
    // <div>
    //   <p>hi</p>
    // </div>

    <div className="flex justify-center items-center ">
      <div className="lg:flex items-stretch md:mt-12 mt-8">
        <div className="lg: w-fit">
          <div className="sm:flex items-center justify-between xl:gap-x-8 gap-x-6">
            <div className=" sm:w-fit relative text-white">
              <div>
                <p className="p-6 text-xs font-medium leading-3 absolute top-0 right-0">
                  Date Uploaded
                </p>
                <div className="absolute bottom-0 left-0 p-6">
                  <h2 className="text-xl font-semibold 5">Description</h2>

                  <p className="text-base leading-4 mt-2">BOMB</p>
                  <div className=" relative h-32 w-32">
                    <div className=" absolute bottom-0 right-0 h-16 w-16">
                      <LikeButton />
                    </div>
                  </div>
                </div>
              </div>
              <img
                src="https://i.ibb.co/DYxtCJq/img-1.png"
                className="w-full"
                alt="chair"
              />
            </div>

            {/* <div className="sm:w-1/2 sm:mt-0 mt-4 relative text-white">
              <div>
                <p className="p-6 text-xs font-medium leading-3 absolute top-0 right-0">
                  Some Date
                </p>
                <div className="absolute bottom-0 left-0 p-6">
                  <h2 className="text-xl font-semibold 5">2nd Post</h2>
                  <p className="text-base leading-4 mt-2">
                    Dive into Monsoon Season
                  </p>
                  <LikeButton />
                </div>
              </div>
              <img
                src="https://i.ibb.co/3C5HvxC/img-2.png"
                className="w-full"
                alt="wall design"
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPostDisplay;

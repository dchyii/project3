import { React, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Avatar from "../Subcomponents/Avatar";
import Cards from "../Subcomponents/Cards";
import { DataContext } from "../../App";
// import UserPostDisplay from "../Subcomponents/UserPostDisplay";

const UserPosts = (props) => {
  const [userContext, setUserContext] = useContext(DataContext);
  const allUsers = props?.users;
  const { userID } = useParams();
  const index = allUsers.findIndex((user) => user.username === userID);
  const profile = allUsers[index];
  console.log(profile);

  const allPhotoData = props?.photos;
  const allUserPostedPhotos = allPhotoData.filter(
    (photo) => photo.username === userID
  );

  const allUserPostedPhotosMapped = allUserPostedPhotos?.map((photo, index) => {
    return <Cards photos={photo} key={index} />;
  });

  return (
    <div className=" bg-slate-100 flex">
      <div>
        <Avatar user={profile} height={"h-96"} />
        <Link to={`/${userID}/edit`}>
          <button
            disabled={profile?.userid !== userContext.userID}
            className="bg-black disabled:bg-gray-200 active:bg-gray-900 focus:outline-none text-white rounded py-1 px-2"
          >
            Edit user profile
          </button>
        </Link>{" "}
      </div>

      <div>{allUserPostedPhotosMapped}</div>
    </div>
  );
};

export default UserPosts;

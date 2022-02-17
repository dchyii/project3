import { React } from "react";
import { useParams } from "react-router-dom";
import Avatar from "../Subcomponents/Avatar";
import Cards from "../Subcomponents/Cards";
// import UserPostDisplay from "../Subcomponents/UserPostDisplay";

const UserPosts = (props) => {
  const allUsers = props?.users;
  const { userID } = useParams();
  const index = allUsers.findIndex((user) => user.username === userID);
  const profile = allUsers[index];
  // console.log(profile);

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
      </div>
      <div>{allUserPostedPhotosMapped}</div>
    </div>
  );
};

export default UserPosts;

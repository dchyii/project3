import { React } from "react";
import { useParams } from "react-router-dom";
import Avatar from "../Subcomponents/Avatar";
import UserPostDisplay from "../Subcomponents/UserPostDisplay";
// import { DataContext } from "../../App";

const UserPosts = (props) => {
  const allUsers = props?.users;
  const { userID } = useParams();
  // const allprofiles = (profile) => {
  //   return profile === userID;
  // };
  const index = allUsers.findIndex((user) => user.username === userID);
  const profile = allUsers[index];
  // console.log(profile);

  const allPhotoData = props?.photos;
  // console.log(allPhotoData);
  // const allPhotoDataData = (profile) => {
  //   return profile === userID;
  // };
  // console.log(allPhotoData[0]);
  const allUserPostedPhotos = allPhotoData.filter(
    (photo) => photo.username === userID
  );
  // const photoProfile = allPhotoData[allUserPostedPhotos];
  // console.log(allUserPostedPhotos);

  const allUserPostedPhotosMapped = allUserPostedPhotos?.map((photo, index) => {
    return <UserPostDisplay photo={photo} key={index} />;
  });

  return (
    <div className=" bg-slate-100">
      <Avatar user={profile} />
      {allUserPostedPhotosMapped}
    </div>
  );
};

export default UserPosts;

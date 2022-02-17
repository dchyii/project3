import { React, useState, useContext } from "react";
import { DataContext } from "../../App";
import axios from "axios";

const LikeButton = (props) => {
  const [userContext, setUserContext] = useContext(DataContext);
  const userID = userContext.userID;
  const allLikes = props.properties.imageLikes;
  const [totalLikes, setTotalLikes] = useState(allLikes);
  const postID = props?.properties?._id;

  const likeStatus = totalLikes.includes(userID) ? "Liked" : "Like";

  const onClicked = async () => {
    const index = totalLikes.findIndex((like) => {
      return like === userID;
    });
    console.log(index);
    if (index === -1) {
      const userArr = [userID];

      const newTotalLikes = totalLikes.concat(userArr);
      console.log("like", newTotalLikes);
      setTotalLikes(newTotalLikes);
      await axios.put(`/api/images/${postID}/like`);
    } else {
      const newTotalLikes = totalLikes.filter((likes, i) => i !== index);
      console.log("Unlike", newTotalLikes);
      setTotalLikes(newTotalLikes);
      await axios.put(`/api/images/${postID}/unlike`);
    }
  };

  return (
    <div>
      <button
        className="text-base border border-gray-300 px-5 py-2 rounded-md"
        onClick={onClicked}
      >
        {likeStatus} | {totalLikes.length}
      </button>
    </div>
  );
};

export default LikeButton;

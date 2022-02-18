import { React, useState, useContext, useEffect } from "react";
import { DataContext } from "../../App";
import { DatabaseStatus } from "../../App";
import axios from "axios";

const LikeButton = (props) => {
  const [userContext, setUserContext] = useContext(DataContext);
  const [isUpdatedData, setIsUpdatedData] = useContext(DatabaseStatus);
  const userID = userContext.userID;
  const allLikes = props?.properties?.imageLikes;
  const [totalLikes, setTotalLikes] = useState(allLikes);
  const postID = props?.properties?._id;

  useEffect(() => {
    setTotalLikes(allLikes);
  }, [allLikes]);

  const likeStatus = totalLikes?.includes(userID) ? "Liked" : "Like";

  const onClicked = async () => {
    const index = totalLikes?.findIndex((like) => {
      return like === userID;
    });
    if (index === -1) {
      const userArr = [userID];

      const newTotalLikes = totalLikes.concat(userArr);
      setTotalLikes(newTotalLikes);
      await axios.put(`/api/images/${postID}/like`);
      // axios({
      //   method: "put",
      //   url: `/api/images/${postID}/like`,
      // }).then((response) => {
      //   console.log(response);
      // });
    } else {
      const newTotalLikes = totalLikes?.filter((likes, i) => i !== index);
      setTotalLikes(newTotalLikes);
      await axios.put(`/api/images/${postID}/unlike`);
    }
    setIsUpdatedData(false);
  };

  return (
    <div>
      <button
        className="text-base border border-gray-300 px-5 py-2 rounded-md"
        onClick={onClicked}
        disabled={userContext.isLoggedIn ? false : true}
      >
        {likeStatus} | {totalLikes?.length}
      </button>
    </div>
  );
};

export default LikeButton;

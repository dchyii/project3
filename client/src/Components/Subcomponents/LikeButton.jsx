import { React, useState } from "react";

const LikeButton = (props) => {
  // const sorted = props.properties.sort();
  // console.log(sorted);
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [l, setL] = useState([]);

  const displayAllLikes = (likes) => {
    const filteredLike = props.likes.filter((userName) => {
      return;
    });

    setIsLiked(!isLiked);
  };

  const onClicked = () => {
    setLike(like + (isLiked ? -1 : 1));
    setIsLiked(!isLiked);
  };

  return (
    <div>
      <button
        className="text-base border border-gray-300 px-5 py-2 rounded-md"
        onClick={onClicked}
      >
        {"Like"} | {like}
      </button>
    </div>
  );
};

export default LikeButton;

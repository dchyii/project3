import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PhotoView = () => {
  const { postID, userID } = useParams();
  const [viewedPost, setViewedPost] = useState({});
  useEffect(() => {
    const getPost = async () => {
      const post = await axios.get(`/api/images/${postID}`);
      console.log(post.data.data.imagePosts);
      setViewedPost(post.data.data.imagePosts);
    };
    const getComments = async () => {
      const post = await axios.get(`/api/images/${postID}`);
      console.log(post);
    };
    getPost();
  }, []);

  const dummyComments = ["sucks", "goood", "bad"];
  const allComments = dummyComments.map((item) => (
    
    <div>
      <div>
        <span>razzle_dazzle</span> {item}
      </div>
    </div>
  ));

  return (
    <div className="flex flex-row m-10"> 
      <span className="w-6/12">
        <img src={viewedPost.imgPath}/>
      </span>
      <span className="w-6/12"><div>{allComments}</div></span>
    </div>
  );
};

export default PhotoView;

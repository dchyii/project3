import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PhotoView = () => {
  const { postID } = useParams();
  const [viewedPost, setViewedPost] = useState({})
  useEffect(() => {
    const getPost = async () => {
      const post = await axios.get(`/api/images/${postID}`);
      console.log(post.data.data.imagePosts);
      setViewedPost(post.data.data.imagePosts);
    };
    getPost();
  }, []);

  return (
    <div>
      <div>PhotoView</div>
      <span><img src={viewedPost?.imgPath} style={{display: "inline-block", width: "50%", height: "auto"}}/></span>
      <span>COMMENTS</span>
    </div>
  );
};

export default PhotoView;

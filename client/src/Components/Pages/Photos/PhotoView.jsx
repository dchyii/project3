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

  return (
    <div>
      <div>PhotoView</div>
      <span><img src={viewedPost.imgPath} className="w-6/12 inline"/></span><span className="w-6/12 inline">Comments</span>
    </div>
  );
};

export default PhotoView;

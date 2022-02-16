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
    <div class="mb-2">
      <div class="mb-2 text-sm">
        <span class="font-medium mr-2">razzle_dazzle</span> {item}
      </div>
    </div>
  ));

  return (
    <div className="flex flex-row m-10 rounded border">
      <span className="w-6/12">
        <div class="w-full flex justify-between p-3">
          <div class="flex">
            <div class="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
              <img
                src="https://avatars0.githubusercontent.com/u/38799309?v=4"
                alt="profilepic"
              />
            </div>
            <span class="pt-1 ml-2 font-bold text-sm">braydoncoyer</span>
          </div>
          <span class="px-2 hover:bg-gray-300 cursor-pointer rounded">
            <i class="fas fa-ellipsis-h pt-2 text-lg"></i>
          </span>
        </div>
        <img src={viewedPost.imgPath} />
        <div class="pt-1">
        <div class="mb-2 text-sm">
          <span class="font-medium mr-2">braydoncoyer</span> {viewedPost.description}
        </div>
      </div>
      </span>
      <span className="w-6/12">
          
        <div>{allComments}</div>
      </span>
    </div>
  );
};

export default PhotoView;

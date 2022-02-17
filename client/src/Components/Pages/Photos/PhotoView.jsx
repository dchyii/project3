import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./style.css";

const PhotoView = () => {
  const { postID, userID } = useParams();
  const [viewedPost, setViewedPost] = useState({});
  useEffect(() => {
    const getPost = async () => {
      const post = await axios.get(`/api/images/${postID}`);
      console.log(post);
      setViewedPost(post.data.data.imagePosts);
      console.log(post.data.data.comments)
    };
    getPost();
  }, []);

  const dummyComments = ["sucks", "goood", "bad", "goood", "bad", "goood", "bad", "goood", "bad", "goood", "bad", "goood", "bad", "goood", "bad", "goood", "bad", "goood", "bad", "goood", "bad", "goood", "bad", "goood", "bad"];
  const allComments = dummyComments.map((item, index) => (
      <div className={((index % 2 == 0) ? "bg-slate-100 py-1 text-sm" : "bg-white py-1 text-sm")} key={index} >
        <span className="font-medium mr-2">razzle_dazzle</span> <span>{item}</span>
    </div>
  ));

  const showTags = viewedPost?.tags?.map((item) => <span
  className="bg-green-500 hover:bg-green-400 text-white py-1 px-3 rounded-full m-1"
key={item}>
  {item}
</span>)

  return (
    <div className="m-10 rounded border pb-5">
        <div className="flex my-3 ml-3 py-auto">
          <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
            <img
              src="https://avatars0.githubusercontent.com/u/38799309?v=4"
              alt="profilepic"
            />
          </div>
          <span className="pt-1 ml-2 font-bold text-sm">{viewedPost?.imageAuthor}</span>
        </div>
      <div className="flex flex-row">
        <span className="w-6/12">
          <img src={viewedPost?.imgPath} className="min-h-80 max-h-80" />
          <div className="pt-1">
          <div className="pt-2">
        <i className="far fa-heart cursor-pointer"></i>
        <span className="text-sm text-gray-400 font-medium">12 likes</span>
      </div>
            <div className="mb-2 text-sm">
              <span className="font-medium mr-2">braydoncoyer</span>{" "}
              {viewedPost?.description}
            </div>
            <div>
            <span>Tags: </span>
                {showTags}
            </div>
          </div>
        </span>
        <span className="w-6/12">
          <section className="flex flex-col overflow-y-auto" id="container"><article id="content" className="border flex flex-col max-h-80">{allComments}</article></section>
        </span>
      </div>
    </div>
  );
};

export default PhotoView;

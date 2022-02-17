// DEPENDENCIES
import React, { useState, useEffect, forwardRef, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import LikeButton from "../../Subcomponents/LikeButton";
import { DataContext } from "../../../App";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";

const PhotoView = (props) => {
  const { postID, userID } = useParams();
  // const [viewedPost, setViewedPost] = useState({});
  const [userContext, setUserContext] = useContext(DataContext);
  const [comments, setComments] = useState();
  const postIndex = props?.photos.findIndex((photo) => photo._id === postID);
  const properties = props?.photos[postIndex];
  const navigate = useNavigate();
  const viewedPost = props.photos[postIndex];
  // console.log(viewedPost.imageAuthor);
  // console.log(userContext.userID)
  useEffect(() => {
    const getComments = async () => {
      const post = await axios.get(`/api/images/${postID}`);
      // console.log(post.data.data);
      // setViewedPost(post.data.data.imagePosts);
      // console.log(post.data.data.comments);
      setComments(post.data.data.comments);
      // console.log(props);
      // setViewedPost(props.photos[postIndex])
      // console.log(viewedPost)
      formik.setFieldValue("commentAuthor", userContext.userID);
      formik.setFieldValue("postImage", postID);
    };
    getComments();
  }, []);

  // POST "/:postid/comment"
  const validateSchema = Yup.object().shape({
    comment: Yup.string().required("Please type something!"),
  });
  const formik = useFormik({
    initialValues: {
      comment: "",
      commentAuthor: "",
      postImage: "",
    },
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      console.log("submitted values: ", values);
      // await axios.post("/api/images/new", values);
      axios({
        method: "post",
        url: `/${postID}/comment`,
        data: values,
      }).then((response) => {
        console.log(response);
        if (response.data.status === "not ok") {
          console.log("Error:" + response.data.message);
          // const newMsg =
          //   response.data.message.charAt(0).toUpperCase() +
          //   response.data.message.slice(1);
          // setMessage(newMsg);
        } else {
          // const result = response.data.data;
          let post = {
            comment: "",
            commentAuthor: "",
            postImage: "",
          };
          console.log(post);
          post = {
            ...post,
            comment: "",
            commentAuthor: "",
            postImage: "",
          };
          console.log(post);
          navigate(-1, { replace: false });
        }
      });
    },
  });

  const allComments = comments?.map((item, index) => {
    const commentUsernameIndex = props.users?.findIndex(
      (user) => user?.userid === item?.commentAuthor
    );
    const commentUsername = props?.users[commentUsernameIndex]?.username;
    return (
      <div
        className={
          index % 2 == 0 ? "bg-slate-100 py-1 text-sm" : "bg-white py-1 text-sm"
        }
        key={index}
      >
        <span className="font-medium mr-2">{commentUsername}</span>{" "}
        <span>{item.comment}</span>
        <span></span>
      </div>
    );
  });

  const showTags = viewedPost?.tags?.map((item) => (
    <span
      className="bg-green-500 hover:bg-green-400 text-white py-1 px-3 rounded-full m-1"
      key={item}
    >
      {item}
    </span>
  ));

  return (
    <div className="m-10 rounded border pb-5">
      <div className="flex my-3 ml-3 py-auto">
        <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
          <img
            className={viewedPost?.profilePhoto ? "" : " hidden"}
            src={viewedPost?.profilePhoto}
            alt="profilepic"
          />
        </div>
        <span className="pt-1 ml-2 font-bold text-sm">
          {viewedPost?.username}
        </span>
        <span
          className="flex justify-end mt-1 ml-96"
          hidden={viewedPost?.imageAuthor !== userContext.userID}
        >
          <Link to={`/${userID}/posts/${postID}/edit`}>
            <button
              disabled={viewedPost?.imageAuthor !== userContext.userID}
              className="bg-black disabled:bg-gray-200 active:bg-gray-900 focus:outline-none text-white rounded py-1 px-2"
            >
              Edit
            </button>
          </Link>
        </span>
      </div>
      <div className="flex flex-row">
        <span className="w-6/12">
          <img
            src={viewedPost?.imgPath}
            alt={viewedPost?.description}
            className="min-h-80 max-h-80 mx-auto"
          />
          <div className="pt-1">
            <div className="pt-2">
              <i className="far fa-heart cursor-pointer"></i>
              <span className="text-sm font-medium">
                <LikeButton properties={properties} />
              </span>
            </div>
            <div className="mb-2 text-sm">
              <span className="font-medium mr-2">{viewedPost?.username}</span>{" "}
              {viewedPost?.description}
            </div>
            <div>
              <span>Tags: </span>
              {showTags}
            </div>
          </div>
        </span>
        <span className="w-6/12">
          <section className="flex flex-col overflow-y-auto" id="container">
            <article
              id="content"
              className="border flex flex-col h-80 max-h-80"
            >
              {allComments}
            </article>
          </section>
          <form method="POST" onSubmit={formik.handleSubmit}>
            <Field
              name="comment"
              id="comment"
              type="textarea"
              onChange={formik.handleChange}
              rows="3"
              error={formik.touched?.description && formik.errors?.comment}
              className="inline w-full"
              placeholder="Enter comment..."
            />{" "}
            <button
              type="submit"
              className=" bg-black disabled:bg-gray-200 active:bg-gray-900 focus:outline-none text-white rounded px-4 py-1"
            >
              Submit Comment
            </button>
          </form>
        </span>
      </div>
    </div>
  );
};

export default PhotoView;

const style = {
  dot: `after:content-['*'] after:ml-0.5 after:text-red-500`,
  error: `ring-red-500 ring-1`,
  disabled: `cursor-not-allowed`,
  container: `relative mb-6 mt-3`,
  errorMessage: `text-sm text-red-500 mt-2`,
  checkboxLabel: `block overflow-hidden h-6 rounded-full bg-gray-300`,
  checkboxContainer: `relative w-10 mr-2 align-middle select-none mt-2`,
  iconContainer: `absolute flex border border-transparent left-0 top-0 h-full w-10`,
  icon: `flex items-center justify-center rounded-tl rounded-bl z-10 text-gray-400 text-lg h-full w-full`,
  checkbox: `checked:bg-blue-500 checked:right-0 focus:outline-none right-4 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer`,
  default: `text-base relative flex flex-1 w-full mt-1 rounded-md py-2 px-4 bg-white text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:ring-1 focus:border-transparent border`,
};
const Field = forwardRef(
  (
    { disabled, dot, error, icon, label, name, type = "text", ...rest },
    ref
  ) => {
    let component;

    // if you won't use textarea, you can delete this part
    if (type === "textarea") {
      component = (
        <textarea
          aria-required={dot}
          aria-invalid={!!error}
          className={`${style.default} ${disabled ? style.disabled : ""}
             ${error ? style.error : "border-gray-300"}
          `}
          disabled={disabled}
          id={name}
          name={name}
          ref={ref}
          {...rest}
        />
      );
    }

    // if you won't use checkbox, you can delete this part and the classes checkbox, checkboxContainer and checkboxLabel
    if (type === "checkbox") {
      component = (
        <div className={style.checkboxContainer}>
          <input
            aria-required={dot}
            aria-invalid={!!error}
            className={`${style.checkbox} ${disabled ? style.disabled : ""}`}
            disabled={disabled}
            id={name}
            name={name}
            type="checkbox"
            {...rest}
          />
          <span className={style.checkboxLabel} />
        </div>
      );
    }

    // if you won't use input, you can delete this part
    if (type !== "checkbox" && type !== "select" && type !== "textarea") {
      component = (
        <div className="relative">
          <div className={style.iconContainer}>
            <div className={style.icon}>{icon}</div>
          </div>
          <input
            aria-required={dot}
            aria-invalid={!!error}
            className={`${style.default} ${icon ? "pl-12" : ""}
               ${error ? style.error : "border-gray-300"}
               ${disabled ? style.disabled : ""}
            `}
            disabled={disabled}
            id={name}
            name={name}
            type={type}
            ref={ref}
            {...rest}
          />
          {error && <ErrorIcon />}
        </div>
      );
    }

    return (
      <div className={`${style.container} ${disabled ? "opacity-50" : ""}`}>
        <label htmlFor={name} className={`text-gray-700 ${dot && style.dot}`}>
          {label}
        </label>
        {component}
        {error && (
          <span role="alert" className={style.errorMessage}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Field.displayName = "Field";
Field.enableReinitialize = true;
const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    fill="currentColor"
    className="absolute right-2 -mt-7 text-red-500"
    viewBox="0 0 1792 1792"
  >
    <path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z" />
  </svg>
);

const LockIcon = () => (
  <svg
    height="20"
    width="20"
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 448 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
  </svg>
);

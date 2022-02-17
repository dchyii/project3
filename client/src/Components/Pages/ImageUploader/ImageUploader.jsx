// DEPENDENCIES
import "./style.css";
import { useState, forwardRef, useContext } from "react";
import { DataContext } from "../../../App";
import axios from "axios";
import { useFormik, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
//VARIABLES
const NAME_OF_UPLOAD_PRESET = "project_3";
const YOUR_CLOUDINARY_ID = "djtovzgnc";
const tagList = [
  "People",
  "Food",
  "Animals",
  "Nature",
  "Urban",
  "Art",
  "Others",
];

// A helper function

const ImageUploader = () => {
  const [userContext, setUserContext] = useContext(DataContext);
  const navigate = useNavigate();
  // const userContext = useContext[DataContext];
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    // ...other fields
    img: "",
  });
  const [uploadingImg, setUploadingImg] = useState(false);
  const [displayedImage, setDisplayedImage] = useState(
    "https://image.flaticon.com/icons/png/128/109/109612.png"
  );

  //FORM
  const validateSchema = Yup.object().shape({
    imgPath: Yup.string().required("Please upload an image."),
    description: Yup.string().required("Please enter a description."),
  });
  const formik = useFormik({
    initialValues: {
      imgPath: "",
      description: "",
      likes: [],
      author: "",
      equipment: "",
      tags: [],
    },
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      if (uploadingImg) return;
      console.log("submitted values: ", values);
        // await axios.post("/api/images/new", values);
      axios({
        method: "post",
        url: "/api/images/new",
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
            imgPath: "",
            description: "",
            likes: [],
             author: "",
            equipment: "",
            tags: [],
          };
          console.log(post);
          post = {
            ...post,
            imgPath: "",
            description: "",
            likes: [],
            author: "",
            equipment: "",
            tags: [],
          };
          console.log(post);
          navigate(-1, { replace: false });
        }
      });
    },
  });

  //TAGS

  const onTagInputChange = (e) => {
    const { value } = e.target;
    setTagInput(value);
  };
  const addTag = (e) => {
    e.preventDefault();
    const trimmedInput = tagInput.trim();
    const addTag = (prevState) => [...prevState, trimmedInput];
    if (trimmedInput.length && !tags.includes(trimmedInput)) {
      setTags((prevState) => [...prevState, trimmedInput]);
      formik.setFieldValue("tags", addTag(tags));
      setTagInput("");
    }
  };

  const removeTag = (value) => {
    const arr = tags.filter((tag) => tag !== value);
    setTags(arr);
    formik.setFieldValue("tags", arr);
  };

  const tagDisplay = tags.map((tag) => (
    <div className="tag" key={tag}>
      <button
        className="bg-green-500 hover:bg-red-500 text-white font-bold py-1 px-3 rounded-full"
        onClick={() => removeTag(tag)}
      >
        {tag}
      </button>
    </div>
  ));

  const tagDatalist = tagList.map((item) => <option key={item} value={item} />);

  //IMAGE
  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", NAME_OF_UPLOAD_PRESET);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${YOUR_CLOUDINARY_ID}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const img = await res.json();
    setDisplayedImage(img.secure_url);
    formik.setFieldValue("imgPath", img.secure_url);
    return img.secure_url;
  };

  const handleFileChange = async (event) => {
    const [file] = event.target.files;
    if (!file) return;

    setUploadingImg(true);
    setDisplayedImage(
      "https://res.cloudinary.com/djtovzgnc/image/upload/v1644945448/project3/fihn2qjb7r3lt4dq0jxu.gif"
    );
    const uploadedUrl = await uploadImage(file);
    setFormData({ ...formData, img: uploadedUrl });
    setUploadingImg(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // disable the form submit when uploading image
    if (uploadingImg) return;

    // upload `formData` to server
  };

  return (
    <div className="center">
      <form method="POST" onSubmit={formik.handleSubmit} className="form-input">
        <div>
          <img
            src={displayedImage}
            style={{ maxWidth: "75% ", height: "auto" }}
          />
          <Field
            className="input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploadingImg}
            error={formik.touched?.description && formik.errors?.imgPath}
          />
        </div>
        <span
          style={{ display: "inline-block", width: "70%", padding: "10px" }}
        >
          <Field
            label="Description"
            name="description"
            type="textarea"
            onChange={formik.handleChange}
            rows="6"
            dot={true}
            error={formik.touched?.description && formik.errors?.description}
          />
          <Field
            label="Equipment"
            name="equipment"
            placeholder="Equipment used..."
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </span>

        <aside
          style={{
            display: "inline-block",
            width: "30%",
            maxWidth: "30%",
          }}
          className="max-w-sm"
        >
          <div
            style={{
              position: "absolute",
              marginTop: "-253px",
              maxWidth: "23%",
              width: "24%",
            }}
          >
            <Field
              list="tags"
              id="tag"
              type="text"
              value={tagInput}
              placeholder="Enter a tag"
              onChange={onTagInputChange}
            />
            <datalist id="tags" style={{ display: "none" }}>
              {tagDatalist}
            </datalist>
            <button
              onClick={addTag}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-0 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            >
              Add Tag
            </button>{" "}
            <p>
              <i>Click on a tag to remove it!</i>
            </p>
            <div className="flex flex-wrap" style={{ maxHeight: "200px" }}>
              {tagDisplay}
            </div>
          </div>
        </aside>

        <br />
        <button
          type="submit"
          className="mt-8 bg-black disabled:bg-gray-200 active:bg-gray-900 focus:outline-none text-white rounded px-4 py-1"
          disabled={uploadingImg && !(formik.isValid && formik.dirty)}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ImageUploader;

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

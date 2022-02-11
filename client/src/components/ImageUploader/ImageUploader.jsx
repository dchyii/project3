import "./style.css";
import { useState } from "react";

const ImageUploader = ({}) => {
    const [imageFile, setImageFile] = useState(null)
    const onInputChange = (e) => {
        console.log
        setImageFile(e.target.value)
    };
  return (
    <form method="post" action="#" id="#">
      <div className="form-group files">
        <label>Upload Your File </label>
        <input type="file" onChange={onInputChange} className="form-control" multiple="" />
      </div>
    </form>
  );
};

export default ImageUploader;

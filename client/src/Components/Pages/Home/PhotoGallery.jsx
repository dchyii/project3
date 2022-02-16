import FeaturedPhotographers from "./FeaturedPhotographers";
import Top10 from "./Top10";
import SearchBar from "../../Subcomponents/SearchBar";

const PhotoGallery = (props) => {
  return (
    <div className="h-full w-full -m-5 pt-3 mx-auto border border-blue-500">
      <div className="h-1/2">
        <Top10 photos={props?.photos} />
      </div>
      <div className="h-1/2">
        <FeaturedPhotographers photos={props?.photos} />
      </div>
    </div>
  );
};

export default PhotoGallery;

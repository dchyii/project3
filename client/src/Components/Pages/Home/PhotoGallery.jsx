import FeaturedPhotographers from "./FeaturedPhotographers";
import Top10 from "./Top10";
import SearchBar from "../../Subcomponents/SearchBar";

const PhotoGallery = () => {
  return (
    <div className="h-full w-full mx-auto">
      <div className="h-1/2">
        <Top10 />
      </div>
      <div className="h-1/2">
        <FeaturedPhotographers />
      </div>
    </div>
  );
};

export default PhotoGallery;

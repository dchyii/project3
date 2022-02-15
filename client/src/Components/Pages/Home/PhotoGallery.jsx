import FeaturedPhotographers from "./FeaturedPhotographers";
import Top10 from "./Top10";
import SearchBar from "../../Subcomponents/SearchBar";

const PhotoGallery = () => {
  return (
    <div>
      <Top10 />
      <br></br>
      <FeaturedPhotographers />
    </div>
  );
};

export default PhotoGallery;

import FeaturedPhotographers from "./PhotoGallery/FeaturedPhotographers";
import Top10 from "./PhotoGallery/Top10";
import SearchBar from "./Subcomponents/SearchBar";

const PhotoGallery = () => {
  return (
    <div>
      <h1>PhotoGallery</h1>
      <SearchBar />
      <br></br>
      <Top10 />
      <br></br>
      <FeaturedPhotographers />
    </div>
  );
};

export default PhotoGallery;

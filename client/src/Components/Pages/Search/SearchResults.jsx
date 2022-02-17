import { useSearchParams } from "react-router-dom";
import Cards from "../../Subcomponents/Cards";

const SearchResults = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");
  console.log(searchParams);

  const allPhotos = props.photos;
  const allUsers = props.users;

  // console.log(typeof JSON.stringify(allPhotos[1]));
  // console.log("photos:", allPhotos);
  // console.log("users: ", allUsers);

  const filterAllPhotos = (allData, searchTerm) => {
    if (!searchTerm) {
      return allData;
    } else {
      const caseInsensitiveSearchTerm = searchTerm.toLowerCase();
      return allData.filter((photo) => {
        const stringifiedData = JSON.stringify(photo).toLowerCase();
        return stringifiedData.includes(caseInsensitiveSearchTerm);
      });
    }
  };
  const filteredPhotos = filterAllPhotos(allPhotos, searchTerm);
  // console.log(filteredPhotos);

  const displayPhotos = filteredPhotos.map((photo, index) => {
    return <Cards photos={photo} key={index} />;
  });

  const handleClick = () => {
    // setSearchParams({...searchParams,});
    console.log("clicked");
    // searchParams.append("foo", 4);
  };
  return (
    <div>
      <div>
        {/* <button onClick={handleClick}>Advanced Search</button>Advanced Search */}
      </div>
      <div>{displayPhotos}</div>
    </div>
  );
};

export default SearchResults;

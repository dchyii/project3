import { useSearchParams } from "react-router-dom";
import AdvancedSearch from "./AdvancedSearch";
import Cards from "../../Subcomponents/Cards";
import { useState } from "react";

const SearchResults = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");
  console.log(q);
  const test = searchParams.get("test");
  console.log(test);
  const allPhotos = props.photos;
  const allUsers = props.users;

  // console.log(typeof JSON.stringify(allPhotos[1]));
  // console.log("photos:", allPhotos);
  // console.log("users: ", allUsers);
  // console.log("AQ:", advancedQuery);

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
  const filteredPhotos = filterAllPhotos(allPhotos, q);
  // console.log(filteredPhotos);

  const displayPhotos = filteredPhotos.map((photo, index) => {
    return <Cards photos={photo} key={index} />;
  });

  const handleClick = () => {
    console.log("clicked", q);
    setSearchParams({ q: q, test: "testing" });
    // searchParams.append("foo", 4);
  };
  return (
    <div>
      <div>
        <button onClick={handleClick}>Advanced Search</button>
        <AdvancedSearch
          query={[searchParams, setSearchParams]}
          searchTerm={q}
        />
      </div>
      <div>{displayPhotos}</div>
    </div>
  );
};

export default SearchResults;

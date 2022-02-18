import { useSearchParams } from "react-router-dom";
import AdvancedSearch from "./AdvancedSearch";
import Cards from "../../Subcomponents/Cards";

const SearchResults = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAdvancedSearch, setIsAdvancedSearch] = props.advancedSearch;
  const q = searchParams.get("q");
  // console.log(q);
  const params = searchParams.get("params");
  // console.log(params);
  const advancedQuery = searchParams.get("advancedQuery");
  // console.log(advancedQuery);
  const allPhotos = props.photos;

  const filterAllPhotos = (allData, q) => {
    if (!q) {
      return allData;
    } else {
      const caseInsensitiveSearchTerm = q?.toLowerCase();
      return allData.filter((photo) => {
        const stringifiedData = JSON.stringify(photo)?.toLowerCase();
        return stringifiedData.includes(caseInsensitiveSearchTerm);
      });
    }
  };
  const filteredPhotos = filterAllPhotos(allPhotos, q);

  const advanceFilter = (allData, params, advancedQuery) => {
    if (!params || !advancedQuery) {
      return allData;
    } else {
      return allData.filter((photo) => {
        const lowerCaseAQ = advancedQuery?.toLowerCase();
        const lowerCaseValue = JSON.stringify(photo[params])?.toLowerCase();
        console.log(lowerCaseAQ);
        console.log(lowerCaseValue);
        return lowerCaseValue?.includes(lowerCaseAQ);
      });
    }
  };

  const advanceFiltered = advanceFilter(filteredPhotos, params, advancedQuery);

  const displayPhotos = advanceFiltered.map((photo, index) => {
    return <Cards photos={photo} key={index} />;
  });

  // const handleClick = () => {
  //   console.log("clicked", q);
  //   setSearchParams({ q: q, test: "testing" });
  // };
  return (
    <div>
      <div>
        <AdvancedSearch
          advancedSearch={[isAdvancedSearch, setIsAdvancedSearch]}
          query={[searchParams, setSearchParams]}
          searchTerm={q}
        />
      </div>
      <div>{displayPhotos}</div>
    </div>
  );
};

export default SearchResults;

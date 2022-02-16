import { useSearchParams } from "react-router-dom";

const SearchResults = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");

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
  console.log(filteredPhotos);

  return (
    <div>
      <ul>
        {filteredPhotos.map((post, index) => (
          <li key={index}>
            {post._id} {post.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;

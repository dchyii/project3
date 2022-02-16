import { useState } from "react";
import { BrowserRouter as Router, useSearchParams } from "react-router-dom";
import SearchBar2 from "./SearchBar2";

const posts = [
  { id: "asd", name: "edi" },
  { id: "tester", name: "example" },
];
const filterPosts = (posts, query) => {
  if (!query) {
    return posts;
  }

  return posts.filter((post) => {
    const postName = post.name.toLowerCase();
    return postName.includes(query);
  });
};

const SearchBar = () => {
  const { search } = window.location;
  const query = new URLSearchParams(search).get("searchTerm");
  // const [searchQuery, setSearchQuery] = useState(query || "");
  const [searchParams, setSearchParams] = useSearchParams();
  // const filteredPosts = filterPosts(posts, searchQuery);

  return (
    <div>
      {/* <SearchBar2 searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> */}
      <SearchBar2
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <ul>
        {/* {filteredPosts.map((post) => (
          <li key={post.id}>
            {post.id} {post.name}
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default SearchBar;

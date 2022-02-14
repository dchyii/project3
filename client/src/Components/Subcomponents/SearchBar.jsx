import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SearchBar2 from "./SearchBar2";

const posts = [{ id: "asd", name: "edi" }];
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
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const filteredPosts = filterPosts(posts, searchQuery);

  return (
    <div className="App">
      <SearchBar2 searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id}>{post.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;

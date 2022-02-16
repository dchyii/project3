import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

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

const SearchResults = () => {
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const filteredPosts = filterPosts(posts, searchQuery);

  console.log(window.location.pathname);

  return (
    <div>
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id}>
            {post.id} {post.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;

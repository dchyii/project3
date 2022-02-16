import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const posts = [
  { id: "asd", name: "edi" },
  { id: "tester", name: "example" },
];
// const filteredPosts = (posts, query) => {
//   if (!query) {
//     return posts;
//   }

//   return posts.filter((post) => {
//     const postName = post.name.toLowerCase();
//     return postName.includes(query);
//   });
// };

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");
  const filterPost = (posts, searchTerm) => {
    if (!searchTerm) {
      return posts;
    } else {
      return posts.filter((post) => {
        const postName = post.name.toLowerCase();
        return postName.includes(searchTerm);
      });
    }
  };
  const filteredPost = filterPost(posts, searchTerm);

  return (
    <div>
      <ul>
        {filteredPost.map((post) => (
          <li key={post.id}>
            {post.id} {post.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

// const SearchBar2 = ({ searchQuery, setSearchQuery }) => {
const SearchBar2 = ({ searchParams, setSearchParams }) => {
  const navigate = useNavigate();
  const searchRef = useRef();
  const onSubmit = (e) => {
    // navigate.push(`/search?searchTerm=${searchQuery}`);
    e.preventDefault();
    let searchTerm = searchRef.current.value;
    console.log(searchTerm);
    // setSearchParams({ searchTerm });
    if (window.location.pathname !== "/search") {
      navigate(`/search?searchTerm=${searchTerm}`);
    }
  };

  if (window.location.pathname !== "/search") {
    return (
      <div>
        <form action="/" method="get" autoComplete="off" onSubmit={onSubmit}>
          <label htmlFor="header-search">
            <span className="search">Search Photos </span>
          </label>
          <input
            type="text"
            id="header-search"
            placeholder="Big Duck"
            name="s"
            ref={searchRef}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <form action="/" method="get" autoComplete="off" onSubmit={onSubmit}>
        <label htmlFor="header-search">
          <span className="search">Search Photos </span>
        </label>
        <input
          // value={searchQuery}
          value={searchParams?.get("searchTerm") || ""}
          onInput={(e) => {
            let searchTerm = e.target.value;
            console.log(e.target.value);
            if (searchTerm) {
              setSearchParams({ searchTerm });
            } else {
              setSearchParams({});
            }
            // if (window.location.pathname !== "/search") {
            //   navigate("/search");
            // }
            // if (window.location.pathname !== "/search") {
            //! navigate("/search");
            // setSearchQuery(e.target.value);

            // } else {
            // setSearchQuery(e.target.value);
            // }
          }}
          type="text"
          id="header-search"
          placeholder="Big Duck"
          name="s"
          ref={searchRef}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SearchBar2;

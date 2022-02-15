import React from "react";
import { useNavigate } from "react-router-dom";

const SearchBar2 = ({ searchQuery, setSearchQuery }) => {
  const nav = useNavigate();
  const onSubmit = (e) => {
    nav.push(`?s=${searchQuery}`);
    e.preventDefault();
  };
  return (
    <div>
      <form action="/" method="get" autoComplete="off" onSubmit={onSubmit}>
        <label htmlFor="header-search">
          <span className="search">Search Photos </span>
        </label>
        <input
          value={searchQuery}
          onInput={(e) => setSearchQuery(e.target.value)}
          type="text"
          id="header-search"
          placeholder="Big Duck"
          name="s"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SearchBar2;

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
      <div className="w-10/12 md:w-3/4 mx-auto">
        <form
          action="/"
          method="get"
          autoComplete="off"
          onSubmit={onSubmit}
          className="relative"
        >
          <input
            className="w-full border-2 px-3 border-gray-300 focus:outline-slate-400 bg-white h-10 rounded-lg focus:shadow-lg"
            type="text"
            id="header-search"
            placeholder="Big Duck"
            ref={searchRef}
          />
          {/* <button type="submit" className="absolute top-12 mt-1 mr-3"> */}
          <button type="submit" className="absolute right-1.5 top-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-slate-700 hover:text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>
      </div>
    );
  }
  return (
    <div className="w-10/12 md:w-3/4 mx-auto">
      <form
        action="/"
        method="get"
        autoComplete="off"
        onSubmit={onSubmit}
        className="relative"
      >
        <input
          className="w-full border-2 px-3 border-gray-300 focus:outline-slate-400 bg-white h-10 rounded-lg focus:shadow-lg"
          value={searchParams?.get("searchTerm") || ""}
          onInput={(e) => {
            let searchTerm = e.target.value;
            console.log(e.target.value);
            if (searchTerm) {
              setSearchParams({ searchTerm });
            } else {
              setSearchParams({});
            }
          }}
          type="text"
          id="header-search"
          placeholder="Big Duck"
          ref={searchRef}
        />
        <button type="submit" className="absolute right-1.5 top-1.5">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-slate-700 hover:text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar2;

import { useRef, useState } from "react";

function AdvancedSearch(props) {
  const refParams = useRef();
  const refQuery = useRef();
  const q = props.searchTerm ? props.searchTerm : "";
  const [searchParams, setSearchParams] = props.query;
  const [isDisabled, setIsDisabled] = useState(true);
  const [isAdvancedSearch, setIsAdvancedSearch] = props.advancedSearch;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (!isAdvancedSearch) {
    return (
      <div>
        <button
          onClick={() => {
            setIsAdvancedSearch(true);
            setSearchParams({ q: q });
            setIsDisabled(true);
          }}
        >
          Advanced Search
        </button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select
          id="params"
          name="params"
          ref={refParams}
          className="text-right pr-1"
          onChange={(e) => {
            let params = e.target.value;
            if (params === "invalid") {
              refQuery.current.value = "";
              setIsDisabled(true);
              setSearchParams({ q: q });
            } else {
              setIsDisabled(false);
              setSearchParams({
                q: q,
                params: params,
                advancedQuery: refQuery.current.value
                  ? refQuery.current.value
                  : "",
              });
            }
          }}
        >
          <option value="invalid">Field </option>
          <option value="username">Photographer </option>
          <option value="equipment">Equipment </option>
          <option value="tags">Tags </option>
        </select>{" "}
        :{" "}
        <input
          type="text"
          id="advancedQuery"
          name="advancedQuery"
          ref={refQuery}
          disabled={isDisabled}
          placeholder="Select Parameter"
          onInput={(e) => {
            let advancedQuery = e.target.value;
            console.log(advancedQuery);
            if (advancedQuery) {
              setSearchParams({
                q: q,
                params: refParams.current.value,
                advancedQuery: advancedQuery,
              });
            } else {
              setSearchParams({ q: q });
            }
          }}
          className="border border-slate-500 rounded-lg px-3"
        />
      </form>
    </div>
  );
}

export default AdvancedSearch;

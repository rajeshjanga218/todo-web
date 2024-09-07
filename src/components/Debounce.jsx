import React, { useState } from "react";
import useDebounce from "../customHooks/useDebounce";

function Debounce() {
  const [searchText, setSearchText] = useState("");
  const debounceValue = useDebounce(searchText, 1000) || "";

  return (
    <div>
      <div>Debounce</div>
      <label htmlFor="email" className="block">
        email
      </label>
      <input
        id="input"
        type="text"
        name="input"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className={`border
            "border-gray-500" rounded-md focus:border focus:outline-none
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200`}
      />
      <div>
        <p>Normal - {searchText}</p>
        <p>Debounce - {debounceValue}</p>
      </div>
    </div>
  );
}

export default Debounce;

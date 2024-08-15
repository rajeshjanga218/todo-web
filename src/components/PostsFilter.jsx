import { React, useState } from "react";

const PostsFilter = ({ setSearchParams }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedValue, setSectedValue] = useState("id");

  const handleSearchPost = (e) => {
    e.preventDefault();

    setSearchParams({
      query: encodeURIComponent(searchText.trim()),
      sort: selectedValue,
    });
  };

  return (
    <>
      <form
        onSubmit={handleSearchPost}
        className="bg-red-400 p-2 flex gap-2 justify-center"
      >
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="search..."
          className="border-gray-500 border rounded-md pl-1"
        />
        <select
          className="border-gray-500 border rounded-md px-1 focus:outline-red-500 focus:ring-1 focus:ring-blue-500 focus:border focus:border-green-600"
          onChange={(e) => setSectedValue(e.target.value)}
          value={selectedValue}
        >
          <option value="id">id</option>
          <option value="name">name</option>
          <option disabled value="age">
            age
          </option>
        </select>
        <button
          type="submit"
          className="border-gray-500 border rounded-md px-1"
        >
          Search
        </button>
      </form>
    </>
  );
};

export default PostsFilter;

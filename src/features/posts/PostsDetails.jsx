import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import {
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess,
} from "./postActions";

import { PostsList, AddPost, PostsSearch } from "./components";

function PostsDetails() {
  const { loading, posts, error } = useSelector((state) => state.postState);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  function fetchPostsData({ searchValue, sortValue }) {
    return async (dispatch) => {
      dispatch(fetchPostsRequest());
      try {
        const response = await fetch(
          `http://localhost:4000/posts?query=${searchValue}&sort=${sortValue}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! statu: ${response.status}`);
        }

        const data = await response.json();

        dispatch(fetchPostsSuccess(data));
      } catch (error) {
        dispatch(fetchPostsFailure(error.message || "Something went wrong"));
      }
    };
  }

  useEffect(() => {
    const searchValue = searchParams.get("query") || "";
    const sortValue = searchParams.get("sort") || "";
    dispatch(fetchPostsData({ searchValue, sortValue }));
  }, [dispatch, searchParams]);

  const [count, setCount] = useState(0);

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>loading...</p>;

  return (
    <div className="bg-green-400 h-screen">
      <h1 className="text-center text-4xl">Posts List</h1>
      <PostsSearch setSearchParams={setSearchParams} />
      <PostsList posts={posts} />
      <AddPost />
      <button
        type="button"
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        increase
      </button>
      <p>{count}</p>
    </div>
  );
}

export default PostsDetails;

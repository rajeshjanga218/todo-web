import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, Link } from "react-router-dom";

import {
  deletePostFailure,
  deletePostRequest,
  deletePostSuccess,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess,
} from "../action";
import AddPost from "./AddPost";
import PostsFilter from "./PostsFilter";

function PostsList() {
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

  const handleDeletePost = async (postId) => {
    try {
      dispatch(deletePostRequest());
      const options = {
        method: "delete",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        `http://localhost:4000/posts/${postId}`,
        options
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      dispatch(deletePostSuccess(data));
    } catch (error) {
      dispatch(deletePostFailure(error.message));
    }
  };

  useEffect(() => {
    const searchValue = searchParams.get("query") || "";
    const sortValue = searchParams.get("sort") || "";
    dispatch(fetchPostsData({ searchValue, sortValue }));
  }, [dispatch, searchParams]);

  if (error) return <p>Error: {error}</p>;
  if (loading) return <p>loading...</p>;

  return (
    <>
      <div className="bg-green-400 h-screen">
        <h1 className="text-center text-4xl">Posts List</h1>
        <PostsFilter setSearchParams={setSearchParams} />
        <div className="bg-white h-[80%] flex flex-col gap-2 items-center py-4 ">
          <ul className="border border-gray-950 h-full w-1/3 p-2 px-4 overflow-y-auto custom-scrollbar">
            {posts && posts.length > 0 ? (
              posts.map((post, index) => (
                <li key={index} className="flex justify-between pt-2">
                  <Link to={`/posts/${post.id}`}>
                    <p>{`${index + 1}. ${post.title}`}</p>
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDeletePost(post.id)}
                    className="border-gray-500 border rounded-md px-1 hover:border-red-500"
                  >
                    delete
                  </button>
                </li>
              ))
            ) : (
              <p>No items</p>
            )}
          </ul>
        </div>
        <AddPost />
      </div>
    </>
  );
}

export default PostsList;

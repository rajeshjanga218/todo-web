import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deletePostFailure,
  deletePostRequest,
  deletePostSuccess,
} from "../postActions";

const PostItem = React.memo(({ post, index }) => {
  // console.log("post item - component");
  const dispatch = useDispatch();

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

      dispatch(deletePostSuccess(data));
    } catch (error) {
      dispatch(deletePostFailure(error.message));
    }
  };
  return (
    <li className="flex justify-between pt-2">
      <Link to={`/post/${post.id}`}>
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
  );
});

export default PostItem;

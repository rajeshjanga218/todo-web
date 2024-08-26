import { React, useState } from "react";
import { addPostFailure, addPostRequest, addPostSuccess } from "../postActions";
import { useDispatch } from "react-redux";

const AddPost = () => {
  console.log("addpost component");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const handleAddPost = async (e) => {
    e.preventDefault();
    dispatch(addPostRequest());
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      };
      const response = await fetch("http://localhost:4000/posts", options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newPost = await response.json();
      setTitle("");
      setContent("");
      dispatch(addPostSuccess(newPost));
    } catch (error) {
      dispatch(addPostFailure(error.message || "Something went wrong"));
    }
  };

  return (
    <>
      <form
        onSubmit={handleAddPost}
        className="bg-red-200 p-2 flex gap-2 justify-center"
      >
        <input
          type="text"
          value={title}
          placeholder="add title..."
          onChange={(e) => setTitle(e.target.value)}
          className="border-gray-500 border rounded-md pl-1"
        />
        <input
          type="text"
          value={content}
          placeholder="add content..."
          onChange={(e) => setContent(e.target.value)}
          className="border-gray-500 border rounded-md pl-1"
        />
        <button
          type="submit"
          className="border-gray-500 border rounded-md px-1"
        >
          add post
        </button>
      </form>
    </>
  );
};

export default AddPost;

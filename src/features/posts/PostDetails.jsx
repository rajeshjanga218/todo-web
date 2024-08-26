import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "./postActions";

const PostDetails = () => {
  const { id } = useParams();
  const { loading, error, post } = useSelector((state) => state.postState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  return (
    <div>
      <p>Post details</p>
      {post && post.id && (
        <div>
          <p>{post.id}</p>
          <p>{post.title}</p>
          <p>{post.content}</p>
        </div>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default PostDetails;

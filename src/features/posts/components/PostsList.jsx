import React from "react";
import { PostItem } from ".";

const PostsList = React.memo(({ posts }) => {
  console.log("postslist");

  return (
    <div className="bg-white h-[80%] flex flex-col gap-2 items-center py-4 ">
      <ul className="border border-gray-950 h-full w-1/3 p-2 px-4 overflow-y-auto custom-scrollbar">
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <PostItem index={index} key={index} post={post} />
          ))
        ) : (
          <p>No items</p>
        )}
      </ul>
    </div>
  );
});

export default PostsList;

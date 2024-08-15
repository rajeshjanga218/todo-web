import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-6">
      <Link to={"/login"}>
        <p>user Page</p>
      </Link>
      <Link to={"/posts"}>
        <p>Posts Page</p>
      </Link>
      <Link to={"/todos"}>
        <p>Todos Page</p>
      </Link>
    </div>
  );
}

export default Home;

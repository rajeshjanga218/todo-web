import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Test() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    console.log("use Effect");
    return () => {
      console.log("return use Effect");
    };
  }, []);
  return (
    <div>
      <div>{console.log("Test", value)}Test</div>
      <Link to={"/"}>back to home</Link>
      <button type="button" onClick={() => setValue((prev) => prev + 1)}>
        enter
      </button>
    </div>
  );
}

export default Test;

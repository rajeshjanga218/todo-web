import React from "react";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <div>
      <div>user navbar</div>
      <main>
        <Outlet />
      </main>
      <div>user footer</div>
    </div>
  );
}

export default UserLayout;

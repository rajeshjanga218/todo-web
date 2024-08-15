import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <div>navbar</div>
      <main>
        <Outlet />
      </main>
      <div>footer</div>
    </div>
  );
}

export default MainLayout;

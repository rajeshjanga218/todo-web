import React from "react";
import { Link } from "react-router-dom";
import DarkModeSwitch from "./DarkModeSwitch";

const sections = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "About", path: "/" },
  { id: 3, name: "Services", path: "/" },
  { id: 4, name: "Content", path: "/" },
];

const Navbar = () => {
  document.documentElement.classList.add("dark");
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">MyWebsite</div>
        <DarkModeSwitch />
        <ul className="flex space-x-4">
          {sections.map((section) => (
            <li key={section.id}>
              <Link
                to="/"
                className="text-gray-300 hover:text-white dark:text-red-300"
              >
                {section.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

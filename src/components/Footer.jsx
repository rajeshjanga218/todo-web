import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 mt-8">
      <div className="container mx-auto text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} MyWebsite. All rights reserved.</p>
        <p>
          <Link to="/" className="hover:text-white dark:text-red-900">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link to="/" className="hover:text-white">
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

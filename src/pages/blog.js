import React from "react";
import { useAppContext } from "../app-context";

const Blog = () => {
  const { theme } = useAppContext();

  return (
    <div className={`page ${theme}`}>
      <h1>Blog Page</h1>
      <p>Read our latest blog posts!</p>
    </div>
  );
};

export default Blog;

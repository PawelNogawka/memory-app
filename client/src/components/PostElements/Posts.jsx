import { useState, useEffect, useRef } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import Post from "./Post";
import Pagination from "../uiElements/Pagination";

import "./Posts.scss";

const Posts = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const mainRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);

  const updatePage = (page) => {
    setCurrentPage(page);
    navigate(`${location.pathname}?page=${page}`);
  };

  return (
    <>
      <ul ref={mainRef} className="posts-list">
        {currentPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </ul>
      {posts.length > postsPerPage && (
        <Pagination
          totalPosts={posts.length}
          postsPerPage={postsPerPage}
          setCurrentPage={updatePage}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default Posts;

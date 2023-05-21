import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { useTitle } from "../../hooks/useTitle";

import Posts from "../../components/PostElements/Posts";
import Wrapper from "../../components/uiElements/Wrapper";
import Loader from "../../components/uiElements/Loader";
import ErrorMessage from "../../components/formElements/ErrorMessage";

const Search = () => {
  const { posts, isLoading, error } = useSelector((state) => state.posts);

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("searchQuery");

  useTitle(`Search by : '${searchQuery}'`)

  if (isLoading)
    return (
      <Wrapper>
        <Loader big />
      </Wrapper>
    );

  if (error)
    return (
      <Wrapper>
        <ErrorMessage big error={error} />
      </Wrapper>
    );

  if (!posts.length) return;

  return (
    <main>
      <Wrapper>
        <h1 className="section-heading">{`Search result by '${searchQuery}' `}</h1>
        <Posts posts={posts} />
      </Wrapper>
    </main>
  );
};

export default Search;

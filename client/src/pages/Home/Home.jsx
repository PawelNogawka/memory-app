import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getPosts } from "../../actions/posts";
import { useTitle } from "../../hooks/useTitle";

import Posts from "../../components/PostElements/Posts";
import Wrapper from "../../components/uiElements/Wrapper";
import ErrorMessage from "../../components/formElements/ErrorMessage";
import Loader from "../../components/uiElements/Loader";

const Home = () => {
  const posts = useSelector((state) => state.posts.posts);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const error = useSelector((state) => state.posts.error);

  const dispatch = useDispatch();
  const location = useLocation();

  useTitle("Photo app");

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, location.pathname]);

  if (error)
    return (
      <Wrapper>
        <ErrorMessage error={error} />
      </Wrapper>
    );
  if (isLoading)
    return (
      <Wrapper>
        <Loader big />
      </Wrapper>
    );

  if (!posts.length) return;

  return (
    <main>
      <Wrapper>
        <Posts posts={posts} />
      </Wrapper>
    </main>
  );
};

export default Home;

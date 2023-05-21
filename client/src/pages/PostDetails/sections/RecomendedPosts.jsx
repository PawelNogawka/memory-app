import React from "react";

import Wrapper from "../../../components/uiElements/Wrapper";
import Posts from "../../../components/PostElements/Posts";

import "./RecomendedPosts.scss";

const RecomendedPosts = ({ posts }) => {
  return (
    <section className="recomended-posts">
      <Wrapper>
        <h2 className="section-heading">Recomended Posts</h2>
        <Posts posts={posts} />
      </Wrapper>
    </section>
  );
};

export default RecomendedPosts;

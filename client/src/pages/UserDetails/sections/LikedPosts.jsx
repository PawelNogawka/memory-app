import React from "react";

import Wrapper from "../../../components/uiElements/Wrapper";
import Posts from "../../../components/PostElements/Posts";

const LikedPosts = ({ posts }) => {
  return (
    <section className="section-margin">
      <Wrapper>
        <h2 className="section-heading">Liked Posts</h2>
        <Posts posts={posts} />
      </Wrapper>
    </section>
  );
};

export default LikedPosts;

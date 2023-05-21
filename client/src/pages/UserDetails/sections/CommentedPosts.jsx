import React from "react";

import Wrapper from "../../../components/uiElements/Wrapper";
import Posts from "../../../components/PostElements/Posts";

const CommentedPosts = ({ posts }) => {
  return (
    <section className="section-margin">
      <Wrapper>
        <h2 className="section-heading">Commented Posts</h2>
        <Posts posts={posts} />
      </Wrapper>
    </section>
  );
};

export default CommentedPosts;

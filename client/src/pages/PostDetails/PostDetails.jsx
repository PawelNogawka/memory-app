import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPost } from "../../actions/posts";
import { getPostsBySearch } from "../../actions/posts";

import { useTitle } from "../../hooks/useTitle";

import PostInfo from "./sections/PostInfo";
import RecomendedPosts from "./sections/RecomendedPosts";
import Comments from "./sections/Comments";
import Loader from "../../components/uiElements/Loader";
import Wrapper from "../../components/uiElements/Wrapper";
import ErrorMessage from "../../components/formElements/ErrorMessage";

const PostDetails = () => {
  const { post, posts, isPostLoading, isLoading, error } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  
  useTitle(post?.title ? post.title : "loading...")

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch(post.title, post.tags));
    }
  }, [post]);

  const recomendedPosts = posts.filter((item) => item._id !== post._id);

  if (isPostLoading)
    return (
      <Wrapper>
        <Loader big />
      </Wrapper>
    );

  if (error)
    return (
      <Wrapper>
        <ErrorMessage error={error} />
      </Wrapper>
    );

  if (!post?.title) return null;

  return (
    <main>
      <PostInfo post={post} />
      <Comments post={post} />
      {isLoading && (
        <Wrapper>
          <Loader big />
        </Wrapper>
      )}
      {recomendedPosts.length > 0 && (
        <RecomendedPosts posts={recomendedPosts} />
      )}
    </main>
  );
};

export default PostDetails;

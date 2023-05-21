import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUserPosts } from "../../actions/posts";
import { useTitle } from "../../hooks/useTitle";

import AddedPosts from "./sections/UserPosts";
import LikedPosts from "./sections/LikedPosts";
import CommentedPosts from "./sections/CommentedPosts";
import Loader from "../../components/uiElements/Loader";
import ErrorMessage from "../../components/formElements/ErrorMessage";
import Wrapper from "../../components/uiElements/Wrapper";

const UserDetails = () => {
  const { posts, isLoading, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { id } = useParams();

  useTitle("User details");

  useEffect(() => {
    dispatch(getUserPosts(id));
  }, [id]);

  if (posts?.length < 0) return;

  const addedPosts = posts.filter((post) => post.creator.id == id);
  const likedPosts = posts.filter((post) => post.likes.includes(id));
  const commentedPosts = posts.filter((post) =>
    post.comments.some((comment) => comment.author.id === id)
  );

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

  return (
    <main>
      <Wrapper>
        <h1 className="section-heading">{` User details: ${posts[0].creator.name}`}</h1>
        </Wrapper>
      
      {addedPosts.length > 0 && <AddedPosts posts={addedPosts} />}
      {likedPosts.length > 0 && <LikedPosts posts={likedPosts} />}
      {commentedPosts.length > 0 && <CommentedPosts posts={commentedPosts} />}
    </main>
  );
};

export default UserDetails;

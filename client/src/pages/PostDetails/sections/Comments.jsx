import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { commentPost } from "../../../actions/posts";

import Wrapper from "../../../components/uiElements/Wrapper";
import Input from "../../../components/formElements/Input";
import Button from "../../../components/formElements/Button";
import ErrorMessage from "../../../components/formElements/ErrorMessage";

import "./Comments.scss";

const Comment = ({ comment }) => {
  return (
    <li className="comment">
      <div className="comment__author">
        <img
          src={comment.author.photo}
          width={45}
          //  alt={comment.author.name}
        />
        <div className="comment__author-left">
          <span className="comment__author-name">{comment.author.name}</span>
          <time className="comment__author-date">
            {moment(comment.date).fromNow()}
          </time>
        </div>
      </div>
      <p className="comment__message">{comment.value}</p>
    </li>
  );
};

const CommentForm = ({ post, user, setComments }) => {
  const [comment, setComment] = useState("");

  const [formError, setFormError] = useState(null);
  const { commentError, isCommenting } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setFormError(null);

    if (comment.trim()) {
      const newComment = {
        author: {
          name: user.name,
          photo: user.photo,
          id: user._id,
        },
        value: comment,
        date: new Date(),
      };
      setComment("");
      await dispatch(commentPost(newComment, post._id));

      const newComments = post.comments.concat(newComment);
      setComments(newComments);
    } else {
      setFormError("Please enter a value.");
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="comment-form">
      <h3 className="comment-form__heading">Leave a comment</h3>
      <Input
        textarea
        placeholder={"Enter a comment..."}
        name="comment"
        ariaLabel="Leave a comment..."
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      {formError && <ErrorMessage error={formError} />}
      {!formError && commentError && <ErrorMessage error={commentError} />}
      <Button disabled={isCommenting} type="submit" ariaLabel="Add comment">
        {isCommenting ? "loading..." : "submit"}
      </Button>
    </form>
  );
};

const Comments = ({ post }) => {
  const [comments, setComments] = useState(post.comments);
  const user = useSelector((state) => state.auth.user);

  return (
    <section className="comments">
      <Wrapper>
        <h2 className="section-heading">Comments</h2>
        {comments && (
          <ul className="comments__list">
            {comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </ul>
        )}
        {user?.result?.name && (
          <CommentForm
            post={post}
            user={user.result}
            setComments={setComments}
          />
        )}
      </Wrapper>
    </section>
  );
};

export default Comments;

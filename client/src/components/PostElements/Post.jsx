import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { AiFillLike } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";

import { likePost, deletePost, getPostsBySearch } from "../../actions/posts";

import Modal from "../uiElements/Modal";
import Create from "../CreateMemoryElements/Create";
import Tag from "./Tag";

import "./Post.scss";

const Post = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const postRef = useRef(null);

  const user = useSelector((state) => state.auth.user?.result);

  const { title, photo, message, likes, createdAt, creator, tags, _id } = post;
  const [likesToShow, setLikesToShow] = useState(likes);

  const dispatch = useDispatch();

  const isLiked = likesToShow.includes(user?._id);

  const navigate = useNavigate();

  const hanldeLikePostClick = async (event) => {
    event.stopPropagation();
    setIsButtonDisabled(true);

    const isLiked = likesToShow.includes(user?._id);
    let newLikes = [];

    if (isLiked) {
      newLikes = likesToShow.filter((like) => like !== user?._id);
    } else {
      newLikes = [...likesToShow, user?._id];
    }

    setLikesToShow(newLikes);

    try {
      await dispatch(likePost(_id));
      setIsButtonDisabled(false);
    } catch (error) {
      setIsButtonDisabled(false);
    }
  };

  const handleDeleteButtonClick = (event) => {
    event.stopPropagation();
    dispatch(deletePost(_id));
  };

  const handleUpdateButtonClick = (event) => {
    event.stopPropagation();
    setShowModal(true);
  };

  const handleUserButtonClick = (event) => {
    event.stopPropagation();
    navigate(`/user-details/${post.creator.id}`);
  };

  const handleTagClick = (e, tag) => {
    e.stopPropagation();
    dispatch(getPostsBySearch("none", [tag]));
    navigate(`/posts/search?searchQuery=${tag}`);
  };

  useEffect(() => {
    if (document.activeElement === postRef.current) {
      postRef.current.focus();
    }
  }, []);

  const handlePostDetailsClick = () => {
    navigate(`/posts/${_id}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handlePostDetailsClick();
    }
  };

  return (
    <>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <Create setShowModal={setShowModal} currentId={_id} />
        </Modal>
      )}
      <li
        ref={postRef}
        tabIndex="0"
        onClick={handlePostDetailsClick}
        onKeyDown={handleKeyPress}
        className="post"
        aria-label='See post details'
      >
        <div className="post__left">
          <img className="post__img" src={photo} alt={title} width={250} />
        </div>
        <div className="post__right">
          <h3 className="post__title">{title}</h3>
          <button
            onClick={handleUserButtonClick}
            className="post__author"
            aria-label="Visit author page"
          >
            {`Posted by ${creator.name}`}
          </button>
          {user && (
            <div className="post__btns">
              <button
                onClick={hanldeLikePostClick}
                className={`${"post__btn post__btn--like"} ${
                  isLiked && "post__btn post__btn--like post__btn--liked"
                }`}
                disabled={isButtonDisabled}
                aria-label="Like this post"
              >
                <AiFillLike />
                <span className="post__likes-amount">{likesToShow.length}</span>
              </button>
              {user._id == post.creator.id && (
                <>
                  <button
                    className=" post__btn post__btn--update"
                    onClick={handleUpdateButtonClick}
                    aria-label="Edit post"
                  >
                    <BiEdit />
                  </button>
                  <button
                    className="post__btn post__btn--delete"
                    onClick={handleDeleteButtonClick}
                    aria-label="Delete Post"
                  >
                    <AiFillDelete />
                  </button>
                </>
              )}
            </div>
          )}
          <ul className="post__tags">
            {tags.map((tag,i) => (
              <Tag onClick={(e) => handleTagClick(e, tag)} tag={tag} key={i} />
            ))}
          </ul>
          <p className="post__desc">
            {message.slice(0, 250)} {message.length > 250 && "..."}
          </p>

          <div className="post__bottom">
            <time className="post__created">
              <AiOutlineCalendar />
              {moment(createdAt).fromNow()}
            </time>
          </div>
        </div>
      </li>
    </>
  );
};

export default Post;

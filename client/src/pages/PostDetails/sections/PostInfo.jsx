import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { AiFillLike } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";

import { likePost, deletePost, getPostsBySearch } from "../../../actions/posts";
import Modal from "../../../components/uiElements/Modal";
import Create from "../../../components/CreateMemoryElements/Create";
import Tag from "../../../components/PostElements/Tag";
import Wrapper from "../../../components/uiElements/Wrapper";

import "./PostInfo.scss";

const PostInfo = ({ post }) => {
  const { title, photo, message, likes, createdAt, creator, tags, _id } = post;

  const [likesToShow, setLikesToShow] = useState(likes);
  const [showModal, setShowModal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const user = useSelector((state) => state.auth.user?.result);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLiked = likesToShow.includes(user?._id);

  const handleDeleteButtonClick = (event) => {
    event.stopPropagation();
    dispatch(deletePost(_id));
  };

  const handleUpdateButtonClick = (event) => {
    event.stopPropagation();
    setShowModal(true);
  };

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

  const handleUserButtonClick = (event) => {
    event.stopPropagation();
    navigate(`/user-details/${post.creator.id}`);
  };

  const handleTagClick = (e, tag) => {
    e.stopPropagation();
    dispatch(getPostsBySearch("none", [tag]));
    navigate(`/posts/search?searchQuery=${tag}`);
  };

  return (
    <Wrapper>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <Create setShowModal={setShowModal} currentId={_id} />
        </Modal>
      )}
      <section className="post-info">
        <div className="post-info__left">
          <h1 className="post-info__title">{title}</h1>
          <button
            onClick={handleUserButtonClick}
            className="post-info__author"
            aira-label="Visit author page"
          >{`Posted by ${creator.name}`}</button>
          {user && (
            <div className="post-info__btns">
              <button
                onClick={hanldeLikePostClick}
                className={`${"post-info__btn post-info__btn--like"} ${
                  isLiked && "post-info__btn--liked"
                }`}
                disabled={isButtonDisabled}
                aira-label="Like this post"
              >
                <AiFillLike />
                <span className="post-info__likes-amount">
                  {likesToShow.length}
                </span>
              </button>
              {user._id === post.creator.id && (
                <>
                  <button
                    className="post-info__btn post-info__btn--update"
                    onClick={handleUpdateButtonClick}
                    aira-label="Edit post"
                  >
                    <BiEdit />
                  </button>
                  <button
                    className="post-info__btn post-info__btn--delete"
                    onClick={handleDeleteButtonClick}
                    aira-label="Delete Post"
                  >
                    <AiFillDelete />
                  </button>
                </>
              )}
            </div>
          )}
          <ul className="post-info__tags">
            {tags.map((tag,i) => (
              <Tag key={i} onClick={(e) => handleTagClick(e, tag)} tag={tag} />
            ))}
          </ul>
          <p className="post-info__desc">{message}</p>
          <time className="post-info__created">
            <AiOutlineCalendar />
            {moment(createdAt).fromNow()}
          </time>
        </div>
        <div className="post-info__right">
          <img src={photo} alt={title} className="post-info__img" />
        </div>
      </section>
    </Wrapper>
  );
};

export default PostInfo;

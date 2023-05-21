import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { AiOutlineClose } from "react-icons/ai";

import { createPost } from "../../actions/posts";
import { updatePost } from "../../actions/posts";

import Input from "../formElements/Input";
import TagInput from "../formElements/TagInput";
import PhotoInput from "../formElements/PhotoInput";
import Button from "../formElements/Button";
import ErrorMessage from "../formElements/ErrorMessage";

import "./Create.scss";

const Create = ({ setShowModal, currentId }) => {
  const [values, setValues] = useState({
    title: "",
    message: "",
    tags: [],
    photo: "",
  });

  const [errors, setErrors] = useState({
    title: null,
    message: null,
    tags: null,
    photo: null,
  });

  const isLoading = useSelector((state) => state.posts.isLoading);
  const postError = useSelector((state) => state.posts.postError);
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );

  const user = useSelector((state) => state.auth.user?.result);

  useEffect(() => {
    if (post) {
      setValues({
        title: post.title,
        message: post.message,
        tags: post.tags,
        photo: post.photo,
      });
    }
  }, [post]);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const newObj = { ...values, [e.target.name]: e.target.value };
    setValues(newObj);
  };

  const handleClearBtnClick = () => {
    setValues({ title: "", message: "", tags: [] });
    setErrors({ title: null, message: null, tags: null, photo: null });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setErrors({
      title: null,
      message: null,
      tags: null,
      photo: null,
    });

    let shouldSubmit = true;

    if (!values.title) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "Title is required.",
      }));
      shouldSubmit = false;
    }

    if (!values.message) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        message: "Message is required.",
      }));
      shouldSubmit = false;
    }

    if (values.tags.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        tags: "At least one tag is required.",
      }));
      shouldSubmit = false;
    }

    if (!values.photo) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        photo: "Photo is required.",
      }));
      shouldSubmit = false;
    }

    if (shouldSubmit) {
      if (currentId) {
        dispatch(
          updatePost(currentId, { ...values, creator: { name: user.name } })
        );
      } else {
        dispatch(createPost({ ...values, creator: { name: user.name } }));
      }
      setShowModal(false);
    }
  };

  return (
    <section className="create">
      <div className="create__row">
        <h2 className="create__heading">Create memory</h2>
        <button
          onClick={() => setShowModal(false)}
          className="create__close-btn"
          arria-label="close window"
        >
          <AiOutlineClose />
        </button>
      </div>
      <form noValidate onSubmit={handleFormSubmit} className="create__form">
        <Input
          type="text"
          name="title"
          id="title"
          label="Title:"
          placeholder="E.g. New York"
          ariaLabel="Enter memory title, for example city name"
          onChange={handleInputChange}
          value={values.title}
        />
        {errors.title && <ErrorMessage error={errors.title} />}
        <Input
          textarea
          name="message"
          id="message"
          label="Describe your memory:"
          placeholder="Write down what you experienced..."
          ariaLabel="Describe your memory"
          onChange={handleInputChange}
          value={values.message}
        />
        {errors.message && <ErrorMessage error={errors.message} />}
        <label className="create__tag-label" htmlFor="tag-nput">
          Enter memory tags:
        </label>
        <TagInput setValues={setValues} values={values} />
        {errors.tags && <ErrorMessage error={errors.tags} />}
        <PhotoInput
          label="Add photo:"
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
        />
        {errors.photo && <ErrorMessage error={errors.photo} />}
        <div className="create__btns">
          {!isLoading ? (
            <Button type="submit" ariaLabel="Create memory">
              {currentId ? "update" : "create"}
            </Button>
          ) : (
            <Button ariaLabel="Loading">Loading...</Button>
          )}
          <Button onClick={handleClearBtnClick} outline ariaLabel="Clear form">
            clear
          </Button>
        </div>
        {Object.values(errors).every((error) => error === null) &&
          postError && <ErrorMessage error={postError} />}
      </form>
    </section>
  );
};

export default Create;

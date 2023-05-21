import { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

import "./TagInput.scss";

const TagInput = ({ setValues, values }) => {
  const [tagValue, setTagValue] = useState("");

  const addTags = (e) => {
    if (e.keyCode === 13 && tagValue.trim() !== "") {
      e.preventDefault();
      setValues({ ...values, tags: [...values.tags, tagValue] });
      setTagValue("");
    }
  };

  

  function removeTag(tag) {
    let newTags = values.tags.filter((t) => t !== tag);
    setValues({ ...values, tags: newTags });
  }

  const handleRemoveButtonKeyDown = (tag, e) => {
    if (e.keyCode === 13) {
      removeTag(tag);
    }
  };

  return (
    <div className={`tag-input ${values.tags.length && "tag-input--padding"}`}>
      <ul className="tag-input__list">
        {values.tags.map((tag, index) => (
          <li className="tag-input__list-item" key={index}>
            <button type="button" className="tag-input__btn">
              {tag}
              <span
                className="tag-input__remove"
                onClick={() => removeTag(tag)}
                onKeyDown={(e) => handleRemoveButtonKeyDown(tag, e)}
                tabIndex={0}
              >
                <AiOutlineClose />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <input
        className={`tag-input__input ${
          values.tags.length && "tag-input__input--margin"
        }`}
        placeholder="Type and enter..."
        onKeyDown={addTags}
        onChange={(e) => setTagValue(e.target.value)}
        value={tagValue}
        aria-label="Enter tags related to the bear"
      />
    </div>
  );
};

export default TagInput;

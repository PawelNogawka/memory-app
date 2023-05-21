import "./Tag.scss";

const Tag = ({ tag, onClick }) => {
  return (
    <li className="tag">
      <button aria-label={`See posts assigned to ${tag}`} onClick={onClick}>{tag}</button>
    </li>
  );
};

export default Tag;

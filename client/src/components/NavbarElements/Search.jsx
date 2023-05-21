import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getPostsBySearch } from "../../actions/posts";

import Input from "../formElements/Input";

import { AiOutlineSearch } from "react-icons/ai";

import "./Search.scss";

const Search = ({ desktop }) => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!search || search.trim() === "") {
      setError("Please, enter a value.");
      return;
    }

    const encodedSearch = encodeURIComponent(search);
    dispatch(getPostsBySearch(encodedSearch));
    setSearch("");
    navigate(`/posts/search?searchQuery=${encodedSearch}`);
  };

  return (
    <form
      onSubmit={handleSearchFormSubmit}
      className={`${"search"} ${desktop && "desktop"}`}
    >
      <Input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        type="search"
        placeholder="Search memories by title..."
        name="search"
        required
        ariaLabel='Search memories by title'
      />
      <button type="submit" aria-label='Search memories'>
        <AiOutlineSearch />
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default Search;

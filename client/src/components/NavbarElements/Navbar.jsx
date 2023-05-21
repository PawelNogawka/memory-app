import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";

import { logout } from "../../actions/auth";

import { MdAdd } from "react-icons/md";

import Avatar from "../uiElements/Avatar";
import Button from "../formElements/Button";
import Wrapper from "../uiElements/Wrapper";
import Search from "./Search";

import "./Navbar.scss";

const Navbar = ({ setShowModal }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user?.result);
  const token = useSelector((state) => state.auth.user?.token);

  useEffect(() => {
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) dispatch(logout());
    }
  }, [location]);

  const handleLogoutButtonClick = () => {
    dispatch(logout());
  };

  return (
    <header className="navbar">
      <Wrapper>
        <div className="navbar__container">
          <Link to="/" className="navbar__logo">
            memory
          </Link>
          <Search desktop />
          <nav className="navbar__nav">
            {!user && (
              <div className="navbar__btns">
                <Button to="/login" empty>
                  Login
                </Button>
                <Button to="/register">Register</Button>
              </div>
            )}
            {user && (
              <div className="navbar__user-box">
                <div className="navbar__user">
                  <Avatar src={user.photo} name={user.name} />
                  <span className="navbar__user-name">{user.name}</span>
                </div>

                <div className="navbar__user-btns">
                  <button
                    className="navbar__user-add-btn"
                    onClick={() => setShowModal(true)}
                    aria-label="Add a memory"
                  >
                    <MdAdd />
                  </button>
                  <Button onClick={handleLogoutButtonClick} ariaLabel="Logout">
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </nav>
        </div>
      </Wrapper>
    </header>
  );
};

export default Navbar;

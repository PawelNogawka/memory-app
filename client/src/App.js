import { useState, useEffect } from "react";
import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { checkAuthState } from "./actions/auth";

import Home from "./pages/Home/Home";
import Navbar from "./components/NavbarElements/Navbar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Create from "./components/CreateMemoryElements/Create";
import Search from "./pages/Search/Search";
import PostDetails from "./pages/PostDetails/PostDetails";
import UserDetails from "./pages/UserDetails/UserDetails";

import Modal from "./components/uiElements/Modal";

function App() {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  return (
    <>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <Create setShowModal={setShowModal} />
        </Modal>
      )}
      <Navbar setShowModal={setShowModal} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts/search" element={<Search />} />
        <Route path="/user-details/:id" element={<UserDetails />} />
      </Routes>
    </>
  );
}

export default App;

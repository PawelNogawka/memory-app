import React from "react";
import ReactDOM from "react-dom";

import "./Modal.scss";

const Backdrop = ({ setShowModal }) => {
  return <div onClick={() => setShowModal(false)} className="backdrop"></div>;
};

const ModalOverlay = ({ children }) => {
  return <div className="modal-overlay">{children}</div>;
};

const portalElement = document.getElementById("overlays");

const Modal = ({ children, setShowModal }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop setShowModal={setShowModal} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;

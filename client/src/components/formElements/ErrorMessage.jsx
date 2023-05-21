import React from "react";
import { Link } from "react-router-dom";

import Button from "./Button";

import "./ErrorMessage.scss";

const ErrorMessage = ({ error, big }) => {
  if (big)
    return (
      <div className="error-message">
        <span className="error-message-info error-message-info--big">
          {error}
        </span>
        <Button to="/" ariaLabel="Back to home">
          Back to home
        </Button>
      </div>
    );

  return <span className="error-message-info">{error}</span>;
};

export default ErrorMessage;

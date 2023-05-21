import React from "react";
import { Link } from "react-router-dom";

import "./Button.scss";

const Button = ({
  onClick,
  to,
  outline,
  empty,
  children,
  ariaLabel,
  disabled,
  type,
}) => {
  if (to)
    return (
      <Link
        to={to}
        aria-label={ariaLabel}
        className={`${"btn"} ${outline && "btn--outline"} ${
          empty && "btn--empty"
        } `}
      >
        {children}
      </Link>
    );
  else {
    return (
      <button
        onClick={onClick}
        className={`${"btn"} ${outline && "btn--outline"} ${
          empty && "btn--empty"
        } `}
        type={type || "button"}
        aria-label={ariaLabel}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
};

export default Button;

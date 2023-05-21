import React from "react";

import "./Input.scss";

const Input = ({
  label,
  type,
  name,
  placeholder,
  onChange,
  value,
  error,
  required,
  textarea,
  ariaLabel,
}) => {
  const errorEl = <span className="error">{error}</span>;

  if (!textarea)
    return (
      <div className="input">
        {label && <label htmlFor={name}>{label}</label>}

        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          required={required || false}
          aria-label={ariaLabel}
          aria-invalid={error ? true : false}
          aria-required={required || false}
          autoComplete="off"
        />
        {error && errorEl}
      </div>
    );
  else
    return (
      <div className="input">
        {label && <label htmlFor={name}>{label}</label>}

        <textarea
          resize="none"
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          required={required || false}
          aria-label={ariaLabel}
          aria-invalid={error ? true : false}
          aria-required={required || false}
        />
        {error && errorEl}
      </div>
    );
};

export default Input;

import React from "react";

import "./Avatar.scss";

const Avatar = ({ src, name }) => {
  return <img className="avatar-user" src={src} alt={name} width="45" />;
};

export default Avatar;

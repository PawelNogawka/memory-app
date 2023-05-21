import React from "react";

import { Oval } from "react-loader-spinner";

import "./Loader.scss";

const Loader = ({ big }) => {
  return (
    <div className={`${"loading-spinner"} ${big && "loading-spinner--big"}`}>
      <Oval
        height={big ? "80" : "20"}
        width={big ? "80" : "20"}
        color="#ccc"
        secondaryColor="#ddd"
        ariaLabel="triangle-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;

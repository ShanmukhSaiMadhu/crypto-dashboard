import React from "react";
import "./styles.css";
// import CircularProgress from "@mui/material/CircularProgress";

import { Triangle } from  'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


function Loader() {
  return (
    <div className="loader-wrapper">
      {/* <CircularProgress /> */}
      <Triangle
        height="100"
        width="100"
        color="var(--blue)"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
}

export default Loader;
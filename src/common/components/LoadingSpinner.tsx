import React from "react";
import { PulseLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <PulseLoader color="#36D7B7" size={25} />
    </div>
  );
};

export default LoadingSpinner;

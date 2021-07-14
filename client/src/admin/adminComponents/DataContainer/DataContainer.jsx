import React from "react";

function DataContainer({ children, ...otherProps }) {
  return (
    <div
      {...otherProps}
      style={{
        position: "relative",
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
}

export default DataContainer;

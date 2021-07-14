import { CircularProgress } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectIsOperationRunning } from "redux/admin/static/brandVideo/brandVideo.selectors";

function BrandVideoProgressOverlay({
  currentUploadStatus,
  progressPercentage,
  isOperationRunning,
}) {
  return (
    isOperationRunning && (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(5px)",
        }}
      >
        <div
          style={{
            height: "300px",
            width: "300px",
            border: "1px solid black",
            borderRadius: "10px",
            background: "white",
            marginTop: "15rem",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <div
            style={{
              position: "relative",
              height: "8rem",
              width: "8rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress
              style={{
                height: "8rem",
                width: "8rem",
                color: "var(--color-skyblue)",
                position: "absolute",
              }}
            />
            {progressPercentage > 0 && (
              <span style={{ fontSize: "var(--font-md)" }}>
                {progressPercentage}%
              </span>
            )}
          </div>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: "var(--font-md-big)",
            }}
          >
            {currentUploadStatus}
          </div>
        </div>
      </div>
    )
  );
}

const mapStateToProps = createStructuredSelector({
  isOperationRunning: selectIsOperationRunning,
});

export default connect(mapStateToProps)(BrandVideoProgressOverlay);

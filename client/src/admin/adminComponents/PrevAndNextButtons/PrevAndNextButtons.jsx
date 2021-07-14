import CustomButton from "components/CustomButton/CustomButton";
import React from "react";

function PrevAndNextButtons({
  handlePrevClick,
  handleNextClick,
  disablePrev,
  disableNext,
}) {
  return (
    <div
      style={{
        margin: "auto auto 2rem",
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <CustomButton
        onClick={handlePrevClick}
        color="black"
        size="small"
        isActive
        disabled={disablePrev}
      >
        prev
      </CustomButton>

      <CustomButton
        onClick={handleNextClick}
        color="black"
        size="small"
        isActive
        disabled={disableNext}
      >
        next
      </CustomButton>
    </div>
  );
}

export default PrevAndNextButtons;

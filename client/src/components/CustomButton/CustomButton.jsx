import React from "react";
// styles
import * as S from "./CustomButton.styles";
// components
import { CircularProgress } from "@material-ui/core";

function CustomButton({
  children,
  size,
  color,
  buttonType,
  isActive,
  align,
  hasLoading,
  isLoading,
  loadingText,
  ...otherProps
}) {
  return (
    <S.StyledCustomButton
      size={size}
      color={color}
      buttonType={buttonType}
      align={align}
      isActive={isActive || isLoading}
      {...otherProps}
      hasLoading={hasLoading}
      hasSmallLoadingText={isLoading && loadingText && loadingText.length > 12}
    >
      {hasLoading && isLoading && (
        <CircularProgress
          style={{
            color: "var(--color-white)",
            minHeight: "15px",
            height: "auto",
            width: size === "xs" ? "15px" : "30px",
          }}
        />
      )}
      {loadingText && isLoading ? loadingText : children}
    </S.StyledCustomButton>
  );
}

export default CustomButton;
